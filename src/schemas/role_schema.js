class RoleSchema {
	static addRole() {
		return {
			type: "object",
			properties: {
				role: { type: 'string'},
				satus: { type: 'string'}
			},
			required: ['role']
		};

	}
	static editRole() {
		return {
			type: "object",
			properties: {
				_id: { type: 'string'},
				role: { type: 'string'},
				satus: { type: 'string'}
			},
			required: ['_id']
		};

	}

}
export default RoleSchema;