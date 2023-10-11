export default (err, req, res, next) => {
          
    res.status(500).json({
        status: err.statusCode,
        message: err.message
    })
          
};