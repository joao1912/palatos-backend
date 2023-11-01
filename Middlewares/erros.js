
export class CustomError extends Error {
    constructor(message, statusCode) {
      super(message)
      this.statusCode = statusCode
  
      Error.captureStackTrace(this, this.constructor)
    }
  }

export const errorHandler = (err, req, res, next) => {
          
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        status: "failed",
        message: err.message
    })
          
};