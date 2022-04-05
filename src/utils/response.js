
module.exports = class Response {
  constructor(code, message, data={}) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}