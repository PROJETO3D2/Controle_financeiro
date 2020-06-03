const usuarios = [];

function salvarUsuario(){
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const cidade = document.getElementById("cidade").value;
  
  let id = usuarios.length;

  const usuario = {id: id++,nome, endereco, telefone, email, cidade};
  usuarios.push(usuario);
  Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  limpar();
  listarUsuarios();
 

}
function cadUsuario(){
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const telefone = document.getElementById("telefone").value;
  const endereco = document.getElementById("endereco").value;
  const status = document.getElementById("status").value;
 

  const usuario = {id: Date.now(),nome, email, senha, telefone, endereco, status};
  
  let usuarioGravado = JSON.parse(window.localStorage.getItem("usuarios"));
  if(usuarioGravado == null){ 
    window.localStorage.setItem('usuarios',JSON.stringify([])); 
    usuarioGravado = JSON.parse(window.localStorage.getItem("usuarios"));

    let usuarioIndex = usuarioGravado.findIndex(usuario => usuario.email === email);
    if(usuarioIndex !== -1){ 
      Swal.fire({
    
        icon: 'warning',
        title: 'Email já está cadastrado no sistema!',
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      usuarioGravado.push(usuario); 
      window.localStorage.setItem('usuarios', JSON.stringify(usuarioGravado)); 
    }
    
  }else{ 
    let usuarioIndex = usuarioGravado.findIndex(usuario => usuario.email === email);
    if(usuarioIndex !== -1){ 
      Swal.fire({
    
        icon: 'warning',
        title: 'Email já está cadastrado no sistema!',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else{
      usuarioGravado.push(usuario); 
      window.localStorage.setItem('usuarios',JSON.stringify(usuarioGravado));
    }  
    
  }

}


function apagarUsuario(id){
  Swal.fire({
    title: 'Confirmar a exclusão do Usuário?',
    
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim'
  }).then((result) => {
    if (result.value) {
      let usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);
      if(usuarioIndex >= 0){
        usuarios.splice(usuarioIndex,1);
        if(usuarios.length > 0){
          listarUsuarios();
        }else{
          row = document.getElementById("tbody");
          row.innerHTML = "";
        }
      }
      Swal.fire(
        'Usuário excluído!',
        '',
        'success'
      )
    }
  });
}

function logar(){
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  
  let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));
  
  let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.email === email);
  if(usuarioIndex === -1){
    Swal.fire({
    
      icon: 'warning',
      title: 'Email não cadastrado!',
      showConfirmButton: false,
      timer: 1500
    });
  }else{ 
        if(usuariosGravados[usuarioIndex].senha !== senha){ 
          Swal.fire({
    
            icon: 'warning',
            title: 'Senha incorreta!',
            showConfirmButton: false,
            timer: 1500
          });
        }else{ 
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: `Bem vindo, ${usuariosGravados[usuarioIndex].nome} !`
          })
        }
  }
  
}

function limpar(){

let inputs = document.getElementsByTagName("input");
for(let i = 0; i < inputs.length; i++){
   inputs[i].value = "";
}
  
}



function editarUsuario(id){
  for(let i = 0; i < usuarios.length; i++){
      if(usuarios[i].id == id){

        document.getElementById("id").value = usuarios[i].id;
        document.getElementById("nome").value = usuarios[i].nome;
        document.getElementById("email").value = usuarios[i].email;
        document.getElementById("telefone").value = usuarios[i].telefone;
        document.getElementById("endereco").value = usuarios[i].endereco;
        document.getElementById("status").value = usuarios[i].status;
      }
 }
}

function alterarUsuario(){
  const id = document.getElementById("id").value;
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const endereco = document.getElementById("endereco").value;
  const status = document.getElementById("status").value;

  // como fazer para atualiza a posicao do array
  usuarios[id] = {id,nome, email, senha, telefone, endereco, status};
  Swal.fire({
    
    icon: 'success',
    title: 'Usuário atualizado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  limpar();
  listarUsuarios();

}


function listarUsuarios(){
  let linha = "";
  usuarios.forEach(usuario => {
    row = document.getElementById("tbody");
     linha += "<tr>"+
              "<td id='tdid'>"+usuario.id +"</td>"+
              "<td id='tdnome'>"+usuario.nome +"</td>"+
              "<td id='tdemail'>"+usuario.email+"</td>"+
              "<td id='tdtelefone'>"+usuario.telefone+"</td>"+
              "<td id='tdendereco'>"+usuario.endereco+"</td>"+
              "<td id='tdstatus'>"+usuario.status+"</td>"+
              "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarUsuario("+usuario.id+")'><i class='fa fa-edit'></i></button>"+
              "<button class='btn btn-outline-danger'onclick='apagarUsuario("+usuario.id+")'><i class='fa fa-trash'></i></button></td>"
            +"</tr>";
    row.innerHTML = linha;        

  
  
  });
 }
