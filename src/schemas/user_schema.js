class UserSchema {
	static addUser() {
		return {
			type: "object",
			properties: {
				userName: { type: 'string'},
				fullName: { type: 'string'},
				email: { type: 'string'},
				photo: { type: 'string'},
				password: { type: 'string'},
				role: { type: 'string'},
			},
			required: ['userName', 'email','role']
		};

	}
	static editUser() {
		return {
			type: "object",
			properties: {
				_id: { type: 'string'},
				userName: { type: 'string'},
				fullName: { type: 'string'},
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