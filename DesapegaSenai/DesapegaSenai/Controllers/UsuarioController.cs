using Microsoft.AspNetCore.Mvc;
using DesapegaSenai.Data;
using DesapegaSenai.Models;
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


        [HttpPost("login")]
        public IActionResult Login(Usuario usuario){
            
            var usuarioBd = _context.Usuarios.Where
                (c => c.Email.Equals(usuario.Email) &&
                c.Senha.Equals(usuario.Senha)).ToList();
            
            
                if (usuarioBd.Count == 0)

                    return Unauthorized("Email ou Senha Incorretas");
                HttpContext.Session.SetString("email", usuario.Email);
                Response.Cookies.Append("Idusado", usuarioBd[0].Matricula.ToString(),

                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None
                });
                return Ok("Loging realizado com sucesso");
        }

        

        [HttpPost("cadastrar")]
        public IActionResult CadastraCliente(Usuario usuario)
        {
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



        [HttpPut("Atualizar/{id}")]
        public IActionResult AtualizarPessoas(int id, Usuario usuario)
        {
            var UsuarioBd = _context.Usuarios.Find(id);

            if (UsuarioBd == null)
                return NotFound("Pessoa não encontrada.");

            UsuarioBd.Nome = usuario.Nome;
            UsuarioBd.Senha = usuario.Senha;
            UsuarioBd.Email = usuario.Email;
            _context.SaveChanges();

            return Ok("Atualizado");
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
