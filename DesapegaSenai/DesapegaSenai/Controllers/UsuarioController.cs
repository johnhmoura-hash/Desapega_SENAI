using Microsoft.AspNetCore.Mvc;
using DesapegaSenai.Data;
using DesapegaSenai.Models;
using DesapegaSenai.DTOs;
namespace DesapegaSenai.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly DesapegaContext _context;

        public UsuarioController(DesapegaContext context)
        {
            _context = context;
        }



        [HttpGet("perfil/{id}")]
        public IActionResult PerfilUsuario(int id)
        {
            var usuario = _context.Usuarios
                .FirstOrDefault(u => u.Matricula == id);

            if (usuario == null)
                return NotFound("Usuário não encontrado.");

            var objetos = _context.Objetos
                .Where(o => o.Fk_usuarios_matricula == id)
                .Select(o => new
                {
                    o.Id,
                    o.Nome,
                    o.Tempo_uso,
                    o.Status_objeto,
                    Foto = $"{Request.Scheme}://{Request.Host}/uploads/{o.Foto}"
                })
                .ToList();

            var totalTrocas = _context.Trocas.Count(t =>
                t.Fk_usuarios_remetente == id ||
                t.Fk_usuarios_destinatario == id);

            return Ok(new
            {
                nome = usuario.Nome,
                pontos = usuario.Pontos,
                foto_usuario = $"{Request.Scheme}://{Request.Host}/uploads/{usuario.Foto_usuario}",
                totalObjetos = objetos.Count,
                totalTrocas = totalTrocas,
                objetos = objetos
            });
        }





        [HttpPost("login")]
        public IActionResult Login(Login login){
            
            var usuarioBd = _context.Usuarios.Where
                (c => c.Email.Equals(login.Email) &&
                c.Senha.Equals(login.Senha)).ToList();
            
            
                if (usuarioBd.Count == 0)

                return Unauthorized("Email ou Senha Incorretas");
                HttpContext.Session.SetString("Idusado", usuarioBd[0].Matricula.ToString());
                Response.Cookies.Append("Idusado", usuarioBd[0].Matricula.ToString(),

                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None
                });

            return Ok("Login realizado com sucesso");
        }


        [HttpPost("cadastrar")]
        public IActionResult CadastraCliente(UsuarioDTO dto)
        {
            Usuario usuario = new Usuario(
            dto.Matricula,
            dto.Nome,
            dto.Telefone,
            dto.Email,
            dto.Senha,
            true,
            0
            );
            _context.Add(usuario);
            _context.SaveChanges();
            return Created("a", usuario);
        }


        [HttpPost("logout")]
        public IActionResult logout()
        {
            HttpContext.Session.Clear();
            Response.Cookies.Delete("Idusado");
            Response.Cookies.Delete(".AspNetCore.Session");
            return Ok("Logout realizado com sucesso!");
        }

        [HttpPut("Atualizar")]
        public async Task<IActionResult> AtualizarUsuario([FromForm] EditarUsuarioDTO usuario)
        {
            var usuarioId = HttpContext.Session.GetString("Idusado");
            if (usuarioId == null)
                return Unauthorized("Não autenticado");

            int matricula = int.Parse(usuarioId);

            var usuarioBd = _context.Usuarios.Find(matricula);

            if (usuarioBd == null)
                return NotFound("Usuário não encontrado.");

            usuarioBd.Nome = usuario.Nome;
            usuarioBd.Email = usuario.Email;
            usuarioBd.Telefone = usuario.Telefone;

            if (usuario.ArquivoFoto != null)
            {
                var nomeArquivo = Guid.NewGuid() + Path.GetExtension(usuario.ArquivoFoto.FileName);

                var caminho = Path.Combine("wwwroot", "Uploads", nomeArquivo);

                using (var stream = new FileStream(caminho, FileMode.Create))
                {
                    await usuario.ArquivoFoto.CopyToAsync(stream);
                }

                // Atualiza a foto do usuário
                usuarioBd.Foto_usuario = nomeArquivo;
            }

            _context.SaveChanges();

            return Ok(usuarioBd);
        }


        [HttpGet]
        public IActionResult Logado()
        {
            var idUsuario = HttpContext.Session.GetString("Idusado");

            if (string.IsNullOrEmpty(idUsuario))
                return Unauthorized();

            return Ok(new
            {
                logado = true,
                matricula = idUsuario
            });
        }

        [HttpGet("perfil")]
        public IActionResult Perfil()
        {
            var idUsuario = HttpContext.Session.GetString("Idusado");

            if (idUsuario == null)
                return Unauthorized();

            int matricula = int.Parse(idUsuario);

            var usuario = _context.Usuarios
                .Where(u => u.Matricula == matricula)
                .Select(u => new
                {
                    u.Nome,
                    u.Email,
                    u.Telefone,
                    Foto_usuario = $"{Request.Scheme}://{Request.Host}/uploads/{u.Foto_usuario}"
                })
                .FirstOrDefault();

            return Ok(usuario);
        }

        [HttpDelete("Deletar/{id}")]
        public IActionResult DeletarPessoas(int id)
        {
            var Usuario = _context.Usuarios.Find(id);

            if (Usuario == null)
                return NotFound("Pessoa não encontarda");

            _context.Usuarios.Remove(Usuario);
            _context.SaveChanges();


            return Ok("Deletado");
        }


    }
}
