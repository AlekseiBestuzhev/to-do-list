import React, { ChangeEvent, FC, RefObject, useRef, useState } from 'react';
import { FilterValueType } from './App';
import TasksList from './TasksList';

type TodoListPropsType = {
	title: string,
	tasks: TaskType[],
	changeFilterValue: (filter: FilterValueType) => void,
	removeTask: (taskId: string) => void,
	addTask: (title: string) => void,
	changeTaskStatus: (taskId: string, newIsDone: boolean) => void,
	filter: FilterValueType
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
	const [error, setError] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
		error && setError(false);
		setTitle(e.currentTarget.value);
	}
	const addTask = () => {
		const trimmedTitle = title.trim();
		if (trimmedTitle) {
			props.addTask(title);
		} else {
			setError(true);
		}
		setTitle('');
	}
	const onKeyDownAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask();
	const changeFilterValue = (filter: FilterValueType) => () => props.changeFilterValue(filter);

	const maxLengthMessage = 15;
	const isUserMessageTooLong = title.length > maxLengthMessage;
	const inputErrorClasses = error || title.length > 15 ? 'input-error' : '';
	const userMaxLengthMessage = isUserMessageTooLong && <span style={{ color: 'red' }}>Too long</span>;
	const titleIsRequiredMessage = error && <span style={{ color: 'red' }}>Title is required!</span>;
	const isDisabled = !title.length;
	return (
		<div className={"todolist"}>
			<h3>{props.title}</h3>
			<div>
				<input
					className={inputErrorClasses}
					onKeyDown={onKeyDownAddTask}
					value={title}
					onChange={changeLocalTitle} />
				<button disabled={isDisabled} onClick={addTask}>+</button>
				{ }
				{userMaxLengthMessage}
				{titleIsRequiredMessage}
				{/* <input ref={addTaskInput} />
				<button onClick={addTask}>+</button> */}
			</div>
			<TasksList tasks={props.tasks}
				removeTask={props.removeTask}
				changeTaskStatus={props.changeTaskStatus} />
			<div>
				<button
					className={props.filter === 'all' ? 'active-filter-all' : ''}
					onClick={changeFilterValue('all')}>All</button>
				<button
					className={props.filter === 'active' ? 'active-filter-active' : ''}
					onClick={changeFilterValue('active')}>Active</button>
				<button
					className={props.filter === 'completed' ? 'active-filter-completed' : ''}
					onClick={changeFilterValue('completed')}>Completed</button>
			</div>
		</div>
	);
};

export default TodoList;