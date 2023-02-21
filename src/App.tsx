import React from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterValueType = 'all' | 'active' | 'completed';

const App = () => {

	const todolistTitle = 'Movies';

	const [tasks, setTasks] = React.useState<TaskType[]>([
		{ id: v1(), title: 'Interstellar', isDone: true },
		{ id: v1(), title: 'Moon 2112', isDone: true },
		{ id: v1(), title: 'Odyssey 2001', isDone: false }
	]);

	const [filter, setFilter] = React.useState<FilterValueType>('all');
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

	return (
		<div className="App">
			<Todolist
				title={todolistTitle}
				tasks={filteredTasks}
				changeFilter={changeFilter} />
		</div>
	);
}

export default App;