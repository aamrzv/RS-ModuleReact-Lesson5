import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTodo = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodo = (id) => {
		setIsDeleting(true);
		remove(ref(db, `todos/${id}`)).then((response) => {
			console.log('ответ сервера:', response);
			setIsDeleting(false);
		});
	};
	return {
		requestDeleteTodo,
		isDeleting,
	};
};
