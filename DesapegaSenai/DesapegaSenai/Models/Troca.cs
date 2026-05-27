namespace DesapegaSenai.Models
{
    public class Troca
    {
      public int Id { get; set; }
      public DateOnly Data { get; set; }
      public string Status { get; set; }  
      public int Pontos_proposto { get; set; }
      public int Fk_usuarios_matricula { get; set; }
      public int Fk_objetos_id { get; set; }

    }
}
