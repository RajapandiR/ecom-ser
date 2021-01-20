class CategorySchema {
	static addCategory() {
		return {
			type: "object",
			properties: {
				name: { type: 'string'},
				description: { type: 'string'},
				displayed: { type: 'string' },
				// count: { type: 'string' }
			},
			required: ['name', 'description']
		};

	}
	static editCategory() {
		return {
			type: "object",
			properties: {
				_id: { type: 'string' },
				name: { type: 'string'},
				description: { type: 'string'},
				displayed: { type: 'string' }
				// count: { type: 'string' }

			},
			required: ['_id']
		};

	}
		
}

export default CategorySchema;