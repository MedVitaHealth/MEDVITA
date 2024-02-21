// HttpError class
class HttpError extends Error {
    constructor(message, errorCode) {
      super(message); // Add a "message" property
      this.code = errorCode; // Adds a "code" property
    }
  }
  
  
  // Exporting HttpError class
  module.exports = HttpError;