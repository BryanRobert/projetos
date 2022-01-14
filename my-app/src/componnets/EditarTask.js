import React, { useState, useEffect } from 'react';
import { useParams, useHistory  } from 'react-router-dom';
import axios from 'axios'
import {Link} from 'react-router-dom'


const EditarTask = ({listTasks}) => {

    
    const [tarefa, setTarefa] = useState({})
    useEffect( ()=>{
        let task
        axios.get(`http://localhost:8080/api/${id}`)
        .then(response =>{
            setTarefa(response.data[0])  
            console.log(tarefa)
                
        })
        .catch(e=>console.log(e))        
    },[])
    
    
    let history = useHistory()   
    const { id } = useParams()
    
    
    
    
    const [newData, setNewdata] = useState("");
    const [newDescricao, setNewdescricao] = useState('');
    
    async function EditarTask(newDescricao, newData) {
        try {
            const response = await axios.put(`http://localhost:8080/api/atualizar/${id}`, {
                descricao : newDescricao, data : newData
            });

            if (response.status === 200) listTasks()
            
        } catch (err) {
            console.log(err)
        }
    }

        console.log(newData)
    return ( 

        <>
        <form className="todo-form">
                <h1 className='tituloEditar'>Título:</h1>
                <input type="text" className="todo-input" value={tarefa.titulo}/>
                <h1 className='tituloEditar'>Descrição:</h1>
                <input type="text" className="todo-input" placeholder="Descrição" value={newDescricao} onChange={e=>setNewdescricao(e.target.value)}/>   
                <h1 className='tituloEditar'>Data:</h1>       
                <input type="date" className="todo-input" placeholder="Data" value={newData} onChange={e=>setNewdata(e.target.value)}/>                 
                <Link to='/'>
                <button type="button" className="buttonEditar" onClick={()=>EditarTask(newDescricao, newData)} >Salvar</button>                 
                </Link>
                <Link to="/">
                <button type="button" className="buttonEditar" >Cancelar</button> 
                </Link>
                           
        </form>
        </>
     );
}
 
export default EditarTask;