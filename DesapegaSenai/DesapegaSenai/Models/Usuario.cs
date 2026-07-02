using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DesapegaSenai.Models
{
    public class Usuario
    {
        [Key]
        public int Matricula { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public int Pontos { get; set; }
        public bool Status_usuario { get; set; }
        public string? Foto_usuario { get; set; } = null;

        [NotMapped]
        public IFormFile? ArquivoFoto { get; set; }


        public Usuario(int matricula, string nome, string telefone, string email, string senha, bool status_usuario, int pontos)
        {
            Matricula = matricula;
            Nome = nome;
            Telefone = telefone;
            Email = email;
            Senha = senha;
            Status_usuario = status_usuario;
            Pontos = pontos;
            Foto_usuario = "";
        }

        public Usuario() { }
    }


    public class EstatisticasUsuarioDTO
    {
        public int TotalObjetos { get; set; }
        public int TotalTrocas { get; set; }
    }
   
    } 
