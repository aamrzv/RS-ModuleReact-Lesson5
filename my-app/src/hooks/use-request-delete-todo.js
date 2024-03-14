import { useState } from 'react';

export const useRequestDeleteTodo = (refreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodo = (id) => {
		setIsDeleting(true);
		fetch(`http://192.168.0.133:3005/todos/${id}`, { method: 'DELETE' })
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				refreshTodos();
				console.log('ответ сервера:', response);
				setIsDeleting(false);
			});
	};
	return {
		requestDeleteTodo,
		isDeleting,
	};
};
