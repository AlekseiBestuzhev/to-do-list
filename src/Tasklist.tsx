import React, { ChangeEvent } from 'react';
import { TaskType } from './Todolist';
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { EditableSpan } from './EditableSpan';

type TasklistType = {
	tasks: TaskType[],
	todolistID: string,
	removeTask: (todolistID: string, taskId: string) => void,
	changeTaskStatus: (todolistID: string, taskId: string, newIsDone: boolean) => void
}

export const Tasklist: React.FC<TasklistType> = (props): JSX.Element => {

	const [listRef] = useAutoAnimate<HTMLUListElement>();

	const taskItems: JSX.Element[] | JSX.Element =
		props.tasks.length
			? props.tasks.map(task => {

				const removeTaskHandler = () => props.removeTask(props.todolistID, task.id);
				const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistID, task.id, e.currentTarget.checked);
				const taskClasses = task.isDone ? 'task completedTask' : 'task';
				return (
					<li key={task.id}>
						<input type="checkbox"
							checked={task.isDone}
							onChange={changeTaskStatus} />
						<EditableSpan
							title={task.title}
							spanClassses={taskClasses} />
						<button
							className='removeButton'
							onClick={removeTaskHandler}>x</button>
					</li>
				)
			})
			: <span>Your list is empty...</span>

	return (
		<ul ref={listRef} className='taskItems'>
			{taskItems}
		</ul>
	);
}