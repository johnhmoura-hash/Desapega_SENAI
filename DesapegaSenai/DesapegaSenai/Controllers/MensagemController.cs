using DesapegaSenai.Data;
using DesapegaSenai.Models;
using Microsoft.AspNetCore.Mvc;

namespace DesapegaSenai.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MensagemController : ControllerBase
    {
        private readonly DesapegaContext _context;

        public MensagemController(DesapegaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetMensagens()
        {
            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            var mensagens = _context.Mensagens.ToList();
            return Ok(mensagens);
        }

        [HttpGet("{id}")]
        public IActionResult GetMensagem(int id)
        {
            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            var mensagem = _context.Mensagens.Find(id);
            if (mensagem == null)
                return NotFound();

            return Ok(mensagem);
        } 

        [HttpPost]
        public IActionResult EnviarMensagem([FromBody] Mensagem mensagem)
        {
            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            _context.Mensagens.Add(mensagem);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetMensagem), new { id = mensagem.Id }, mensagem);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMensagem(int id)
        {
            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            var mensagem = _context.Mensagens.Find(id);
            if (mensagem == null)
                return NotFound();

            _context.Mensagens.Remove(mensagem);
            _context.SaveChanges();
            return NoContent();
        }
    }
}