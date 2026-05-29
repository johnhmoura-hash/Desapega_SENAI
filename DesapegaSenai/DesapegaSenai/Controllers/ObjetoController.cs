using DesapegaSenai.Data;
using DesapegaSenai.Models;
using Microsoft.AspNetCore.Mvc;

namespace DesapegaSenai.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ObjetoController : ControllerBase
    {
        private readonly DesapegaContext _context;

        public ObjetoController(DesapegaContext context)
        {
            _context = context;
        }

        [HttpPost]

        public IActionResult CriarObjeto(Objeto objeto)
        {

            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            _context.Add(objeto);
            _context.SaveChanges();
            return Created("Teste", objeto);
        }

        [HttpPost("cadastroFoto")]
        public async Task<IActionResult> Criar([FromForm] Objeto objeto)
        {
            if (objeto.ArquivoFoto != null)
            {
                var nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(objeto.ArquivoFoto.FileName);

                var caminho = Path.Combine("wwwroot/imagens", nomeArquivo);

                using (var stream = new FileStream(caminho, FileMode.Create))
                {
                    await objeto.ArquivoFoto.CopyToAsync(stream);
                }

                objeto.Foto = nomeArquivo;
            }

            _context.Objetos.Add(objeto);
            await _context.SaveChangesAsync();

            return Ok(objeto);
        }

        [HttpGet]

        public IActionResult BuscarObjeto()
        {

            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            var idUsuarioLogado = Request.Cookies["IdUsado"];
            if (idUsuarioLogado != null)
            {
                var resultado = from u in _context.Usuarios
                                join o in _context.Objetos
                                on u.Matricula equals o.Fk_usuarios_matricula
                                where u.Matricula == int.Parse(idUsuarioLogado)
                                select new
                                {
                                    Usuarios = u.Nome,

                                    Objetos = o.Nome,
                                    o.Descricao,
                                    o.Categoria,
                                    o.Tempo_uso,
                                    o.Foto,
                                    o.Prefere_troca
                                };
                return Ok(resultado.ToList());
            }
            return Unauthorized("Não autenticado");

        }

        [HttpDelete]
        public IActionResult DeletarObjeto()
        {
            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            var idUsuarioLogado = Request.Cookies["IdUsado"];

            var objeto = _context.Usuarios.Find(idUsuarioLogado);

            if (objeto == null)
                return NotFound("Tarefa não encontrado");

            _context.Usuarios.Remove(objeto);
            _context.SaveChanges();

            return Ok("Deletado com sucesso ");
        }

    }
}

