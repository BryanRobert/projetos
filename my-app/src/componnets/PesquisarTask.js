import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useHistory  } from 'react-router-dom';

const PesquisarTask = ({tarefa, setTarefa}) => {

    function handlePesquisar(ev){
        if(ev.target.value != '' ) pesquisar(ev.target.value)
        else listar()
    }

    function pesquisar(descricao){
        axios.get(`http://localhost:8080/api/search/${descricao}`)
        .then(response =>{
            setTarefa(response.data)
                
        })
        .catch(e=>console.log(e))
    }

    function listar(){
        axios.get(`http://localhost:8080/api`)
        .then(response =>{
            setTarefa(response.data)     
                
        })
        .catch(e=>console.log(e))
    }


    return (
        <>
            <input className="inputPesquisar" placeholder='Digite para buscar uma tarefa' onChange={handlePesquisar}></input>
        </>

    );
}

export default PesquisarTask;