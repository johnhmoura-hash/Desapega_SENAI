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

            int matricula = int.Parse(usuario);

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
           
            objeto.Fk_usuarios_matricula = matricula;
            _context.Objetos.Add(objeto);

            var usuarioBd = _context.Usuarios
                .FirstOrDefault(u => u.Matricula == matricula);

            if(usuarioBd != null)
            {
                usuarioBd.Pontos += 2;
            }


            _context.Add(objeto);
            _context.SaveChanges();
            return Created("Teste", objeto);
        }

        

        [HttpGet]
        public IActionResult BuscaObjetoPerfil()
        {
            var objeto = _context.Objetos.ToList();

            for (int i = 0; i < objeto.Count; i++)
            {

                var pastaBase = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
                var caminho = Path.Combine(pastaBase, objeto[i].Foto);
                var nomeArquivo = Path.GetFileName(objeto[i].Foto);
                objeto[i].Foto = $"{Request.Scheme}://{Request.Host}/uploads/{nomeArquivo}";
            }
            return Ok(objeto);
        }


       [HttpGet("perfil")]
public IActionResult BuscarObjetoPerfil()
{
    var usuario = HttpContext.Session.GetString("Idusado");

    if (usuario == null)
        return Unauthorized("Não autenticado");

    int matricula = int.Parse(usuario);

    var usuarioBd = _context.Usuarios
        .FirstOrDefault(u => u.Matricula == matricula);

    if (usuarioBd == null)
        return NotFound();

    var objetos = _context.Objetos
        .Where(o => o.Fk_usuarios_matricula == matricula)
        .Select(o => new
        {
            o.Nome,
            o.Descricao,
            o.Categoria,
            o.Tempo_uso,
            Foto = $"{Request.Scheme}://{Request.Host}/uploads/{o.Foto}",
            o.Prefere_troca
        })
        .ToList();

    var totalObjetos = objetos.Count;

    var totalTrocas = _context.Trocas
        .Count(t =>
            t.Fk_usuarios_remetente == matricula ||
            t.Fk_usuarios_destinatario == matricula);

    return Ok(new
    {
        Nome = usuarioBd.Nome,
        usuarioBd.Pontos,
        TotalObjetos = totalObjetos,
        TotalTrocas = totalTrocas,
        Objetos = objetos
    });
}


        [HttpGet("perfil/{id}")]
        public IActionResult ProdutoPorId(int id)
        {
            var resultado = (from u in _context.Usuarios
                             join o in _context.Objetos
                             on u.Matricula equals o.Fk_usuarios_matricula
                             where o.Id == id
                             select new
                             {
                                 id = o.Id,
                                 usuarios = u.Nome,
                                 pontos = u.Pontos,
                                 objetos = o.Nome,
                                 descricao = o.Descricao,
                                 categoria = o.Categoria,
                                 tempo_uso = o.Tempo_uso,
                                 foto = $"{Request.Scheme}://{Request.Host}/uploads/{o.Foto}",
                                 prefere_troca = o.Prefere_troca
                             }).FirstOrDefault();

            if (resultado == null)
                return NotFound();

            return Ok(resultado);
        }

        [HttpGet("categoria/{categoria}")]
        public IActionResult BuscarPorCategoria(string categoria)
        {
            var objetos = _context.Objetos
                .Where(o => o.Categoria == categoria)
                .ToList();

            foreach (var objeto in objetos)
            {
                var nomeArquivo = Path.GetFileName(objeto.Foto);
                objeto.Foto = $"{Request.Scheme}://{Request.Host}/uploads/{nomeArquivo}";
            }

            return Ok(objetos);
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

/*
[HttpGet("perfil")]
public IActionResult ListaProdutos()
{
    var resultado = from u in _context.Usuarios
                    join o in _context.Objetos
                    on u.Matricula equals o.Fk_usuarios_matricula
                    select new
                    {
                        id = o.Id,
                        usuarios = u.Nome,
                        pontos = u.Pontos,
                        objetos = o.Nome,
                        descricao = o.Descricao,
                        categoria = o.Categoria,
                        tempo_uso = o.Tempo_uso,
                        foto = $"{Request.Scheme}://{Request.Host}/uploads/{o.Foto}",
                        prefere_troca = o.Prefere_troca
                    };

    return Ok(resultado.ToList());
}
[HttpGet("categoria/{categoria}")]
public IActionResult BuscarPorCategoria(string categoria)
{
    var resultado = from u in _context.Usuarios
                    join o in _context.Objetos
                    on u.Matricula equals o.Fk_usuarios_matricula
                    select new
                    {
                        Usuario = u.Nome,
                        o.Id,
                        Objeto = o.Nome,
                        o.Descricao,
                        o.Categoria,
                        o.Tempo_uso,
                        Foto = $"{Request.Scheme}://{Request.Host}/uploads/{o.Foto}",
                        o.Prefere_troca
                    };

    return Ok(resultado.ToList());
}

 */

