import { ChangeEvent, FC, useState } from "react";

type AddItemFormType = {
	addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormType> = ({ addItem }) => {

	const [error, setError] = useState<boolean>(false);

	const [title, setTitle] = useState('');
	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		error && setError(false);
		setTitle(e.currentTarget.value);
	}

	const trimmedTitle = title.trim();

	const addNewItem = () => {
		if (trimmedTitle) {
			addItem(trimmedTitle);
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
				onClick={addNewItem}
				className='addTaskButton'
				disabled={isDisabled}>+</button>
			{titleTooLongMessage}
			{titleIsRequiredMessage}
		</div>
	);
}