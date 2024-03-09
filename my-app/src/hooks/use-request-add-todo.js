import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddTodo = () => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = (value) => {
		setIsCreating(true);

		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, { title: value, completed: false })
			.then((response) => {
				console.log('ответ сервера:', response);
			})
			.finally(() => setIsCreating(false));
	};
	return {
		isCreating,
		requestAddTodo,
	};
};
