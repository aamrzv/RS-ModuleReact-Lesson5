import { useEffect, useState } from 'react';
import { Field, SortButton, TodoList } from './components';
import styles from './App.module.css';
import { useRequestGetTodo, useRequestAddTodo, useRequestDeleteTodo, useRequestUpdateTodo } from './hooks';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [inputData, setInputData] = useState('');
	const [titleData, setTitleData] = useState('');
	const [isSearchMode, setIsSearchMode] = useState(false);
	const [isSortTodos, setIsSortTodos] = useState(false);

	const todosDbRef = ref(db, 'todos');

	useEffect(() => {
		return onValue(todosDbRef, (snapshot) => {
			requestTodo().then((loadedTodos) => {
				isSortTodos ? sortTodosAlphabetically(loadedTodos) : setTodos(loadedTodos);
			});
		});
	}, [isSortTodos]);

	const { isLoading, requestTodo } = useRequestGetTodo();
	const { isCreating, requestAddTodo } = useRequestAddTodo();
	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo();
	const { isChangingTodo, requestUpdateTodoStatus, requestUpdateTodoTitle, changingTodo, changingTodoStatus } = useRequestUpdateTodo(setTitleData);

	const handleSubmit = (event) => {
		event.preventDefault();
		requestAddTodo(inputData);
		setInputData('');
	};

	const handleChangeInput = ({ target }) => {
		setInputData(target.value);
	};

	const handleChangeTitle = ({ target }) => {
		setTitleData(target.value);
	};

	const hendleSearchTodo = (event) => {
		const input = event.target.value.toLowerCase();
		setInputData(input);
		requestTodo().then((loadedTodos) => {
			const filteredResults = loadedTodos.filter(([id, item]) => item.title.toLowerCase().includes(input));
			isSortTodos ? sortTodosAlphabetically(filteredResults) : setTodos(filteredResults);
		});
	};
	const sortTodosAlphabetically = (arrTodos) => {
		const sortedData = [...arrTodos].sort(([idA, a], [idB, b]) => a.title.localeCompare(b.title));
		setTodos(sortedData);
	};
	return (
		<div className={styles.App}>
			<div>
				<Field
					handleSubmit={handleSubmit}
					inputData={inputData}
					isSearchMode={isSearchMode}
					isCreating={isCreating}
					isDeleting={isDeleting}
					setIsSearchMode={setIsSearchMode}
					hendleSearchTodo={hendleSearchTodo}
					handleChangeInput={handleChangeInput}
				/>
				<SortButton
					isSortTodos={isSortTodos}
					sortTodosAlphabetically={sortTodosAlphabetically}
					setIsSortTodos={setIsSortTodos}
					todos={todos}
				/>
			</div>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<TodoList
					todos={todos}
					isChangingTodo={isChangingTodo}
					titleData={titleData}
					handleChangeTitle={handleChangeTitle}
					changingTodo={changingTodo}
					changingTodoStatus={changingTodoStatus}
					requestUpdateTodoTitle={requestUpdateTodoTitle}
					requestUpdateTodoStatus={requestUpdateTodoStatus}
					requestDeleteTodo={requestDeleteTodo}
				/>
			)}
		</div>
	);
};
