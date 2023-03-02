import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterValueType = 'all' | 'active' | 'completed';

type TodolistSType = {
	id: string,
	title: string,
	filter: FilterValueType
}

type TodolistStateType = TodolistSType[];

type TasksStateType = {
	[todolistID: string]: TaskType[]
}

const App = (): JSX.Element => {

	const todolistID_1 = v1();
	const todolistID_2 = v1();

	const [todolists, setTodolists] = useState<TodolistStateType>([
		{ id: todolistID_1, title: 'Movies', filter: 'all' },
		{ id: todolistID_2, title: 'Food', filter: 'active' }
	]);

	const [tasks, setTasks] = useState<TasksStateType>({
		[todolistID_1]: [
			{ id: v1(), title: 'Interstellar', isDone: true },
			{ id: v1(), title: 'Moon 2112', isDone: true },
			{ id: v1(), title: 'Odyssey 2001', isDone: false }
		],
		[todolistID_2]: [
			{ id: v1(), title: 'Tomatoes', isDone: false },
			{ id: v1(), title: 'Chicken', isDone: false },
			{ id: v1(), title: 'Bread', isDone: false }
		],
	});

	const [filter, setFilter] = useState<FilterValueType>('all');

	const changeTodolistFilter = (todolistID: string, filter: FilterValueType) => {
		setTodolists(todolists.map(list => list.id === todolistID ? { ...list, filter: filter } : list));
		//setFilter(filter);
	}

	const removeTodolist = (todolistID: string) => {
		setTodolists(todolists.filter(list => list.id !== todolistID));
		delete tasks[todolistID];
	}

	const getFilteredTasks = (tasks: TaskType[], filter: FilterValueType) => {
		switch (filter) {
			case 'active':
				return tasks.filter(task => task.isDone === false);
			case 'completed':
				return tasks.filter(task => task.isDone === true);
			default:
				return tasks;
		}
	}

	const removeTask = (todolistID: string, taskId: string) => {
		setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskId) });
		// const tasksForUpdate = tasks[todolistID];
		// const updatedTasks = tasksForUpdate.filter(task => task.id !== taskId);
		// const copyTasks = { ...tasks };
		// copyTasks[todolistID] = updatedTasks;
		// setTasks(copyTasks);
		// // const newList = tasks.filter(task => task.id !== taskId);
		// // setTasks(newList);
	}

	const addTask = (todolistID: string, title: string) => {
		const newTask: TaskType = { id: v1(), title: title, isDone: false };
		setTasks({ ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] });
		// setTasks([newTask, ...tasks]);
	}

	const changeTaskStatus = (todolistID: string, taskId: string, newIsDone: boolean) => {
		setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskId ? { ...task, isDone: newIsDone } : task) })
		// setTasks(tasks.map(task => task.id === taskId ? { ...task, isDone: newIsDone } : task));
	}

	const todolistItems = todolists.map(list => {

		const filteredTasks = getFilteredTasks(tasks[list.id], list.filter);

		return (
			<Todolist
				key={list.id}
				todolistID={list.id}
				title={list.title}
				tasks={filteredTasks}
				filter={list.filter}
				removeTask={removeTask}
				addTask={addTask}
				changeTaskStatus={changeTaskStatus}
				changeTodolistFilter={changeTodolistFilter}
				removeTodolist={removeTodolist} />
		)
	})

	return (
		<div className="App">
			{todolistItems}
		</div>
	);
}

export default App;