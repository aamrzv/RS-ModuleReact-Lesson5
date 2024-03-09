import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdateTodo = (setTitleData) => {
	const [isChangingTodo, setIsChangingTodo] = useState({ Status: false, id: null });

	const changingTodo = (id, title) => {
		setIsChangingTodo({ Status: true, id: id });
		setTitleData(title);
	};

	const changingTodoStatus = () => {
		setIsChangingTodo((prevState) => ({ ...prevState, Status: false }));
	};

	const requestUpdateTodoStatus = (id, completed) => {
		update(ref(db, `todos/${id}`), {
			completed: !completed,
		}).then((response) => {
			console.log('ответ сервера:', response);
		});
	};

	const requestUpdateTodoTitle = (id, title) => {
		update(ref(db, `todos/${id}`), {
			title: title,
		}).then((response) => {
			changingTodoStatus();
			console.log('ответ сервера:', response);
		});
	};

	return { isChangingTodo, requestUpdateTodoStatus, requestUpdateTodoTitle, changingTodo, changingTodoStatus };
};
