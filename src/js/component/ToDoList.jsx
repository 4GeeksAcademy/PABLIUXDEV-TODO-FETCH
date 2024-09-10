import React, { useEffect, useState } from "react";
import Task from "./Task.jsx"

const ToDoList = () => {

    const [newTask, setNewTask] = useState("")

    const [taskList, setTaskList] = useState([]);

    const loadTask = async () => {
        const response = await fetch("https://playground.4geeks.com/todo/users/pablodavila")
        if ( ! response.ok ){
            const responseUser = await fetch("https://playground.4geeks.com/todo/users/pablodavila", {

                method: "POST",
                body: JSON.stringify({
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            loadTask()
            return 
        }
        const body = await response.json()
        setTaskList(body.todos)
    }

    const deleteTask = async (id) => {
        const response = await fetch("https://playground.4geeks.com/todo/todos/" + id, {

            method: "DELETE"
        })
        if (response.ok) {
            loadTask()
        }
    }

    const postTask = async (id) => {
        if(newTask == "") return 
        const response = await fetch("https://playground.4geeks.com/todo/todos/pablodavila", {

            method: "POST",
            body: JSON.stringify({
                label:newTask, 
                is_done: false
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            loadTask()
            setNewTask("")
        }
    }


    useEffect(
        () => {
            loadTask()
        }, []
    )

    return (
        <div className="container">
            <div className="card d-flex">
                <div className="card-header h1 bg-dark text-white">
                    To Do's
                    <div className="card-body h5">
                        
                        <input className="m-2 h6 input-group text-center mx-auto" type="text" value={newTask} placeholder="What do you want to do next?"
                            onChange={(event) => setNewTask(event.target.value)}

                            onKeyUp={(event) => {
                                if (event.key == "Enter") {
                                    postTask()
                                }
                            }}

                        />
                       
                        
                        {taskList &&(taskList.length == 0) && <div>No more tasks! Time for a drink!</div>}
                        {taskList && taskList.map((tarea, indice) => <Task task={tarea.label} key={indice} onRemove={() => {
                            deleteTask(tarea.id)
                        }} />)}
                        <p className="mt-2">{taskList.length} Items Left</p>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ToDoList;