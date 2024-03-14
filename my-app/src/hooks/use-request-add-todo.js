import { useState } from 'react';

export const useRequestAddTodo = (refreshTodos) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = (value) => {
		setIsCreating(true);
		fetch('http://192.168.0.133:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title: value, completed: false, date_start: '', date_end: '', description: '' }),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('ответ сервера:', response);
				refreshTodos(true);
			})
			.finally(() => setIsCreating(false));
	};
	return {
		isCreating,
		requestAddTodo,
	};
};
