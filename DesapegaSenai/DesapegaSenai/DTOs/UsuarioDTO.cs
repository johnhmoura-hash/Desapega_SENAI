using System.ComponentModel.DataAnnotations.Schema;

namespace DesapegaSenai.DTOs
{
    public class UsuarioDTO
    {
            public int Matricula { get; set; }
            public string Nome { get; set; }
            public string Telefone { get; set; }
            public string Email { get; set; }
            public string Senha { get; set; }
    }
}
