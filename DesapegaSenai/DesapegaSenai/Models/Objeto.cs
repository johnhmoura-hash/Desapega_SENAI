using System.ComponentModel.DataAnnotations.Schema;

namespace DesapegaSenai.Models
{
    public class Objeto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Categoria { get; set; }
        public string Foto { get; set; }
        public string Tempo_uso { get; set; }
        public string Descricao { get; set; }
        public string Prefere_troca { get; set; }
        public int Fk_usuarios_matricula { get; set; }
        public bool Status_objeto {  get; set; }
        
        [NotMapped]
        public IFormFile? ArquivoFoto { get; set; }

        public Objeto(string nome, string categoria, string foto, string tempo_uso, string descricao, string prefere_troca, bool status_objeto)
        {
            Nome = nome;
            Categoria = categoria;
            Foto = foto;
            Tempo_uso = tempo_uso;
            Descricao = descricao;
            Prefere_troca = prefere_troca;
            Status_objeto = status_objeto;
            
        }
    }
}
