class UserSchema {
	static addUser() {
		return {
			type: "object",
			properties: {
				username: { type: 'string'},
				fullname: { type: 'string'},
				email: { type: 'string'},
				photo: { type: 'string'},
				password: { type: 'string'},
				role: { type: 'string'},
			},
			required: ['username', 'email','role']
		};

	}
	static editUser() {
		return {
			type: "object",
			properties: {
				_id: { type: 'string'},
				username: { type: 'string'},
				fullname: { type: 'string'},
				email: { type: 'string'},
				photo: { type: 'string'},
				password: { type: 'string'},
				role: { type: 'string'},

			},
			required: ['_id']
		};

	}

}
export default UserSchema;