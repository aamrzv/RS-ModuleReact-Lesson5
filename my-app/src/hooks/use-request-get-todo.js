import { useState } from 'react';
export const useRequestGetTodos = () => {
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

export const useRequestGetTodo = (id) => {
	const [isLoading, setIsLoading] = useState(false);
	const requestTodo = () => {
		setIsLoading(true);
		return fetch(`http://192.168.0.133:3005/todos/${id}`)
			.then((loadedTodos) => loadedTodos.json())
			.then((loadedTodos) => console.log(loadedTodos))
			.finally(() => {
				setIsLoading(false);
			});
	};
	return { isLoading, requestTodo };
};
