using DesapegaSenai.Data;
using DesapegaSenai.Models;
using Microsoft.AspNetCore.Mvc;

namespace DesapegaSenai.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
            var usuario = HttpContext.Session.GetString("Idusado");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            var mensagens = _context.Mensagens.ToList();
            return Ok(mensagens);
        }

        [HttpGet("conversas")]
        public IActionResult BuscarConversas()
        {
            var usuario = HttpContext.Session.GetString("Idusado");

            if (usuario == null)
                return Unauthorized();

            int usuarioID = int.Parse(usuario);

            var conversas = _context.Mensagens
                .Where(m => m.Fk_usuarios_remetente == usuarioID ||
                            m.Fk_usuarios_destinatario == usuarioID)
  
                .ToList()
                .GroupBy(m =>
                    m.Fk_usuarios_remetente == usuarioID
                        ? m.Fk_usuarios_destinatario
                        : m.Fk_usuarios_remetente)
                .Select(g =>
                {
                    var ultima = g
                    .OrderByDescending(x => x.Data_hr)
                    .ThenByDescending(x => x.Id)
                    .First();

                    var outroUsuario = _context.Usuarios
                        .FirstOrDefault(u => u.Matricula == g.Key);


                    if (outroUsuario == null)
                        return null;

                    return new
                    {
                        UsuarioId = outroUsuario.Matricula,
                        Nome = outroUsuario.Nome,
                        Foto = outroUsuario.Foto_usuario,
                        UltimaMensagem = ultima.Conteudo,
                        Data = ultima.Data_hr
                    };
                })
                .OrderByDescending(c => c.Data);


            return Ok(conversas);
        }

        [HttpGet("{id}")]
        public IActionResult GetMensagem(int id, int ultimoId =0)
        {
            var usuario = HttpContext.Session.GetString("Idusado");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            int usuarioID = int.Parse(usuario);

            var outroUsuario = _context.Usuarios
       .FirstOrDefault(u => u.Matricula == id);

            if (outroUsuario == null)
                return NotFound("Usuário não encontrado.");

            var mensagens = _context.Mensagens
                .Where(m =>
                    ((m.Fk_usuarios_remetente == usuarioID &&
                     m.Fk_usuarios_destinatario == id)
                    ||
                    (m.Fk_usuarios_remetente == id &&
                     m.Fk_usuarios_destinatario == usuarioID)
                      )
                     && m.Id > ultimoId
                     )
                .OrderBy(m => m.Data_hr)
                .Select(m => new
                {
                    m.Id,
                    m.Conteudo,
                    m.Data_hr,
                    m.Fk_usuarios_remetente,
                    MinhaMensagem = m.Fk_usuarios_remetente == usuarioID,
                    m.Fk_usuarios_destinatario,

                    NomeRemetente = _context.Usuarios
                        .Where(u => u.Matricula == m.Fk_usuarios_remetente)
                        .Select(u => u.Nome)
                        .First(),

                    FotoRemetente = _context.Usuarios
                        .Where(u => u.Matricula == m.Fk_usuarios_remetente)
                        .Select(u => u.Foto_usuario)
                        .First()
                })
                .ToList();

            return Ok(new
            {
                Contato = new
                {
                    Nome = outroUsuario.Nome,
                    Foto = outroUsuario.Foto_usuario
                },
                Mensagens = mensagens
            });
        }

            [HttpPost]
            public IActionResult EnviarMensagem([FromBody] Mensagem mensagem)
            {
                var usuario = HttpContext.Session.GetString("Idusado");
                if (usuario == null)
                    return Unauthorized("Não autenticado");

                mensagem.Fk_usuarios_remetente = int.Parse(usuario);
                mensagem.Data_hr = DateTime.Now;

                _context.Mensagens.Add(mensagem);
                _context.SaveChanges();
                return Ok();
            }

            [HttpDelete("{id}")]
            public IActionResult DeleteMensagem(int id)
            {
                var usuario = HttpContext.Session.GetString("Idusado");
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
