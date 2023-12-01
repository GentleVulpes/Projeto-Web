let listagem = document.getElementById("listagem");
let dataAtual = new Date();


function cadastrar() {
  event.preventDefault();
  let valorNome = document.getElementById("nome").value;
  let valorIdade = document.getElementById("idade").value;
  let valorEmail = document.getElementById("email").value;
  let valorSenha = document.getElementById("senha").value;
  let valorConfirmacaoSenha = document.getElementById("confirmacao").value;
  let dataDoCadastro = dataAtual.getDay() + "/" + dataAtual.getMonth() + "/" + dataAtual.getFullYear() + " às " + dataAtual.getHours() + ":" + dataAtual.getMinutes() + ":" + dataAtual.getSeconds();

  if(validaFormulario(valorNome, valorIdade, valorSenha, valorConfirmacaoSenha, valorEmail) == false){
    cadastrarNoSistema(valorEmail + "_nome", valorNome);
    cadastrarNoSistema(valorEmail + "_idade", valorIdade);
    cadastrarNoSistema(valorEmail + "_email", valorEmail);
    cadastrarNoSistema(valorEmail + "_senha", valorSenha);
    cadastrarNoSistema(valorEmail + "_data", dataDoCadastro);
  }
  gerarLista(valorNome, valorEmail, dataDoCadastro);
  limparFormulario(); 
  
}

//exibir mensagem: exibe a mensagem de cadastro bem sucedido na tela de cadastro.
function gerarLista(valorNome, valorEmail, dataDoCadastro) {
  event.preventDefault();
  if (retornarItemDoSistema( (valorEmail + "_nome") !== undefined) || (valorEmail + "_nome") !== null) {
    let ul_lista = document.createElement("ul");
    let li_nome = document.createElement("li");
    let li_email = document.createElement("li");
    
    let textoNome = document.createTextNode(retornarItemDoSistema(valorEmail + "_nome"));
    let textoEmail = document.createTextNode(retornarItemDoSistema(valorEmail + "_email"));

    li_nome.appendChild(textoNome);
    li_email.appendChild(textoEmail);

    li_nome.setAttribute("id", valorEmail + "_nome");
    li_email.setAttribute("id", valorEmail + "_email");
    li_email.classList.add("email");

    ul_lista.appendChild(li_nome);
    ul_lista.appendChild(li_email);

    let lixeira = document.createElement("img");
    let fechar = document.createElement("img");
    lixeira.src = "img/delete.svg";
    fechar.src = "img/close.svg";

    ul_lista.appendChild(lixeira);
    ul_lista.appendChild(fechar);

    ul_lista.classList.add("lista_usuarios");

    document.getElementById("container_ul").appendChild(ul_lista);
    fechar.onclick = removerElemento;
    lixeira.onclick = removerDoSistema;
  }
}

/*validaFormulario: faz a verificação do formulário e limpa os inputs que estiverem errados para o usuário digitar novamente*/
function validaFormulario(valorNome, valorIdade, valorSenha, valorConfirmacaoSenha, valorEmail) {
  if(seSenhasDiferentes(valorSenha, valorConfirmacaoSenha) == true || seEmailInvalido(valorEmail) == true ){
    return true;
  }
  if(verificaVazios(valorNome, valorIdade, valorSenha, valorConfirmacaoSenha, valorEmail) == true){
    return true;
  }
  return false;
}

/*cadastrarNoSistema: cadastra um novo item no sistema */
function cadastrarNoSistema(chaveItem, item) {
  event.preventDefault();
  localStorage.setItem(chaveItem, item);
}
function verificaVazios(valorNome, valorIdade, valorSenha, valorConfirmacao, valorEmail){
  if(valorNome == "" || valorIdade == "" || valorSenha == "" || valorConfirmacao == "" || valorEmail == ""){
    alert("Os campos não podem estar vazios!");
    limparFormulario();
    return true;
  }
  return false;   
}
/**/

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("email").value = "";
  document.getElementById("senha").value = "";
  document.getElementById("confirmacao").value = "";
}

function seIdadeInvalida(valorIdade) {
  if (valorIdade < 18 || valorIdade > 114) {
    if (valorIdade < 18) {
      alert("Idade Inválida! Menor de idade!");
    }
    if (valorIdade > 115) {
      alert("Idade Inválida! Não existem seres humanos com essa idade!");
    }
    document.getElementById("idade").value = "";
  }
}

function seSenhasDiferentes(valorSenha, valorConfirmacao) {
  if (valorSenha !== valorConfirmacao) {
    alert("As senha está diferente da confirmação!");
    document.getElementById("senha").value = "";
    document.getElementById("confirmacao").value = "";
    return true;
  }
  return false;
}

function seEmailInvalido(valorEmail) {
  if (valorEmail === retornarItemDoSistema(valorEmail)) {
    alert("e-mail já cadastrado!");
    document.getElementById("email").value = "";
    return true;
  }
  return false
}

function removerElemento(elemento){
  this.parentElement.remove();
}

function retornarItemDoSistema(chaveItem) {
  event.preventDefault();
  let item = localStorage.getItem(chaveItem);
  return item;
}

function removerDoSistema() {
  event.preventDefault();
  let ul_lista = document.getElementsByClassName("lista_usuarios");
  let emailLocal = ul_lista[0].childNodes[1].lastChild.textContent;
  console.log(emailLocal + "_nome");
  localStorage.removeItem(emailLocal + "_nome");
  localStorage.removeItem(emailLocal + "_idade");
  localStorage.removeItem(emailLocal + "_senha");
  localStorage.removeItem(emailLocal + "_data");
  localStorage.removeItem(emailLocal + "_email");
  this.parentElement.remove();
  // localStorage.removeItem();
  // localStorage.removeItem();
}

function removerTodosDoSistema() {
  event.preventDefault();
  localStorage.clear();
  let lista = document.querySelectorAll(".");
}