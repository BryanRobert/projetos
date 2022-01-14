import React from 'react';
import Task from './Task';
import axios from 'axios';


const List = ({ tarefa, listTasks }) => {
    
    return (
        <div>
            { 
                tarefa ?
                    <Task tarefa={tarefa} listTasks={listTasks} />
                    :
                    <></>
            }            
        </div>

    )



};

export default List;