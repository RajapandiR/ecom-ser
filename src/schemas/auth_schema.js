class AuthSchema {
    static loginSchema() {
      return {
        type: 'object',
        properties: {
          username: { type: 'string' },
          password: { type: 'string' }
        },
        required: ['username', 'password']
      };
    }
  }
  
  export default AuthSchema;
  