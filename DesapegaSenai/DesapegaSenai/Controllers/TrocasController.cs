using Microsoft.AspNetCore.Mvc;
using DesapegaSenai.Data;
using DesapegaSenai.Models;


namespace DesapegaSenai.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class TrocasController : ControllerBase
    {
        private readonly DesapegaContext _context;


        public TrocasController(DesapegaContext context)
        {
            _context = context;
        }

        [HttpGet()]
        public IActionResult Trocas()
        {
            return Ok(_context.Trocas.ToList());
        }

        [HttpPost]
        public IActionResult Trocar(Troca item)
        {

            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            var idUsuarioLogado = Request.Cookies["IdUsado"];
            if (idUsuarioLogado != null)

                _context.Trocas.Add(item);
            _context.SaveChanges();

            return Ok(item);
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            var item = _context.Trocas.Find(id);

            if (item == null)
                return NotFound();

            _context.Trocas.Remove(item);
            _context.SaveChanges();

            return Ok();
        }
    }
}
