import React from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';

const App = () => {

	const todolistTitle = 'Movies';

	const [tasks, setTasks] = React.useState<TaskType[]>([
		{ id: v1(), title: 'Interstellar', isDone: true },
		{ id: v1(), title: 'Moon 2112', isDone: true },
		{ id: v1(), title: 'Odyssey 2001', isDone: false },
	]);

	return (
		<div className="App">
			<Todolist
				title={todolistTitle}
				tasks={tasks} />
		</div>
	);
}

export default App;