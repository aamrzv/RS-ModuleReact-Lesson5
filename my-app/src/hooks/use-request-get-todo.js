import { useState } from 'react';
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
