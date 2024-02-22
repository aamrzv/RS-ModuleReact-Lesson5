import { useState } from 'react';

export const useRequestAddTodo = (refreshProducts) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = (value) => {
		setIsCreating(true);
		fetch('http://192.168.0.133:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title: value, completed: false }),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('ответ сервера:', response);
				refreshProducts();
			})
			.finally(() => setIsCreating(false));
	};
	return {
		isCreating,
		requestAddTodo,
	};
};
