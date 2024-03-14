import styles from './field.module.css';

export const Field = ({
	handleSubmit,
	inputData,
	setInputData,
	isSearchMode,
	isCreating,
	isDeleting,
	setIsSearchMode,
	refreshTodos,
	hendleSearchTodo,
	handleChangeInput,
}) => {
	return (
		<div>
			<h1>Задачи</h1>
			<form className={styles.conteiner} onSubmit={handleSubmit}>
				<input
					className={styles.input}
					placeholder={isSearchMode ? 'Поиск' : 'Введите название'}
					type="text"
					value={inputData}
					onChange={isSearchMode ? hendleSearchTodo : handleChangeInput}
				/>
				<button
					className={isSearchMode ? `${styles.btnScr} ${styles.btnScrActive}` : styles.btnScr}
					type="button"
					onClick={() => {
						setIsSearchMode(!isSearchMode);
						refreshTodos();
						setInputData('');
					}}
				>
					<SearchIcon />
				</button>
				<button className={styles.btn} type="submit" disabled={isCreating || isDeleting}>
					Добавить
				</button>
			</form>
		</div>
	);
};

function SearchIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}
