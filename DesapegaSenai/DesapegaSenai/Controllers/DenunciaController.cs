using DesapegaSenai.Data;
using DesapegaSenai.Models;
using Microsoft.AspNetCore.Mvc;

namespace DesapegaSenai.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DenunciaController : ControllerBase
    {
        private readonly DesapegaContext _context;

        public DenunciaController(DesapegaContext context)
        {
            _context = context;


        }
        [HttpPost]
        public async Task<ActionResult<Denuncia>> PostDenuncia(Denuncia denuncia)
        {
            var usuario = HttpContext.Session.GetString("Email");
            if (usuario == null)
                return Unauthorized("Não autenticado");
            _context.Denuncias.Add(denuncia);
            await _context.SaveChangesAsync();

            return Ok(denuncia);
        }
    }
}