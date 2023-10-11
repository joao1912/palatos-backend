export default (err, req, res, next) => {
          
    res.status(500).json({
        status: "Erro",
        message: err
    })
          
};