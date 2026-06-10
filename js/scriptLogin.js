const email = document.getElementById('email');
const senha = document.getElementById('senha');
const form =document.getElementById('form')

form.addEventListener('submit', (e) =>{
    e.preventDefault();
  
        fetch("https://localhost:7132/usuario/login", {
        method: "POST",
        credentials:"include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email:document.getElementById("email").value,
            senha:document.getElementById("senha").value
        })
    })
    .then(response => {
    console.log(response);

     if (response.status == 401) {
            alert("Email ou senha incorreta");
        }
        response.text();
    })
      .then(data => {

            window.location.href = "index.html";
        })
    
    
});

