import { useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTodo = () => {
	const [isLoading, setIsLoading] = useState(false);

	const todosDbRef = ref(db, 'todos');

	const requestTodo = async () => {
		setIsLoading(true);
		const snapshot = await get(todosDbRef);
		setIsLoading(false);
		const data = snapshot.val();
		return data ? Object.entries(data) : [];
	};

	return { isLoading, requestTodo };
};

/*
export const useRequestGetTodo = () => {
	const [isLoading, setIsLoading] = useState(false);
	const requestTodo = () => {
		setIsLoading(true);
		return fetch('http://192.168.0.133:3005/todos')
			.then((loadedTodos) => loadedTodos.json())
			.finally(() => {
				setIsLoading(false);
			});
	};
	return { isLoading, requestTodo };
};
*/
