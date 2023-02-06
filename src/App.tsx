import React, { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from "./TodoList";

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
	const toDoListTitle = 'What to learn?';
	const [tasks, setTasks] = useState<Array<TaskType>>([
		{ id: 1, title: 'HTML & CSS', isDone: true },
		{ id: 2, title: 'JavaScript', isDone: true },
		{ id: 3, title: 'React & TS', isDone: false },
		{ id: 4, title: 'Redux', isDone: false },
	])

	const removeTask = (taskId: number) => {
		const updatedTasks = tasks.filter(elem => elem.id !== taskId);
		setTasks(updatedTasks);
	}

	const [filter, setFilter] = useState<FilterValueType>('all');

	let filteredTasks: TaskType[] = [];

	const changeFilterValue = (filter: FilterValueType) => {
		setFilter(filter);
	}

	if (filter === 'all') {
		filteredTasks = tasks;
	}
	if (filter === 'active') {
		filteredTasks = tasks.filter(elem => elem.isDone === false);
	}
	if (filter === 'completed') {
		filteredTasks = tasks.filter(elem => elem.isDone === true);
	}

	return (
		<div className="App">
			<Todolist
				title={toDoListTitle}
				tasks={filteredTasks}
				changeFilterValue={changeFilterValue}
				removeTask={removeTask} />
		</div>
	);
}

export default App;
