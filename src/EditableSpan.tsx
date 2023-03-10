import { ChangeEvent, FC, useState } from "react";

type EditableSpanType = {
	title: string,
	spanClassses?: string
}

export const EditableSpan: FC<EditableSpanType> = ({
	title,
	spanClassses
}) => {

	const [localTitle, setLocalTitle] = useState<string>(title);
	const [editMode, setEditMode] = useState<boolean>(true);

	const onChangeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setLocalTitle(e.currentTarget.value);
	}

	return (
		editMode
			? <input
				value={localTitle}
				onChange={onChangeLocalTitle} />
			: <span className={spanClassses}>{title}</span>
	);
}