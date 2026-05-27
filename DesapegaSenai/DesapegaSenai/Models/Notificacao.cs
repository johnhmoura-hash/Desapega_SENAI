namespace DesapegaSenai.Models
{
    public class Notificacao
    {
        public int Id { get; set; }
        public string Conteudo { get; set; }
        public DateOnly Data { get; set; }
        public string status { get; set; }
        public int Fk_usuarios_matricula {  get; set; }
    }
}
