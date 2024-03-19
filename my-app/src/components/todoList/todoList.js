import { Link, useNavigate } from 'react-router-dom';
import styles from './todoList.module.css';

export const TodoList = ({
	todos,
	isChangingTodo,
	titleData,
	handleChangeTitle,
	changingTodo,
	requestUpdateTodoTitle,
	requestUpdateTodoStatus,
	changingTodoStatus,
	requestDeleteTodo,
}) => {
	const navigate = useNavigate();
	const deleteTodo = (id) => {
		navigate('/');
		requestDeleteTodo(id);
	};
	return (
		<div>
			<ol className={styles.dataContainer}>
				{todos.map(({ id, title, completed }) => (
					<li key={id}>
						{isChangingTodo.Status && id === isChangingTodo.id ? (
							<input className={styles.inputTodoChange} type="text" value={titleData} onChange={handleChangeTitle} />
						) : (
							<span className={completed ? styles.textDecoration : null} onClick={() => changingTodo(id, title)}>
								{title}
							</span>
						)}
						<span>
							<span
								className={styles.btn}
								onClick={() =>
									isChangingTodo.Status ? requestUpdateTodoTitle(id, titleData) : requestUpdateTodoStatus(id, completed)
								}
							>
								✔
							</span>
							<span
								className={`${styles.btn} ${styles.btnDel}`}
								onClick={() => (isChangingTodo.Status ? changingTodoStatus() : deleteTodo(id))}
							>
								✖
							</span>
						</span>
						<Link to={`todo/${id}`} className={`${styles.btn} ${styles.btnEdit}`}>
							✎
						</Link>
					</li>
				))}
			</ol>
		</div>
	);
};
