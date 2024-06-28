function abrirModal() {
   document.getElementById('overlay').classList.add("active");
   document.getElementById('abrirModal').classList.add("active");
}

function fecharModal() {
   document.getElementById('overlay').classList.remove("active");
   document.getElementById('criarTarefa').classList.remove("active");
}

function buscarTarefas() {
   fetch("http://localhost:4444/tarefas")
      .then(res => res.json())
      .then(res => {
      })
}

function inserirTarefas(listaDeTarefas) {
   if (listaDeTarefas.length > 0) {
      listaDeTarefas.map(tarefa => {
         lista.innerHTML += `
           <li>
               <h5>${tarefa.titulo}</h5>
               <p>${tarefa.descricao}</p>
               <div class="actions">
                  <box-icon name="trash" size="" md></box-icon>
               </div>
            </li>
           `
      })
   }
}

function novaTarefa() {
   event.preventDefault();
   let tarefa = {
      titulo: titulo.value,
      descricao: descricao.value
   }
   fetch("http://localhost:4444/tarefas", {
      method: "POST",
      headers: {
         "Content-type": "application/json"
      },
      body: JSON.stringify(tarefa)
   })
      .then(res => res.json())
      .then(res => {
         fecharModal();
         buscarTarefas()
      })
}
