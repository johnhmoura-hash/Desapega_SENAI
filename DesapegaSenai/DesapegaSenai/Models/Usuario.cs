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
        public string Senha { get; set; }
        public int Pontos { get; set; }
        public bool Status_usuario { get; set; }


    }
    public class EstatisticasUsuarioDTO
    {
        public int TotalObjetos { get; set; }
        public int TotalTrocas { get; set; }
    }
}
