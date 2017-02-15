module.exports = [
	{
		name: 'user',
		columns: [
			{name: 'name', type: 'string', unique: true},
			{name: 'password', type: 'string'}
		]
	},
	{
		name: 'task',
		columns: [
			{name: 'title', type: 'string'},
			{name: 'description', type: 'string'},
			{name: 'user_id', type: 'integer', foreign: 'user.id'}
		]
	},
	{
		name: 'contact',
		columns: [
			{name: 'name', type: 'string'},
			{name: 'address', type: 'string'},
			{name: 'email', type: 'string'},
			{name: 'data', type: 'json'}
		]
	},
	{
		name: 'project',
		columns: [
			{name: 'name', type: 'string'},
			{name: 'description', type: 'string'}
		]
	},
	{
		name: 'membership',
		columns: [
			{name: 'project_id', type: 'integer', foreign: 'project.id'},
			{name: 'contact_id', type: 'integer', foreign: 'contact.id'}
		]
	}
]