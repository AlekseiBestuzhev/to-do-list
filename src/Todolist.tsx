import React, { ChangeEvent } from 'react';
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
	removeTask: (taskId: string) => void,
	addTask: (title: string) => void,
	changeTaskStatus: (taskId: string, newIsDone: boolean) => void,
	filter: FilterValueType
}

export const Todolist: React.FC<TodolistType> = (props): JSX.Element => {

	const [error, setError] = React.useState<boolean>(false);
	const inputErrorClasses = `input ${error ? 'errorInput' : ''}`;

	const [title, setTitle] = React.useState('');
	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		error && setError(false);
		setTitle(e.currentTarget.value);
	}

	const trimmedTitle = title.trim();

	const addTask = () => {
		if (trimmedTitle) {
			props.addTask(trimmedTitle);
		} else {
			setError(true);
		}
		setTitle('');
	}

	const changeFilter = (filter: FilterValueType) => () => props.changeFilter(filter);

	const maxLengthTitle: number = 15;
	const isTitleTooLong = trimmedTitle.length > maxLengthTitle;
	const titleTooLongMessage = isTitleTooLong && <span className='errorMessage'> Your title is too long...</span>;
	const titleIsRequiredMessage = error && <span className='errorMessage'> Title is required...</span>;
	const isDisabled = !title.length || isTitleTooLong;

	const filterAllStyles = `filterButton ${props.filter === 'all' ? 'filterAll' : ''}`;
	const filterActiveStyles = `filterButton ${props.filter === 'active' ? 'filterActive' : ''}`;
	const filterCompletedStyles = `filterButton ${props.filter === 'completed' ? 'filterCompleted' : ''}`;

	return (

		<div className='todolistBlock'>
			<h3 className='todolistTitle'>{props.title}</h3>
			<div>
				<input
					value={title}
					onChange={onChangeInputHandler}
					className={inputErrorClasses} />
				<button
					disabled={isDisabled}
					onClick={addTask}>+</button>
				{titleTooLongMessage}
				{titleIsRequiredMessage}
			</div>
			<Tasklist
				tasks={props.tasks}
				removeTask={props.removeTask}
				changeTaskStatus={props.changeTaskStatus} />
			<div>
				<button
					onClick={changeFilter('all')}
					className={filterAllStyles}>All</button>
				<button
					onClick={changeFilter('active')}
					className={filterActiveStyles}>Active</button>
				<button
					onClick={changeFilter('completed')}
					className={filterCompletedStyles}>Completed</button>
			</div>
		</div>
	);
}