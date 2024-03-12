const router = require('express').Router(),
Upload = require('../Middleware/Upload'),
Image = require('../Model/Image')

router.post('/upload', Upload.single('image'), async (req, res) => {
    const UploadImg = await Image.create({ image: { data: req.file.buffer, contentType: req.file.mimetype } })
    return res.status(200).json({ success: 'Successfully uploaded image.', image_id: UploadImg._id })
})  

router.get('/image', async (req, res) => {
    const ImageData = await Image.find()
    if (ImageData.length === 0) return res.status(200).json({ all_image: 'none' })
    return res.status(200).json({ all_image: ImageData })
})

module.exports = router