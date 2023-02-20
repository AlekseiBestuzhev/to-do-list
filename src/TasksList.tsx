import React, { FC } from 'react';
import { TaskType } from "./TodoList";

type TasksListPropsType = {
	tasks: TaskType[],
	removeTask: (taskId: string) => void,
	changeTaskStatus: (taskId: string) => void
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {

	const tasksItems: JSX.Element[] | JSX.Element =
		props.tasks.length
			? props.tasks.map((task) => {
				const removeTask = () => props.removeTask(task.id);
				const changeTaskStatus = () => props.changeTaskStatus(task.id);
				return (
					<li key={task.id}>
						<input type="checkbox"
							checked={task.isDone}
							onChange={changeTaskStatus} />
						<span>{task.title}</span>
						<button onClick={removeTask}>x</button>
					</li>
				)
			})
			: <span>Your tasks list is empty</span>
	return (
		<ul>
			{tasksItems}
		</ul>
	);
};

export default TasksList;
