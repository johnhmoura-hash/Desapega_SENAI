namespace DesapegaSenai.Models
{
    public class Objeto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Categoria { get; set; }
        public string Tempo_uso { get; set; }
        public string Descricao { get; set; }
        public string Prefere_troca { get; set; }
        public string Fk_usuario_matricula { get; set; }
        public string Status_objeto {  get; set; }

    }
}
