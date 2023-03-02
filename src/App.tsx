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
	const changeFilter = (filter: FilterValueType) => setFilter(filter);
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
	const filteredTasks = getFilteredTasks(tasks, filter);

	const removeTask = (taskId: string) => {
		const newList = tasks.filter(task => task.id !== taskId);
		setTasks(newList);
	}

	const addTask = (title: string) => {
		const newTask: TaskType = { id: v1(), title: title, isDone: false };
		setTasks([newTask, ...tasks]);
	}

	const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
		setTasks(tasks.map(task => task.id === taskId ? { ...task, isDone: newIsDone } : task));
	}

	return (
		<div className="App">
			{todolists.map(list => {
				return (
					<Todolist
						key={list.id}
						todolistID={list.id}
						title={list.title}
						tasks={filteredTasks}
						changeFilter={changeFilter}
						removeTask={removeTask}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={list.filter} />
				)
			})}
		</div>
	);
}

export default App;