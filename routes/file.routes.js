const { Router } = require('express')
const fs = require('fs')
const path = require('path')
const FileModel = require('../models/file.model')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const files = await FileModel.findAll()
    res.status(200).json(files)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', async (req, res) => {
  try {
    const file = await FileModel.create({
      title: req.files.data.name,
      type: req.files.data.mimetype,
      file: req.files.data.data
    })
    res.status(201).json(file)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const data = await FileModel.findByPk(req.params.id)
    const file = path.join(__dirname, '../public', 'tmp', data.title)
    fs.open(file, 'w', null, (err, fd) => {
      if (err) throw err
      // noinspection JSCheckFunctionSignatures
      fs.write(fd, data.file, 0, data.file.length, err => {
        if (err) throw err
        fs.close(fd, () => console.log('write file'))
      })
    })
    res.status(200).json(data.title)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const files = await FileModel.findAll({
      where: { id: +req.params.id }
    })
    const file = files[0]
    await file.destroy()
    res.status(204).json({ message: 'ok' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router
