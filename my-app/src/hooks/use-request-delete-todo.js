import { useState } from 'react';
export const useRequestDeleteTodo = (refreshProducts) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodo = (id) => {
		setIsDeleting(true);
		fetch(`http://192.168.0.133:3005/todos/${id}`, { method: 'DELETE' })
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				refreshProducts();
				console.log('ответ сервера:', response);
				setIsDeleting(false);
			});
	};
	return {
		requestDeleteTodo,
		isDeleting,
	};
};
