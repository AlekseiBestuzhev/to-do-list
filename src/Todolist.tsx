import React, { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterValueType } from './App';
import { EditableSpan } from './EditableSpan';
import { Tasklist } from './Tasklist';

export type TaskType = {
	id: string,
	title: string,
	isDone: boolean
}

type TodolistType = {
	title: string,
	tasks: TaskType[],
	todolistID: string,
	filter: FilterValueType,

	addTask: (todolistID: string, title: string) => void,
	removeTask: (todolistID: string, taskId: string) => void,
	changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void,
	changeTaskStatus: (todolistID: string, taskId: string, newIsDone: boolean) => void,

	removeTodolist: (todolistID: string) => void,
	changeTodolistTitle: (todolistID: string, newTitle: string) => void,
	changeTodolistFilter: (todolistID: string, filter: FilterValueType) => void
}

export const Todolist: React.FC<TodolistType> = (props): JSX.Element => {

	const addTaskHandler = (title: string) => {
		props.addTask(props.todolistID, title);
	}

	const changeFilter = (filter: FilterValueType) => () => props.changeTodolistFilter(props.todolistID, filter);

	const deleteList = () => props.removeTodolist(props.todolistID);

	const changeTodolistTitleHandler = (newTitle: string) => {
		props.changeTodolistTitle(props.todolistID, newTitle)
	}

	const filterAllStyles = `filterButton ${props.filter === 'all' ? 'filterAll' : ''}`;
	const filterActiveStyles = `filterButton ${props.filter === 'active' ? 'filterActive' : ''}`;
	const filterCompletedStyles = `filterButton ${props.filter === 'completed' ? 'filterCompleted' : ''}`;

	return (

		<div className='todolistBlock'>
			<div className='todolistHeader'>
				<EditableSpan
					title={props.title}
					spanClassses={'todolistTitle'}
					changeTitle={changeTodolistTitleHandler} />
				<button
					className='deleteTodolist'
					onClick={deleteList}></button>
			</div >
			<AddItemForm addItem={addTaskHandler} />
			<Tasklist
				tasks={props.tasks}
				todolistID={props.todolistID}
				removeTask={props.removeTask}
				changeTaskTitle={props.changeTaskTitle}
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