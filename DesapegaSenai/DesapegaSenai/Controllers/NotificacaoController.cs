using DesapegaSenai.Data;
using DesapegaSenai.Models;
using Microsoft.AspNetCore.Mvc;


namespace DesapegaSenai.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotificacaoController : ControllerBase

    {
        private readonly DesapegaContext _context;

        public NotificacaoController(DesapegaContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CriarNotificacao(Notificacao notificacao)
        {
            var usuario = HttpContext.Session.GetString("Idusado");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            var sessao = Request.Cookies["Idusado"];
            if (sessao != null)
            {
                notificacao.Fk_usuarios_matricula = int.Parse(sessao);
            }

            _context.Add(notificacao);
            _context.SaveChanges();
            return Created("Teste", notificacao);
        }

        [HttpGet]
        public IActionResult BuscarNotificacoes()
        {
            var usuario = HttpContext.Session.GetString("Idusado");

            if (usuario == null)
                return Unauthorized();

            int matricula = int.Parse(usuario);

            var notificacoes = (
    from n in _context.Notificacoes
    join u in _context.Usuarios
        on n.Fk_usuarios_matricula equals u.Matricula
    where n.Fk_usuarios_matricula == matricula
    orderby n.Data descending
    select new
    {
        n.Id,
        n.Conteudo,
        n.Data,
        n.Status,
        n.Tipo,  
        n.Fk_troca_id,
        Nome = u.Nome



    }
).ToList();

            return Ok(notificacoes);
        }


    }
}
