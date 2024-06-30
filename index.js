function abrirModal() {
   document.getElementById('overlay').classList.add("active");
   document.getElementById('criarTarefa').classList.add("active");
}

function fecharModal() {
   document.getElementById('overlay').classList.remove("active");
   document.getElementById('criarTarefa').classList.remove("active");
}

function buscarTarefas() {
   fetch("http://localhost:3000/tarefas")
      .then(res => res.json())
      .then(res => {
         inserirTarefas(res);
      });
}

function inserirTarefas(listaDeTarefas) {
   const lista = document.getElementById("lista");
   lista.innerHTML = '';
   if (listaDeTarefas.length > 0) {
      listaDeTarefas.map(tarefa => {
         lista.innerHTML += `
           <li>
               <h5>${tarefa.titulo}</h5>
               <p>${tarefa.descricao}</p>
               <div class="actions">
                  <box-icon name="trash" onclick="deletarTarefa(${tarefa.id})" size="md"></box-icon>
               </div>
            </li>
           `
      });
   }
}

function novaTarefa(event) {
   event.preventDefault();
   let tarefa = {
      titulo: document.getElementById("titulo").value,
      descricao: document.getElementById("descricao").value
   };
   fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: {
         "Content-type": "application/json"
      },
      body: JSON.stringify(tarefa)
   })
      .then(res => res.json())
      .then(res => {
         fecharModal();
         buscarTarefas();
         let form = document.querySelector("#criarTarefa form");
         form.reset();
      });
}

function deletarTarefa(id) {
   fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'DELETE'
   })
      .then(res => res.json())
      .then(res => {
         alert(`Objeto com id: ${id} foi deletado`);
         buscarTarefas();
      });
}

function pesquisarTarefa() {
   let lis = document.querySelectorAll("ul li");
   const buscar = document.getElementById('busca').value;
   if (buscar.length > 0) {
      lis.forEach((li) => {
         if (!li.children[0].innerText.includes(buscar)) {
            li.classList.add('oculto');
         } else {
            li.classList.remove('oculto');
         }
      });
   } else {
      lis.forEach((li) => {
         li.classList.remove('oculto');
      });
   }
}

// Inicializa as tarefas ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
   buscarTarefas();
});
