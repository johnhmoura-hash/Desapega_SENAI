namespace DesapegaSenai.Models
{
    public class Objeto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Categoria { get; set; }
        public IFormFile Foto { get; set; }
        public string Tempo_uso { get; set; }
        public string Descricao { get; set; }
        public string Prefere_troca { get; set; }
        public int Fk_usuarios_matricula { get; set; }
        public bool Status_objeto {  get; set; }

    }
}
