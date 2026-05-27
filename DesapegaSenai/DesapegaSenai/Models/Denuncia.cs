namespace DesapegaSenai.Models
{
    public class Denuncia
    {
        public int Id { get; set; }
        public DateOnly Data { get; set; }
        public string Destinatario { get; set; }
        public int Fk_usuarios_matricula { get; set; }
        public int Fk_objetos_id { get; set; }  



    }
}
