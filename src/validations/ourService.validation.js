import * as Yup from 'yup';
import { enum_PaperTypes } from '../configs/enums';

export const newOurServiceValidation = Yup.object({
	title: Yup.string().required('Please enter a Service title'),

	code: Yup.string(),

	type: Yup.string()
		.oneOf(enum_PaperTypes, `Must be one of the following values: ${enum_PaperTypes}`)
		.required('Please enter a Service status'),

	description: Yup.string().required('Please enter a Service description'),
	cover: Yup.string().required('Please enter a Service image'),

	requiredPapers: Yup.array().min(1, 'Please select at least one paper'),
});

export const updateOurServiceValidation = Yup.object({
	title: Yup.string(),

	code: Yup.string(),

	type: Yup.string().oneOf(
		enum_PaperTypes,
		`Must be one of the following values: ${enum_PaperTypes}`
	),

	description: Yup.string(),
	cover: Yup.string(),

	requiredPapers: Yup.array().of(Yup.string()),
});
