import { useEffect, useState } from 'react';
import { Field, SortButton, TodoList, TodoPage, Page404 } from './components';
import styles from './App.module.css';
import { useRequestGetTodos, useRequestAddTodo, useRequestDeleteTodo, useRequestUpdateTodo } from './hooks';
import { Routes, Route, useNavigate } from 'react-router-dom';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [inputData, setInputData] = useState('');
	const [titleData, setTitleData] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [isSearchMode, setIsSearchMode] = useState(false);
	const [isSortTodos, setIsSortTodos] = useState(false);
	const [isCreate, setIsCreate] = useState(false);
	const navigate = useNavigate();
	const refreshTodos = (create = false) => {
		setRefreshTodosFlag(!refreshTodosFlag);
		setIsCreate(create);
	};

	const setLoadedTodos = (loadedTodos) => {
		setTodos(loadedTodos);
		const newTodo = loadedTodos[loadedTodos.length - 1];
		if (isCreate) {
			navigate(`/${newTodo.id}`);
			setIsCreate(false);
		}
	};

	useEffect(() => {
		requestTodo().then((loadedTodos) => {
			isSortTodos ? sortTodosAlphabetically(loadedTodos) : setLoadedTodos(loadedTodos);
		});
	}, [refreshTodosFlag, isSortTodos]);

	const { isLoading, requestTodo } = useRequestGetTodos();
	const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos);
	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(refreshTodos);
	const { isChangingTodo, requestUpdateTodoStatus, requestUpdateTodoTitle, changingTodo, changingTodoStatus } = useRequestUpdateTodo(
		refreshTodos,
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
				<div>
					<Field
						handleSubmit={handleSubmit}
						inputData={inputData}
						setInputData={setInputData}
						isSearchMode={isSearchMode}
						isCreating={isCreating}
						isDeleting={isDeleting}
						setIsSearchMode={setIsSearchMode}
						refreshTodos={refreshTodos}
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
			<Routes>
				<Route path="/" element={<div></div>} />
				<Route path="/:id" element={<TodoPage refreshTodosFlag={refreshTodosFlag} />} />
				<Route path="*" element={<Page404 />} />
			</Routes>
		</div>
	);
};
