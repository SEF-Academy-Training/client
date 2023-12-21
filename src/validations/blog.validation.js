import { array, string, object } from 'yup';
import { enum_BlogsCategory } from '../configs/enums';

export const newBlogValidation = object({
	title: string()
		.required('Please enter a Blog name')
		.min(3, 'Blog name must be between 3 and 100 characters')
		.max(150, 'Blog name must be between 3 and 150 characters'),

	categories:
		// array().of(
		string().required('Please provide a category for this Blog'),
	// .oneOf(
	// 	enum_BlogsCategory,
	// 	`Must be one of the following values: ${enum_BlogsCategory}`
	// )
	// )
	tags: array(string().required('Please provide a tags for this Blog')),

	content: string().required('Please provide a content for this Blog'),

	cover: string(),
});

export const updateBlogValidation = object({
	title: string()
		.min(3, 'Blog name must be between 3 and 150 characters')
		.max(150, 'Blog name must be between 3 and 150 characters'),

	categories:
		// array().of(
		string(),
	// .oneOf(
	// 	enum_BlogsCategory,
	// 	`Must be one of the following values: ${enum_BlogsCategory}`
	// )
	// )
	tags: array(string()),

	content: string(),

	cover: string(),
});
