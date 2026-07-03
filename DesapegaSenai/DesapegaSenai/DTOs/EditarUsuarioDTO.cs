using System.ComponentModel.DataAnnotations.Schema;

namespace DesapegaSenai.DTOs
{
    public class EditarUsuarioDTO
    {
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string? Foto_usuario { get; set; } = null;

        [NotMapped]
        public IFormFile? ArquivoFoto { get; set; }
    }
}
     