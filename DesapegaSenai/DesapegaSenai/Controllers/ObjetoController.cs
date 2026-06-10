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

        public async Task<IActionResult> CriarObjeto(Objeto objeto)
        {

            var usuario = HttpContext.Session.GetString("Idusado");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            if (objeto.ArquivoFoto != null)
            {
                var nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(objeto.ArquivoFoto.FileName);

                var caminho = Path.Combine("wwwroot/Uploads", nomeArquivo);

                using (var stream = new FileStream(caminho, FileMode.Create))
                {
                    await objeto.ArquivoFoto.CopyToAsync(stream);
                }

                objeto.Foto = nomeArquivo;
                objeto.Fk_usuarios_matricula = int.Parse(usuario);
            }

            _context.Add(objeto);
            _context.SaveChanges();
            return Created("Teste", objeto);
        }

        /* [HttpPost("cadastroFoto")]
         public async Task<IActionResult> Criar([FromForm] Objeto objeto)
         {
             if (objeto.ArquivoFoto != null)
             {
                 var nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(objeto.ArquivoFoto.FileName);

                 var caminho = Path.Combine("wwwroot/Uploads", nomeArquivo);

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
        [HttpGet("download/{nomeArquivo}")]
        public IActionResult Dowload(string nomeArquivo)
        {
            var caminho = Path.Combine("Uploads", nomeArquivo);

            if (!System.IO.File.Exists(caminho))
                return NotFound("Arquivo não encontrado");

            var bytes = System.IO.File.ReadAllBytes(caminho);

            return File(bytes, "application/octet-stream", nomeArquivo);
        }

        [HttpGet("arquiv/{nomeArquivo}")]
        public IActionResult ListaArquivo(string nomeArquivo)
        {
            var pastaBase = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
            var caminho = Path.Combine(pastaBase, nomeArquivo);

            if (!Directory.Exists(caminho))
                return NotFound("Pasta não encontrada");

                var nomePasta = Path.GetFileName(caminho);

            return Ok(caminho);
        }*/

        [HttpGet("perfil")]
        public IActionResult BuscarObjetoPerfil()
        {
            var usuario = HttpContext.Session.GetString("Idusado");
            if (usuario == null)
                return Unauthorized("Não autenticado");


            var idUsuarioLogado = Request.Cookies["Idusado"];
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
                                    Foto = $"{Request.Scheme}://{Request.Host}/uploads/{o.Foto}",
                                    o.Prefere_troca
                                };
                return Ok(resultado.ToList());
            }
            return Unauthorized("Não autenticado");

        }

        [HttpGet]
        public IActionResult BuscaObjetoPerfil()
        {
            var objeto = _context.Objetos.ToList();

            for (int i = 0; i < objeto.Count; i++)
            {

                var pastaBase = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
                var caminho = Path.Combine(pastaBase, objeto[i].Foto);
                objeto[i].Foto = $"{Request.Scheme}://{Request.Host}/uploads/{caminho}";
            }
            return Ok(objeto);
        }

        [HttpPut]
        public IActionResult AtualizarObjeto(int id, Objeto objeto)
        {
            var objBanco = _context.Objetos.Find(id);

            if (objBanco == null)
                return NotFound("Tarefa não encontrada");

            objBanco.Nome = objeto.Nome;
            objBanco.Descricao = objeto.Descricao;
            objBanco.Prefere_troca = objeto.Prefere_troca;
            objBanco.Tempo_uso = objeto.Tempo_uso;
            objBanco.Status_objeto = objeto.Status_objeto;
            objBanco.ArquivoFoto = objeto.ArquivoFoto;
            objBanco.Foto = objeto.Foto;

            _context.SaveChanges();
            return Ok("Atualizado com sucesso!");
        }

        [HttpDelete("{id}")]
        public IActionResult DeletarObjeto(int id)
        {
            var usuario = HttpContext.Session.GetString("Idusado");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            var objeto = _context.Usuarios.Find(id);

            if (objeto == null)
                return NotFound("Tarefa não encontrado");

            _context.Usuarios.Remove(objeto);
            _context.SaveChanges();

            return Ok("Deletado com sucesso "); 
        }

    }
}

