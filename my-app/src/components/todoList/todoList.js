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
	return (
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
							onClick={() => (isChangingTodo.Status ? requestUpdateTodoTitle(id, titleData) : requestUpdateTodoStatus(id, completed))}
						>
							✔
						</span>
						<span
							className={`${styles.btn} ${styles.btnDel}`}
							onClick={() => (isChangingTodo.Status ? changingTodoStatus() : requestDeleteTodo(id))}
						>
							✖
						</span>
					</span>
				</li>
			))}
		</ol>
	);
};
