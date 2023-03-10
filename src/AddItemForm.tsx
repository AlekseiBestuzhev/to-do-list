import { ChangeEvent, FC, useState } from "react";

type AddItemFormType = {
	callBack: (title: string) => void
}

export const AddItemForm: FC<AddItemFormType> = ({ callBack }) => {

	const [error, setError] = useState<boolean>(false);

	const [title, setTitle] = useState('');
	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		error && setError(false);
		setTitle(e.currentTarget.value);
	}

	const trimmedTitle = title.trim();

	const addTask = () => {
		if (trimmedTitle) {
			callBack(trimmedTitle);
		} else {
			setError(true);
		}
		setTitle('');
	}

	const maxLengthTitle: number = 15;
	const isTitleTooLong = trimmedTitle.length > maxLengthTitle;
	const inputErrorClasses = `input ${error || isTitleTooLong ? 'errorInput' : ''}`;
	const titleTooLongMessage = isTitleTooLong && <div className='errorMessage'> Your title is too long...</div>;
	const titleIsRequiredMessage = error && <div className='errorMessage'> Title is required...</div>;
	const isDisabled = !title.length || isTitleTooLong;

	return (
		<div className='inputGroup'>
			<input
				value={title}
				onChange={onChangeInputHandler}
				className={inputErrorClasses}
				placeholder={'Enter title...'} />
			<button
				onClick={addTask}
				className='addTaskButton'
				disabled={isDisabled}>+</button>
			{titleTooLongMessage}
			{titleIsRequiredMessage}
		</div>
	);
}