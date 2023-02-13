import React, { FC, RefObject, useRef, useState } from 'react';
import { FilterValueType } from './App';
import TasksList from './TasksList';

type TodoListPropsType = {
	title: string,
	tasks: TaskType[],
	changeFilterValue: (filter: FilterValueType) => void,
	removeTask: (taskId: string) => void,
	addTask: (title: string) => void
}

export type TaskType = {
	id: string,
	title: string,
	isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props): JSX.Element => {
	// const addTaskInput: RefObject<HTMLInputElement> = useRef(null);
	// const addTask = () => {
	// 	if (addTaskInput.current && addTaskInput.current.value.length) {
	// 		props.addTask(addTaskInput.current.value);
	// 		addTaskInput.current.value = '';
	// 	}
	// }
	const [title, setTitle] = useState<string>('');
	const addTask = () => {
		props.addTask(title);
		setTitle('');
	}
	return (
		<div className={"todolist"}>
			<h3>{props.title}</h3>
			<div>
				<input
					value={title}
					onChange={(e) => setTitle(e.currentTarget.value)} />
				<button disabled={!title.length} onClick={addTask}>+</button>
				{title.length > 15 && <span style={{ color: 'red' }}>Too long</span>}
				{/* <input ref={addTaskInput} />
				<button onClick={addTask}>+</button> */}
			</div>
			<TasksList tasks={props.tasks} removeTask={props.removeTask} />
			<div>
				<button onClick={() => props.changeFilterValue('all')}>All</button>
				<button onClick={() => props.changeFilterValue('active')}>Active</button>
				<button onClick={() => props.changeFilterValue('completed')}>Completed</button>
			</div>
		</div>
	);
};

export default TodoList;