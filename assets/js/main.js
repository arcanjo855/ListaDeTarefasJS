





const btnTarefa = document.querySelector('.btn-tarefa');
const inputTarefa = document.querySelector('.input-tarefa');
const tarefas = document.querySelector('.tarefas');




btnTarefa.addEventListener('click',()=>{
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
})

inputTarefa.addEventListener('keypress',(e)=>{
    if(e.keyCode === 13){
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
})


const criaLi = () =>{
    const li = document.createElement('li');
    return li;
}

const criaTarefa = (textoInput) =>{
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

const limpaInput = () =>{
    inputTarefa.value = '';
    inputTarefa.focus();
}

const criaBotaoApagar = (li) =>{
    li.innerText += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class','apagar')
    li.appendChild(botaoApagar)
}

const salvarTarefas = () =>{
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}



document.addEventListener('click',(e)=>{
    const el = e.target;
    
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
    }
    salvarTarefas();
})



const adicionaTarefasSalvas = () =>{
    const tarefas = localStorage.getItem('tarefas');
    const listaTarefas = JSON.parse(tarefas)
    
    for(let tarefa of listaTarefas){
        criaTarefa(tarefa)
    }
}

adicionaTarefasSalvas();