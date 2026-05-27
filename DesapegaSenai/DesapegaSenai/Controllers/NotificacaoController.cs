using DesapegaSenai.Data;
using DesapegaSenai.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace DesapegaSenai.Controllers
{
    [ApiController]
    [Route("[controller")]
    public class NotificacaoController : ControllerBase

    {
        private readonly DesapegaContext _context;

        public NotificacaoController(DesapegaContext context)
        {
            _context = context;
        }
    }
}
