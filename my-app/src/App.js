import { useState } from 'react';
import { TodoPage, Page404, MainPage } from './components';
import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';

export const App = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	return (
		<div className={styles.App}>
			<Routes>
				<Route path="/" element={<MainPage refreshTodosFlag={refreshTodosFlag} setRefreshTodosFlag={setRefreshTodosFlag} />}>
					<Route path="todo/:id" element={<TodoPage refreshTodosFlag={refreshTodosFlag} />} />
				</Route>
				<Route path="*" element={<Page404 />} />
			</Routes>
		</div>
	);
};
