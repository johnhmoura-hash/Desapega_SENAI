
using DesapegaSenai.Models;
using Microsoft.EntityFrameworkCore;

namespace DesapegaSenai.Data
{
    public class DesapegaContext : DbContext
    {
        public DesapegaContext(DbContextOptions<DesapegaContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Troca> Trocas   { get; set; }
        public DbSet<Objeto> Objetos { get; set; }
        public DbSet<Notificacao> Notificacoes { get; set; }
        public DbSet<Mensagem> Mensagens { get; set; }
        public DbSet<Denuncia> Denuncias { get; set; }
    }

}
