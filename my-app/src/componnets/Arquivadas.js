import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


const Arquivadas = ({ tarefa, listTasks }) => {

    const [tarefaArquivadas, setTarefaArquivadas] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/arquivados")
            .then(response => setTarefaArquivadas(response.data))
    }, [])

    console.log(tarefaArquivadas)





    return (
        <>
            {tarefaArquivadas.map(task => {
                return (
                    <div>
                        <div className={task.completed ? 'todo-row complete' : 'todo-row'}>
                            <h3 className="tituloTask">{task.titulo}</h3>
                            <h3 className="descricaoTask">{task.descricao}</h3>
                            <h3 className="titulo">{task.data}</h3>
                        </div>
                    </div>

                )
            })}
            <div >
                <Link to="/">
                    <button type="button" className="buttonEditar">Voltar</button>
                </Link>
            </div>
        </>
    );
}

export default Arquivadas;