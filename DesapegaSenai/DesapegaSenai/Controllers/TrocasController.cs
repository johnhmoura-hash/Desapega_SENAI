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
            var matricula = HttpContext.Session.GetString("Idusado");

            if (matricula == null)
                return Unauthorized("Não autenticado");

            int matriculaUsuario = int.Parse(matricula);

            var usuario = _context.Usuarios
                .FirstOrDefault(u => u.Matricula == matriculaUsuario);

            if (usuario == null)
                return Unauthorized();

            item.Fk_usuarios_remetente = usuario.Matricula;
            item.Data = DateOnly.FromDateTime(DateTime.Now);
            item.Status = "Pendente";

            if (item.Fk_usuarios_destinatario == 0)
                return BadRequest("Destinatário não informado.");

            if (item.Fk_objetos_remetente == 0)
                return BadRequest("Objeto remetente não informado.");

            if (item.Fk_objetos_destinatario == 0)
                return BadRequest("Objeto destinatário não informado.");

            _context.Trocas.Add(item);
            _context.SaveChanges();

            return Ok(item);
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            var usuario = HttpContext.Session.GetString("Idusado");
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
