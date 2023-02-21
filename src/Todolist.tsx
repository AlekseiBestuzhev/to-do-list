import React from 'react';
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
	removeTask: (taskId: string) => void
}

export const Todolist: React.FC<TodolistType> = (props): JSX.Element => {

	const changeFilter = (filter: FilterValueType) => () => props.changeFilter(filter);

	return (

		<div>
			<h3>{props.title}</h3>
			<div>
				<input />
				<button>+</button>
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