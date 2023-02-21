import React, { ChangeEvent } from 'react';
import { FilterValueType } from './App';
import { Tasklist } from './Tasklist';

export type TaskType = {
	id: string,
	title: string,
	isDone: boolean
}

type TodolistType = {
	title: string,
	tasks: TaskType[],
	changeFilter: (filter: FilterValueType) => void,
	removeTask: (taskId: string) => void,
	addTask: (title: string) => void,
	changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

export const Todolist: React.FC<TodolistType> = (props): JSX.Element => {

	const [title, setTitle] = React.useState('');
	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	}

	const addTask = () => {
		const trimmedTitle = title.trim();
		if (trimmedTitle) {
			props.addTask(title);
		}
		setTitle('');
	}

	const changeFilter = (filter: FilterValueType) => () => props.changeFilter(filter);

	return (

		<div>
			<h3>{props.title}</h3>
			<div>
				<input
					value={title}
					onChange={onChangeInputHandler} />
				<button onClick={addTask}>+</button>
			</div>
			<Tasklist
				tasks={props.tasks}
				removeTask={props.removeTask} />
			<div>
				<button onClick={changeFilter('all')}>All</button>
				<button onClick={changeFilter('active')}>Active</button>
				<button onClick={changeFilter('completed')}>Completed</button>
			</div>
		</div>
	);
}