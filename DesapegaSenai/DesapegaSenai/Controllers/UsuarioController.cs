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
        public IActionResult Login(Usuario usuario)
        {
            var usuarioBd = _context.Usuarios.Where
                (c => c.Email.Equals(usuario.Email) &&
                c.Senha.Equals(usuario.Senha)).ToList();
            if (usuarioBd.Count == 0)
            {
                return Unauthorized("Email ou senha incorretos!");
            }
            HttpContext.Session.SetString("Email", usuarioBd[0].Matricula.ToString());
            Response.Cookies.Append("IdUsado", usuarioBd[0].Matricula.ToString(),
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



    }
}
