const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
})

const handleAvatar = avatars => async (req, res, next) => {
    if (!req.file) return next()
    if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/jpg') {
        return next(new Error('File format is not supported'))
    }
    req.file.storedFilename = await avatars.store(req.file.buffer)
    return next()
}

module.exports = {
    upload,
    handleAvatar,
}
