namespace DesapegaSenai.Models
{
    public class Notificacao
    {
        public int Id { get; set; }
        public string Conteudo { get; set; }
        public DateOnly Data { get; set; }
        public string? Status { get; set; }
        public int Fk_usuarios_matricula {  get; set; }
        public int? Fk_troca_id { get; set; }
        public string? Tipo { get; set; }
    }
}
