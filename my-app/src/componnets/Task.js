import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


const Task = ({ tarefa, listTasks }) => {


    async function arquivarTask(task) {
        try {
            await axios.put(`http://localhost:8080/api/arquivar/${task._id}`)
            listTasks()
        } catch (err) {
            console.log(err)
        }

    }

    async function checkCard(task) {
        try {
            await axios.put(`http://localhost:8080/api/${task._id}`)
            listTasks()
        } catch (err) {
            console.log(err)
        }


    }

    async function deletarCard(task) {
        if (window.confirm('Você deseja deletar essa tarefa?')) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/${task._id}`)
                listTasks()
                if (response.status === 200)
                    console.log('uuhuuuu de broxa')

                else
                    console.log(response)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <>
            {tarefa.map(task => {
                return (
                    <div className={task.completed ? 'todo-row complete' : 'todo-row'}>
                        <h3 className="tituloTask">{task.titulo}</h3>
                        <h3 className="descricaoTask">{task.descricao}</h3>
                        <h3 className="titulo">{task.data}</h3>
                        <button className="button-container" onClick={() => deletarCard(task)}>Excluir</button>
                        <button className="button-container" onClick={() => { checkCard(task) }}>Check</button>
                        <Link to={`/task/${task._id}/editar`}>
                            <button className="button-container">Editar</button>
                        </Link>
                        <button className="button-container" onClick={() =>{arquivarTask(task)} }>Arquivar</button>
                    </div>
                )

            })}

        </>
    );
}

export default Task;