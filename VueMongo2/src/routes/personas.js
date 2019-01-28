const express = require('express');
const router = express.Router();

const Persona = require('../models/Persona');

router.get('/', async (req, res) => {
    const personas = await Persona.find();
    res.json(personas);
});

router.get('/:id', async (req, res) => {
    const persona = await Persona.findById(req.params.id);
    res.json(persona);
})

router.post('/', async (req, res) => {
    const persona = new Persona(req.body);
    await persona.save();
    res.json({
        status: 'Persona Saved'
    });
});

router.put('/:id', async (req, res) => {
    await Persona.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Persona Updated'
    });
});

router.delete('/:id', async (req, res) => {
    await Persona.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Persona Removed'
    });
});

module.exports = router;