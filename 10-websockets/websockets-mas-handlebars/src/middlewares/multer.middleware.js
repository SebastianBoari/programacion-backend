function mediaPaths (req, res, next) {
    const mediaPaths = req.files.map(file => file.path)

    req.mediaPaths = mediaPaths

    next()
}

export { mediaPaths }