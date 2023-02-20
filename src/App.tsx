import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist, { TaskType } from "./TodoList";

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
	const toDoListTitle = 'What to learn?';
	const [tasks, setTasks] = useState<Array<TaskType>>([
		{ id: v1(), title: 'HTML & CSS', isDone: true },
		{ id: v1(), title: 'JavaScript', isDone: true },
		{ id: v1(), title: 'React & TS', isDone: false },
		{ id: v1(), title: 'Redux', isDone: false },
	])

	const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
		setTasks(tasks.map((t) => t.id === taskId ? { ...t, isDone: newIsDone } : t))
	}

	const removeTask = (taskId: string) => {
		const updatedTasks = tasks.filter(elem => elem.id !== taskId);
		setTasks(updatedTasks);
	}

	const addTask = (title: string) => {
		const newTask: TaskType = {
			id: v1(),
			title: title,
			isDone: false
		}
		setTasks([newTask, ...tasks]);
	}

	const [filter, setFilter] = useState<FilterValueType>('all');

	const changeFilterValue = (filter: FilterValueType) => setFilter(filter);

	const getFilteredTasks = (tasks: TaskType[], filter: FilterValueType) => {
		let filteredTasks: TaskType[] = [];
		switch (filter) {
			case 'active':
				return tasks.filter(elem => elem.isDone === false);
			case 'completed':
				return tasks.filter(elem => elem.isDone === true);
			default:
				return tasks;
		}
	}

	const filteredTasks: TaskType[] = getFilteredTasks(tasks, filter);

	return (
		<div className="App">
			<Todolist
				title={toDoListTitle}
				tasks={filteredTasks}
				changeFilterValue={changeFilterValue}
				removeTask={removeTask}
				addTask={addTask}
				changeTaskStatus={changeTaskStatus} />
		</div>
	);
}

export default App;
