namespace DesapegaSenai.Models
{
    public class Mensagem
    {
        public int Id { get; set; }
        public DateTime Data_hr { get; set; }
        public int Fk_usuarios_remetente { get; set; }
        public int Fk_usuarios_destinatario { get; set; }


    }
}
