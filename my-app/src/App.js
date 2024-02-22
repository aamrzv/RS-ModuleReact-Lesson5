import { useEffect, useState } from 'react';
import { Field, SortButton, TodoList } from './components';
import styles from './App.module.css';
import { useRequestGetTodo, useRequestAddTodo, useRequestDeleteTodo, useRequestUpdateTodo } from './hooks';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [inputData, setInputData] = useState('');
	const [titleData, setTitleData] = useState('');
	const [refreshProductsFlag, setRefreshProductsFlag] = useState(false);
	const [isSearchMode, setIsSearchMode] = useState(false);
	const [isSortTodos, setIsSortTodos] = useState(false);

	const refreshProducts = () => setRefreshProductsFlag(!refreshProductsFlag);

	useEffect(() => {
		requestTodo().then((loadedTodos) => {
			isSortTodos ? sortTodosAlphabetically(loadedTodos) : setTodos(loadedTodos);
		});
	}, [refreshProductsFlag, isSortTodos]);

	const { isLoading, requestTodo } = useRequestGetTodo();
	const { isCreating, requestAddTodo } = useRequestAddTodo(refreshProducts);
	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(refreshProducts);
	const { isChangingTodo, requestUpdateTodoStatus, requestUpdateTodoTitle, changingTodo, changingTodoStatus } = useRequestUpdateTodo(
		refreshProducts,
		setTitleData,
	);

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
			const filteredResults = loadedTodos.filter((item) => item.title.toLowerCase().includes(inputData));
			isSortTodos ? sortTodosAlphabetically(filteredResults) : setTodos(filteredResults);
		});
	};
	const sortTodosAlphabetically = (arrTodos) => {
		const sortedData = [...arrTodos].sort((a, b) => a.title.localeCompare(b.title));
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
					refreshProducts={refreshProducts}
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
