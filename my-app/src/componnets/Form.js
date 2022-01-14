import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Task from './Task';

const Form = ({ listTasks }) => {

    const [newTask, setNewTask] = useState({
        titulo: '',
        descricao: '',
        data: '',
        completed: false,
        arquivar: false
    });

    const editType = {
        titulo: 1,
        descricao: 2,
        data: 3
    }

    function handleEdit(value, type) {
        if (type == editType.titulo)
            newTask.titulo = value
        else if (type == editType.descricao)
            newTask.descricao = value
        else if (type == editType.data)
            newTask.data = value
        else if (type == editType.arquivar)
            newTask.arquivar = value
        else return
    }

    async function adicionarTask() {
        try {
            const adicionar = await axios.post('http://localhost:8080/api', {
                titulo: newTask.titulo, descricao: newTask.descricao, data: newTask.data, completed: false, arquivar: false
            });
            if (adicionar.status === 200) {
                listTasks()
            }
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div>
            <form className="todo-form">
                <input type="text" className="todo-input" placeholder="Nome da Tarefa" onChange={e => handleEdit(e.target.value, editType.titulo)} />
                <input type="text" className="todo-input" placeholder="Descrição" onChange={e => handleEdit(e.target.value, editType.descricao)} />
                <input type="date" className="todo-input" placeholder="Data" onChange={e => handleEdit(e.target.value, editType.data)} />
                <button type="button" className="buttonEditar"
                    onClick={() => {
                        adicionarTask()
                    }}>Adicionar</button>
                <Link to="/task/arquivar">
                    <button type="button" className="buttonEditar">Arquivadas</button>
                </Link>
            </form>
        </div>

    );
}

export default Form;