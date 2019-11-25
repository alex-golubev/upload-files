const { Router } = require('express')
const fs = require('fs')
const path = require('path')
const FileModel = require('../models/file.model')
const router = Router()

router.get('/:id', async (req, res) => {
  try {
    const data = await FileModel.findByPk(req.params.id)
    const file = path.join(__dirname, '../public', 'tmp', data.title)
    await fs.open(file, 'w', null, (err, fd) => {
      if (err) throw err
      // noinspection JSCheckFunctionSignatures
      fs.write(fd, data.file, 0, data.file.length, err => {
        if (err) throw err
        fs.close(fd, () => console.log('write file'))
      })
      const stream = fs.createReadStream(file)
      stream.on('end', function() {
        fs.unlink(file, function(err) {
          if (err) {
            console.error(err.toString())
          } else {
            console.warn(file + ' deleted')
          }
        })
      })
      stream.pipe(res)
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
