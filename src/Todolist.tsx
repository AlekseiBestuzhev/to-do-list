import React, { ChangeEvent } from 'react';
import { FilterValueType } from './App';
import { Tasklist } from './Tasklist';

export type TaskType = {
	id: string,
	title: string,
	isDone: boolean
}

type TodolistType = {
	todolistID: string,
	title: string,
	filter: FilterValueType,
	tasks: TaskType[],

	removeTask: (todolistID: string, taskId: string) => void,
	addTask: (todolistID: string, title: string) => void,
	changeTaskStatus: (todolistID: string, taskId: string, newIsDone: boolean) => void,

	changeTodolistFilter: (todolistID: string, filter: FilterValueType) => void,
	removeTodolist: (todolistID: string) => void
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
			props.addTask(props.todolistID, trimmedTitle);
		} else {
			setError(true);
		}
		setTitle('');
	}

	const changeFilter = (filter: FilterValueType) => () => props.changeTodolistFilter(props.todolistID, filter);

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
			<div className='todolistHeader'>
				<h3 className='todolistTitle'>{props.title}</h3>
				<button className='deleteTodolist'></button>
			</div >
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
				todolistID={props.todolistID}
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