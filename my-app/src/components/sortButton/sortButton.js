import styles from './sortButton.module.css';
export const SortButton = ({ sortTodosAlphabetically, setIsSortTodos, ...props }) => {
	return (
		<span
			className={props.isSortTodos ? `${styles.sort} ${styles.sortActive}` : styles.sort}
			onClick={() => {
				sortTodosAlphabetically(props.todos);
				setIsSortTodos(!props.isSortTodos);
			}}
		>
			Сортировка ⇅
		</span>
	);
};
