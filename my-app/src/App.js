import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			});
	}, []);

	return (
		<div className={styles.App}>
			<ol className={styles.dataContainer}>
				{todos.map(({ id, title, completed }) => (
					<li key={id}>{title}</li>
				))}
			</ol>
		</div>
	);
};
