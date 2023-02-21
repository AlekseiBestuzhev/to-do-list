import React from 'react';
import { TaskType } from './Todolist';

type TasklistType = {
	tasks: TaskType[]
}

export const Tasklist: React.FC<TasklistType> = (props): JSX.Element => {

	return (
		<ul>
			<li><input type="checkbox" checked={true} /> <span>HTML&CSS</span></li>
			<li><input type="checkbox" checked={true} /> <span>JS</span></li>
			<li><input type="checkbox" checked={false} /> <span>React</span></li>
		</ul>
	);
}