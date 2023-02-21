import React, { ChangeEvent } from 'react';
import { TaskType } from './Todolist';

type TasklistType = {
	tasks: TaskType[],
	removeTask: (taskId: string) => void,
	changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

export const Tasklist: React.FC<TasklistType> = (props): JSX.Element => {

	const taskItems: JSX.Element[] | JSX.Element =
		props.tasks.length
			? props.tasks.map(task => {

				const removeTaskHandler = () => props.removeTask(task.id);
				return (
					<li key={task.id}>
						<input type="checkbox" checked={task.isDone} />
						<span>{task.title} </span>
						<button onClick={removeTaskHandler}>x</button>
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