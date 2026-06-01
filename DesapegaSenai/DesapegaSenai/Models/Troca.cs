namespace DesapegaSenai.Models
{
    public class Troca
    {
        public int Id { get; set; }
        public DateOnly Data { get; set; }
        public string Status { get; set; }
        public int Pontos_proposto { get; set; }
        public int Fk_usuarios_remetente { get; set; }
        public int Fk_objetos_remetente { get; set; }
        public int Fk_usuarios_destinatario { get; set; }
        public int Fk_objetos_destinatario { get; set; }
    }
}