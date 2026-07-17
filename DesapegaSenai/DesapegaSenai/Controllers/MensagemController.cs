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

        [HttpGet("conversas")]
        public IActionResult BuscarConversas()
        {
            var usuario = HttpContext.Session.GetString("Idusuado");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            int usuarioID = int.Parse(usuario);

            var conversas = _context.Mensagens
                .Where(m => m.Fk_usuarios_remetente == usuarioID ||
                            m.Fk_usuarios_destinatario == usuarioID)
                .ToList()
                .GroupBy(m =>
                    m.Fk_usuarios_remetente == usuarioID
                        ? m.Fk_usuarios_destinatario
                        : m.Fk_usuarios_remetente)
                .Select(g => new
                {
                    Usuario = g.Key,
                    UltimaMensagem = g.OrderByDescending(x => x.Data_hr).First().Conteudo
                });

            return Ok(conversas);
        }


        [HttpGet("{id}")]
        public IActionResult GetMensagem(int id)
        {
            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            int usuarioID = int.Parse(usuario);

            var mensagens = _context.Mensagens
       .Where(m =>
           (m.Fk_usuarios_remetente == usuarioID &&
            m.Fk_usuarios_destinatario == id)
           ||
           (m.Fk_usuarios_remetente == id &&
            m.Fk_usuarios_destinatario == usuarioID))
       .OrderBy(m => m.Data_hr)
       .ToList();

            return Ok(mensagens);
        } 

        [HttpPost]
        public IActionResult EnviarMensagem([FromBody] Mensagem mensagem)
        {
            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            mensagem.Data_hr = DateTime.Now;

            _context.Mensagens.Add(mensagem);
            _context.SaveChanges();
            return Ok();
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
