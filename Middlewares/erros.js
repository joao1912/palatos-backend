export default (err, req, res, next) => {
          
    res.status(500).json({
        status: err.statusCode || 500,
        message: err.message
    })
          
};