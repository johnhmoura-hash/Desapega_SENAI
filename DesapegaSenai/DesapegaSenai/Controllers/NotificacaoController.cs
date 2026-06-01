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
            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");

            var sessao = Request.Cookies["IdUsado"];
            if (sessao != null)
            {
                notificacao.Fk_usuarios_matricula = int.Parse(sessao);
            }

            _context.Add(notificacao);
            _context.SaveChanges();
            return Created("Teste", notificacao);
        }
        [HttpGet]
        public IActionResult BuscarNotificacao()
        {

            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");
            var idUsuarioLogado = Request.Cookies["IdUsado"];
            if (idUsuarioLogado != null)
            {
                var resultado = from u in _context.Usuarios
                                join n in _context.Notificacoes
                                on u.Matricula equals n.Fk_usuarios_matricula
                                where u.Matricula == int.Parse(idUsuarioLogado)
                                select new
                                {
                                    Usuarios = u.Nome,

                                    Objetos = n.Conteudo,
                                    n.Data,
                                    n.status,
                                    
                                };
                return Ok(resultado.ToList());
            }
            return Unauthorized("Não autenticado");

        }
       
    }
}
