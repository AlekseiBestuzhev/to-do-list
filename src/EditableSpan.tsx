import { ChangeEvent, FC, useState } from "react";

type EditableSpanType = {
	title: string,
	spanClassses?: string,
	changeTitle: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanType> = ({
	title,
	spanClassses,
	changeTitle
}) => {

	const [localTitle, setLocalTitle] = useState<string>(title);
	const [editMode, setEditMode] = useState<boolean>(false);

	const onChangeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setLocalTitle(e.currentTarget.value);
	}

	const onEditMode = () => setEditMode(true);
	const offEditMode = () => {
		setEditMode(false);
		changeTitle(localTitle);
	}
	return (
		editMode
			? <input
				autoFocus
				value={localTitle}
				onBlur={offEditMode}
				onChange={onChangeLocalTitle} />
			: <span
				onDoubleClick={onEditMode}
				className={spanClassses}>{title}</span>
	);
}