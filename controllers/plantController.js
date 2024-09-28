const Plant = require('../model/Plants');

const createPlant = async (req, res) => {
    if (!req?.body?.genus || !req?.body?.species) {
        return res.status(400).json({ 'message' : 'Plant Genus and Species are required.'});
    }

    try {
        const result = await Plant.create({
            family: req.body.family,
            genus: req.body.genus,
            species: req.body.species,
            common: req.body.common
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const deletePlant = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message' : 'Plant ID required.'});
    const plant = await Plant.findOne({ _id: req.body.id }).exec();
    if (!plant) {
        return res.status(204).json({ 'message': `Plant ${req.body.id} has no matches.` });
    }

    const result = await plant.deleteOne({ _id: req.body.id });
    res.json(result);
}

const updatePlant = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Plant ID is required.'});
    }

    const plant = await Plant.findOne({ _id: req.body.id }).exec();
    if (!plant) {
        return res.status(204).json({ 'message': `Plant ${req.body.id} has no matches.` });
    }

    if(req.body?.family) plant.family = req.body.family;
    if(req.body?.genus) plant.genus = req.body.genus;
    if(req.body?.species) plant.species = req.body.species;
    if(req.body?.common) plant.common = req.body.common;

    const result = await plant.save();
    res.json(result);
}

const getAllPlants = async (req, res) => {
    const plants = await Plant.find();
    if (!plants) return res.status(204).json({ 'message': 'No plants found.'});
    res.json(plants);
}

const getPlant = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Plant ID is required.'});

    const plant = await Plant.findOne({ _id: req.params.id }).exec();
    if (!plant) {
        return res.status(204).json({ 'message': `Plant ${req.params.id} has no matches.` });
    }

    res.json(plant);
}

module.exports =    {createPlant,
                    deletePlant,
                    updatePlant,
                    getAllPlants,
                    getPlant}