export const TrataMulter = (req, res, next) => {
    const { file} = req.body
    if (!file) {
        return res.status(400).json({ error: 'Arquivo não enviado' })
    }
    next()
}