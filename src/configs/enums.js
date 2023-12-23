export const enum_BlogsCategory = [
	'tech',
	'business',
	'security',
	'sports',
	'medical',
	'startups',
	'about',
];
export const enum_ServiceCategory = [
	'tax services & consultations',
	'auditing & assurance',
	'bookkeeping',
	'social insurance',
	'training workshops',
	'investment & incorporation',
];
export const enum_ServiceStatus = ['pending', 'ongoing',  'completed'];

export const enum_paperStatus = ['valid', 'not valid'];
export const enum_PaperTypes = ['personal', 'company'];
export const enum_PaperDocs = [
	//personal papers
	'personal ID',
	'commercial register',
	'tax card',
	'establishment contract',
	// company papers
	'VAT',
	'withhold tax',
	'payroll tax',
	'annual income',
	'annual balance',
];

export const PaperDocs = [
	//personal papers
	{ hash: 1110, type: 'personal', title: 'personal ID' },
	{ hash: 1112, type: 'personal', title: 'commercial register' },
	{ hash: 1113, type: 'personal', title: 'tax card' },
	{ hash: 1114, type: 'personal', title: 'establishment contract' },
	// company papers
	{ hash: 1115, type: 'company', title: 'VAT' },
	{ hash: 1116, type: 'company', title: 'withhold tax' },
	{ hash: 1117, type: 'company', title: 'payroll tax' },
	{ hash: 1118, type: 'company', title: 'annual income' },
	{ hash: 1119, type: 'company', title: 'annual balance' },
];

export const ourServices = [
	{
		_id: '510srv',
		title: 'tax services & consultations',
		titleAr: 'تقديم الخدمات الضريبية والاستشارات',
		type: 'personal',
		requiredPapers: ['1110', '1112', '1113'],
		description: '',
	},
	{
		_id: '511srv',
		title: 'social insurance',
		titleAr: 'التأمين الاجتماعي',
		type: 'personal',
		requiredPapers: ['1110', '1112', '1113'],
		description: '',
	},
	{
		_id: '512srv',
		title: 'training workshops',
		titleAr: 'التدريب وورش العمل',
		type: 'personal',
		requiredPapers: ['1110', '1113'],
		description: '',
	},
	{
		_id: '513srv',
		title: 'auditing & assurance',
		titleAr: 'التدقيق والضمان',
		type: 'company',
		requiredPapers: ['1115', '1117', '1118'],
		description: '',
	},
	{
		_id: '514srv',
		title: 'bookkeeping',
		titleAr: 'إعداد السجلات المحاسبية',
		type: 'company',
		requiredPapers: ['1115', '1117', '1118'],
		description: '',
	},

	{
		_id: '515srv',
		title: 'investment & incorporation',
		titleAr: 'الاستثمار والتأسيس',
		type: 'company',
		requiredPapers: ['1115', '1116', '1117', '1118', '1119'],
		description: '',
	},
];
