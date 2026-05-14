const { type } = require("node:os");

function listarPedidos(){

    const lista = document.getElementById("lista");
    lista.innerHTML="carregando pedidos...";
    fetch(xxxxxxxxxxxxxx)
    .then(res => res.JSON())

    .then(resultado=>{
        lista.innerHTML="";
        resultado.dados.forEach(pedido => {
            const item = document.createElement("li");

            item.textContent=`${pedido.id} - ${pedido.cliente} | ${pedido.produto} | ${pedido.status}`;
        
            lista.appendChild(item);
        
        });

    })

    .catch(()=>{
        lista.innerHTML="erro ao carregar pedido"
    });
};


//criar pedido post
//função responsavel por cadastrarr um novo pedido

function cadastrarPedido(){
    const cliente= document.getElementById("cliente").value;
    const produto=document.getElementById("produto").value;
    
    fetch(xxxxxxx,{

    method: "POST",
    Headers:{
        'content-type': 'application/JSON'
    },
    body:   JSON.stringify({
        cliente: cliente,
        produto: produto,
        status:"pendente"
    })
    })

    .then(res=> res.JSON())

    .then(()=>{
        document.getElementById("cliente").value="";
        document.getElementById("produto").value= "";
        listarPedidos();
    })

    .catch(() =>{
        alert("erro ao cdastrar pedido");
    });
}

/// Atualizar pedido put

function atualizarPedido(){
    const id = Number(document.getElementById("idAtualizar").value);
    const status = document.getElementById("statusAtualizar").value;

    fetch(xxxxx, {
    method:"PUT",
    Headers: {
        'content-type': 'application/JSON'
    },
    body:JSON.stringify({
   
        id:id,
        status: status
    })
    })

    .then(res=> res.JSON())
    .then(()=>{

        document.getElementById("idAtualizar").value="";
        document.getElementById("statusAtualizar").value="";

        listarPedidos();
    });
}

