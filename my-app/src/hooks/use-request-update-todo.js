import { useState } from 'react';

export const useRequestUpdateTodo = (refreshProducts, setTitleData) => {
	const [isChangingTodo, setIsChangingTodo] = useState({ Status: false, id: null });

	const changingTodo = (id, title) => {
		setIsChangingTodo({ Status: true, id: id });
		setTitleData(title);
	};

	const changingTodoStatus = () => {
		setIsChangingTodo((prevState) => ({ ...prevState, Status: false }));
	};

	const requestUpdateTodoStatus = (id, completed) => {
		fetch(`http://192.168.0.133:3005/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: !completed,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				refreshProducts();
				console.log('ответ сервера:', response);
			});
	};

	const requestUpdateTodoTitle = (id, title) => {
		fetch(`http://192.168.0.133:3005/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: title,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				refreshProducts();
				changingTodoStatus();
				console.log('ответ сервера:', response);
			});
	};

	return { isChangingTodo, requestUpdateTodoStatus, requestUpdateTodoTitle, changingTodo, changingTodoStatus };
};
