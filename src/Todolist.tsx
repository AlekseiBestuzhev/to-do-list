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
	filter: FilterValueType,
	todolistID: string
}

export const Todolist: React.FC<TodolistType> = (props): JSX.Element => {

	const [error, setError] = React.useState<boolean>(false);

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
	const inputErrorClasses = `input ${error || isTitleTooLong ? 'errorInput' : ''}`;
	const titleTooLongMessage = isTitleTooLong && <div className='errorMessage'> Your title is too long...</div>;
	const titleIsRequiredMessage = error && <div className='errorMessage'> Title is required...</div>;
	const isDisabled = !title.length || isTitleTooLong;

	const filterAllStyles = `filterButton ${props.filter === 'all' ? 'filterAll' : ''}`;
	const filterActiveStyles = `filterButton ${props.filter === 'active' ? 'filterActive' : ''}`;
	const filterCompletedStyles = `filterButton ${props.filter === 'completed' ? 'filterCompleted' : ''}`;

	return (

		<div className='todolistBlock'>
			<h3 className='todolistTitle'>{props.title}</h3>
			<div className='inputGroup'>
				<input
					value={title}
					onChange={onChangeInputHandler}
					className={inputErrorClasses}
					placeholder={'Enter task title...'} />
				<button
					onClick={addTask}
					className='addTaskButton'
					disabled={isDisabled}>+</button>
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