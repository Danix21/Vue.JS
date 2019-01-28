const express = require('express');
const router = express.Router();

const Palabra = require('../models/Palabras');

router.get('/', async (req, res) => {
    const diccionarios = await Palabra.find();
    res.json(diccionarios);
});

router.get('/:id', async (req, res) => {
    const palabra = await Palabra.findById(req.params.id);
    res.json(palabra);
})

router.post('/', async (req, res) => {
    const palabra = new Palabra(req.body);
    await palabra.save();
    res.json({
        status: 'Palabra Saved'
    });
});

router.put('/:id', async (req, res) => {
    await Palabra.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Palabra Updated'
    });
});

router.delete('/:id', async (req, res) => {
    await Palabra.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Palabra Removed'
    });
});

module.exports = router;