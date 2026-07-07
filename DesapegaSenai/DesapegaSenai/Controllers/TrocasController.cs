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


        [HttpGet]
        public IActionResult Trocas()
        {
            var usuario = HttpContext.Session.GetString("Idusado");

            if (usuario == null)
                return Unauthorized();

            int matricula = int.Parse(usuario);

            var trocas = (
                from t in _context.Trocas
                join u in _context.Usuarios
                    on t.Fk_usuarios_remetente equals u.Matricula
                join o in _context.Objetos
                    on t.Fk_objetos_remetente equals o.Id
                where t.Fk_usuarios_destinatario == matricula
                      && t.Status == "Pendente"
                select new
                {
                    t.Id,
                    NomeRemetente = u.Nome,
                    ProdutoOferecido = o.Nome,
                    t.Data,
                    t.Status
                }
            ).ToList();

            return Ok(trocas);
        }


        [HttpGet("{id}")]
        public IActionResult BuscarTroca(int id)
        {
            var usuario = HttpContext.Session.GetString("Idusado");

            if (usuario == null)
                return Unauthorized();

            int matricula = int.Parse(usuario);

            var troca = (
                from t in _context.Trocas

                join ur in _context.Usuarios
                    on t.Fk_usuarios_remetente equals ur.Matricula

                join ud in _context.Usuarios
                    on t.Fk_usuarios_destinatario equals ud.Matricula

                join or in _context.Objetos
                    on t.Fk_objetos_remetente equals or.Id

                join od in _context.Objetos
                    on t.Fk_objetos_destinatario equals od.Id

                where t.Id == id

                select new
                {
                    t.Id,
                    t.Pontos_proposto,

                    Remetente = ur.Nome,
                    FotoPerfilRemetente = ur.Foto_usuario,

                    Destinatario = ud.Nome,
                    FotoPerfilDestinatario = ud.Foto_usuario,

                    ProdutoRemetente = or.Nome,
                    FotoRemetente = or.Foto,
                    TempoRemetente = or.Tempo_uso,

                    ProdutoDestinatario = od.Nome,
                    FotoDestinatario = od.Foto,
                    TempoDestinatario = od.Tempo_uso
                }

            ).FirstOrDefault();

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

        [HttpPut]
        public IActionResult AtualizarTroca(int id, Troca troca)
        {
            var objBanco = _context.Trocas.Find(id);

            if (objBanco == null)
                return NotFound("Tarefa não encontrada");

            objBanco.Status = troca.Status;
           
            _context.SaveChanges();
            return Ok("Atualizado com sucesso!");
        }

    }
}
