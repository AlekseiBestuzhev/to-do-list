import React from 'react';
import { TaskType } from './Todolist';

type TasklistType = {
	tasks: TaskType[]
}

export const Tasklist: React.FC<TasklistType> = (props): JSX.Element => {

	const taskItems: JSX.Element[] | JSX.Element =
		props.tasks.length
			? props.tasks.map(task => {

				return (
					<li key={task.id}>
						<input type="checkbox" checked={task.isDone} />
						<span>{task.title} </span>
						<button>x</button>
					</li>
				)
			})
			: <span>Your list is empty...</span>

	return (
		<ul>
			{taskItems}
		</ul>
	);
}