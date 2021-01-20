import jwt from 'jsonwebtoken';

class Jwt {
  static issueToken(payload) {
    return jwt.sign(payload, '123456789');
  }

  static verifyToken(token) {
    return jwt.verify(token, '123456789');
  }
}

export default Jwt;
