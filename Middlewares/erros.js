export default (err, req, res, next) => {
          
    res.json({
        status: "Erro",
        message: err
    })
          
};