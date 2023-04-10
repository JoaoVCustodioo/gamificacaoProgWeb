function criarCarro() {

  const carro = {
    registro: Math.floor(Math.random() * 1000000000000000000),
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    versao: document.getElementById("versao").value,
    quilometragem: document.getElementById("quilometragem").value,
    ano: document.getElementById("ano").value,
    preco: document.getElementById("preco").value,
    cor: document.getElementById("cor").value,
    opcionais: [],
    blindado: document.querySelector('input[name="blindado"]:checked').value,
  };
  let opcionais = document.querySelectorAll('input[type="checkbox"]:checked');
  opcionais.forEach(opcional => {
    carro.opcionais.push(opcional.value);
  });
  
  alert(`Carro criado: ${carro.registro}`);

  let carros = JSON.parse(localStorage.getItem("carros")) || [];
  carros.push(carro);//adiciona carro a uma lista
  localStorage.setItem("carros", JSON.stringify(carros));
}

function listarCarros() {
  let carros = JSON.parse(localStorage.getItem("carros")) || [];
  let tabela = document.getElementById("tabela-carros");
  tabela.innerHTML = "";
  carros.forEach(carro => {
    let linha = tabela.insertRow();
    let colunaMarca = linha.insertCell();
    let colunaModelo = linha.insertCell();
    let colunaAno = linha.insertCell();
    let colunaOpcionais = linha.insertCell();
    let opcoes = linha.insertCell();
    colunaMarca.innerHTML = carro.marca;
    colunaModelo.innerHTML = carro.modelo;
    colunaAno.innerHTML = carro.ano;
    colunaOpcionais.innerHTML = carro.opcionais.join(", ");
    
    //botao editar
    let editarBtn = document.createElement("button");
    editarBtn.innerText = "Editar";
    editarBtn.classList.add("botao-editar");
    editarBtn.onclick = function () {
      editarCarro(carro.registro);
    };

    //botao excluir
    let excluirBtn = document.createElement("button");
    excluirBtn.innerText = "Excluir";
    excluirBtn.classList.add("botao-excluir");
    excluirBtn.onclick = function () {
      excluirCarro(carro.registro);
    };
    opcoes.appendChild(editarBtn);
    opcoes.appendChild(excluirBtn);
  });
}

function excluirCarro(registro) {
  let carros = JSON.parse(localStorage.getItem("carros")) || [];
  
  //encontra o carro pra ser excluido
  let index = carros.findIndex(carro => carro.registro === registro);
  
  if (index !== -1) {
    //se encontra carro exclui do array de carros
    carros.splice(index, 1);
    
    // Salva a lista atualizada no LocalStorage
    localStorage.setItem("carros", JSON.stringify(carros));
    
    // Atualiza a lista de carros na tabela
    listarCarros();
  }
}

  function editarCarro(registro) {
    console.log(registro);
    let carros = JSON.parse(localStorage.getItem("carros")) || [];
    let index = carros.findIndex(carro => carro.registro === registro);
    if (index !== -1) {
      
      let carro = carros[index];
      window.location.href = `form.html?marca=${carro.marca}&modelo=${carro.modelo}&versao=${carro.versao}&quilometragem=${carro.quilometragem}&ano=${carro.ano}&preco=${carro.preco}&cor=${carro.cor}&blindado=${carro.blindado}&opcionais=${JSON.stringify(carro.opcionais)}`;
      carros.splice(index, 1);
      localStorage.setItem("carros", JSON.stringify(carros));
    }
  }


