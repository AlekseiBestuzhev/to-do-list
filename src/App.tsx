import React from 'react';
import './App.css';
import Todolist, {TaskType} from "./TodoList";

function App() {
    const toDoListTitle = 'What to learn?';
    const tasks: Array<TaskType> = [
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'ES6 & TS', isDone: true},
        {id: 3, title: 'React & Redux', isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title={toDoListTitle} tasks={tasks}/>
        </div>
    );
}

export default App;
