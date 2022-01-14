import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Form from './componnets/Form';
import List from './componnets/List';
import Arquivadas from './componnets/Arquivadas';
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import EditarTask from './componnets/EditarTask';
import PesquisarTask from './componnets/PesquisarTask';

export default function App() {

  const [tarefa, setTarefa] = useState()

  useEffect (() => { 
    if (!tarefa) listTasks()
  }, [tarefa])

  const listTasks = async () => {
    const response = await axios.get("http://localhost:8080/api")
    setTarefa(response.data)
}

  return (
    <>
         

        <Route path="/" exact>
          
          <div className='pesquisarContainer'>
            <PesquisarTask tarefa={tarefa} setTarefa={setTarefa}/>
          </div>

          <div className="todo-app">            
            <Form listTasks={listTasks}/>
            <List tarefa={tarefa} listTasks={listTasks}/>
          </div>

        </Route>
        <Route path="/task/:id/editar">
          <div className="todo-app">
            <EditarTask listTasks={listTasks}/>
          </div>
        </Route>
        <Route path="/task/arquivar">
          <div className="todo-app">
            <Arquivadas/>
          </div>
        </Route>
    </>

  );
}



