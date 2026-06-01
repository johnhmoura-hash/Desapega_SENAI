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

        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            var troca = _context.Trocas.Find(id);

            if (troca == null)
                return NotFound();

            return Ok(troca);
        }

        [HttpPost]
        public IActionResult Trocar(Troca item)
        {
            var email = HttpContext.Session.GetString("Email");
            if (email == null)
                return Unauthorized("Não autenticado");

            var usuario = _context.Usuarios
                .FirstOrDefault(u => u.Email == email);

            if (usuario == null)
                return Unauthorized();

            item.Fk_usuarios_remetente = usuario.Matricula;
            item.Data = DateOnly.FromDateTime(DateTime.Now);
            item.Status = "Pendente";

            if (item.Fk_usuarios_destinatario == 0)
                return BadRequest("Destinatário não informado.");

            if (item.Fk_objeto_remetente == 0)
                return BadRequest("Objeto remetente não informado.");

            if (item.Fk_objeto_destinatario == 0)
                return BadRequest("Objeto destinatário não informado.");

            _context.Trocas.Add(item);
            _context.SaveChanges();

            return Ok(item);
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            var item = _context.Trocas.Find(id);

            if (item == null)
                return NotFound();

            _context.Trocas.Remove(item);
            _context.SaveChanges();

            return Ok();
        }
    }
}
