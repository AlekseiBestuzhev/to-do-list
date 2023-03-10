import React, { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
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

	const addTaskHandler = (title: string) => {
		props.addTask(props.todolistID, title);
	}

	const changeFilter = (filter: FilterValueType) => () => props.changeTodolistFilter(props.todolistID, filter);

	const deleteList = () => props.removeTodolist(props.todolistID);

	const filterAllStyles = `filterButton ${props.filter === 'all' ? 'filterAll' : ''}`;
	const filterActiveStyles = `filterButton ${props.filter === 'active' ? 'filterActive' : ''}`;
	const filterCompletedStyles = `filterButton ${props.filter === 'completed' ? 'filterCompleted' : ''}`;

	return (

		<div className='todolistBlock'>
			<div className='todolistHeader'>
				<h3 className='todolistTitle'>{props.title}</h3>
				<button
					className='deleteTodolist'
					onClick={deleteList}></button>
			</div >
			<AddItemForm callBack={addTaskHandler} />
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