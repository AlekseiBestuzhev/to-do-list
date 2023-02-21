import React from 'react';

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
			<ul>
				<li><input type="checkbox" checked={true} /> <span>HTML&CSS</span></li>
				<li><input type="checkbox" checked={true} /> <span>JS</span></li>
				<li><input type="checkbox" checked={false} /> <span>React</span></li>
			</ul>
			<div>
				<button>All</button>
				<button>Active</button>
				<button>Completed</button>
			</div>
		</div>
	);
}