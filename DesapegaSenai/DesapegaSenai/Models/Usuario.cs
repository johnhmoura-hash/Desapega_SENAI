namespace DesapegaSenai.Models
{
    public class Usuario
    {
        public int Matricula { get; set; } 
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int Senha { get; set; }
        public int Pontos { get; set; }
        public bool Status_usuario { get; set; }

    }
}
