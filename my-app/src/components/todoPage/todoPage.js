import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './todoPage.module.css';

const updateTodo = (curTodo, newTodoData) => {
	const newTodo = { ...curTodo, ...newTodoData };
	return newTodo;
};
const requestPutTodo = (todo) => {
	fetch(`http://192.168.0.133:3005/todos/${todo.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			id: todo.id,
			title: todo.title,
			completed: todo.completed,
			date_start: todo.date_start,
			date_end: todo.date_end,
			description: todo.description,
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then((response) => {
			console.log('ответ сервера PutTodo:', response);
		});
};

export const TodoPage = ({ refreshTodosFlag }) => {
	const [todo, setTodo] = useState({ date_start: '', date_end: '', description: '' });
	const params = useParams();
	const navigate = useNavigate();

	const fetchTodo = async () => {
		try {
			const response = await fetch(`http://192.168.0.133:3005/todos/${params.id}`);
			const data = await response.json();
			setTodo(data);
		} catch (error) {
			navigate('*');
		}
	};

	useEffect(() => {
		fetchTodo();
	}, [params.id, refreshTodosFlag]);

	if (!todo) {
		return <div>Loading...</div>; // чтобы показать пользователю, что загрузка идет
	}

	return (
		<div className={styles.conteiner}>
			<div className={styles.header}>
				<h1>Задача {todo.title}</h1>
				<Link to="/" className={styles.btnBackSpace}>
					←
				</Link>
			</div>
			<form>
				<div className={styles.pickDate}>
					<label htmlFor="dateStart">Дата начала:</label>
					<input
						type="date"
						id="dateStart"
						value={todo.date_start}
						onChange={({ target }) => {
							setTodo(updateTodo(todo, { date_start: target.value }));
						}}
					/>
					<label htmlFor="dateEnd">Дата окончания:</label>
					<input
						type="date"
						id="dateEnd"
						value={todo.date_end}
						onChange={({ target }) => {
							setTodo(updateTodo(todo, { date_end: target.value }));
						}}
					/>
				</div>
				<div className={styles.textBlock}>
					<label htmlFor="description">Описание задачи:</label>
					<textarea
						type="text"
						id="description"
						cols={20}
						rows={5}
						value={todo.description}
						onChange={({ target }) => {
							setTodo(updateTodo(todo, { description: target.value }));
						}}
					/>
					<button
						className={styles.btnSubmit}
						type="button"
						onClick={() => {
							requestPutTodo(todo);
						}}
					>
						подтвердить
					</button>
				</div>
			</form>
		</div>
	);
};
