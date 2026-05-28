using System.ComponentModel.DataAnnotations;

namespace DesapegaSenai.Models
{
    public class Usuario
    {
        [Key]
        public int Matricula { get; set; } 
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int Pontos { get; set; }
        public string Status_usuario { get; set; }

    }
}
