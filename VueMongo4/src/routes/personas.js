const express = require('express');
const router = express.Router();

const Persona = require('../models/Persona');

router.get('/', async (req, res) => {
    const personas = await Persona.find();
    res.json(personas);
});

router.get('/:dni', async (req, res) => {
    const persona = await Persona.findById(req.params.dni);
    res.json(persona);
})

router.post('/', async (req, res) => {
    const persona = new Persona(req.body);
    await persona.save();
    res.json({
        status: 'Persona Saved'
    });
});

router.put('/:dni', async (req, res) => {
    await Persona.findByIdAndUpdate(req.params.dni, req.body);
    res.json({
        status: 'Persona Updated'
    });
});

router.delete('/:dni', async (req, res) => {
    await Persona.findByIdAndRemove(req.params.dni);
    res.json({
        status: 'Persona Removed'
    });
});

module.exports = router;