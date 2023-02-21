import React from 'react';
import { Tasklist } from './Tasklist';

export type TaskType = {
	id: string,
	title: string,
	isDone: boolean
}

type TodolistType = {
	title: string,
	tasks: TaskType[]
}

export const Todolist: React.FC<TodolistType> = (props): JSX.Element => {

	return (

		<div>
			<h3>{props.title}</h3>
			<div>
				<input />
				<button>+</button>
			</div>
			<Tasklist tasks={props.tasks} />
			<div>
				<button>All</button>
				<button>Active</button>
				<button>Completed</button>
			</div>
		</div>
	);
}