using DesapegaSenai.Data;
using DesapegaSenai.Models;
using Microsoft.AspNetCore.Mvc;

namespace DesapegaSenai.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ObjetoController:ControllerBase
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

            var sessao = Request.Cookies["IdUsado"];
            if (sessao != null)
            {
                objeto.Fk_usuarios_matricula = int.Parse(sessao);
            }

            _context.Add(objeto);
            _context.SaveChanges();
            return Created("Teste", objeto);
        }
    }
}
