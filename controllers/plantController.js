const Plant = require('../model/Plants');
const dbController = require('./dbController');
const splitter = new RegExp(/%/, 'g');

const createPlant = async (req, res) => {
    if (!req?.body?.genus || !req?.body?.species) {
        return res.status(400).json({ 'message' : 'Plant Genus and Species are required.'});
    }

    try {
        const result = await Plant.create({
            imgSrc: req.body.imgSrc,

            family: req.body.family,
            genus: req.body.genus,
            species: req.body.species,
            common: req.body.common,

            water: req.body.water,
            light: req.body.light,
            humidity: req.body.humidity,
            tempLow: req.body.tempLow,
            tempHigh: req.body.tempHigh,

            tags: req.body.tags,
            text: req.body.text
        });
        if(req.body.family !== undefined && req.body.family !== "") await dbController.populateFamily(req.body.family);
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

    if(req.body?.imgSrc) plant.imgSrc = req.body.imgSrc;

    if(req.body?.family) plant.family = req.body.family;
    if(req.body?.genus) plant.genus = req.body.genus;
    if(req.body?.species) plant.species = req.body.species;
    if(req.body?.common) plant.common = req.body.common;

    if(req.body?.water) plant.water = req.body.water;
    if(req.body?.light) plant.light = req.body.light;
    if(req.body?.humidity) plant.humidity = req.body.humidity;
    if(req.body?.tempLow) plant.tempLow = req.body.tempLow;
    if(req.body?.tempHigh) plant.tempHigh = req.body.tempHigh;

    if(req.body?.tags) plant.tags = req.body.tags;
    if(req.body?.text) plant.text = req.body.text;

    const result = await plant.save();
    console.log(req.body.family);
    if(req.body.family !== undefined && req.body.family !== "") await dbController.populateFamily(req.body.family);
    res.json(result);
}

const getAllPlants = async (req, res) => {
    const plants = await Plant.find().sort({genus: 1, species: 1});
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

const searchPlant = async (req, res) => {
    if (!req?.params?.searchTerm) return res.status(400).json({ 'message': 'A query is required.'});
    let terms = req.params.searchTerm.split(splitter);
    let orArray = [];
    let whereArray = [];
    let plants;

    const common = terms[0] !== undefined ? terms[0].match(/(?<==).+$/) : null;
    if(common !== null) orArray.push({common: new RegExp(common, 'i')});

    let genus = terms[1] !== undefined ? terms[1].match(/(?<==)\S+/) : null;
    let species = terms[1] !== undefined ? terms[1].match(/(?<=\s)[^_]+/) : null;
    if( species === null && genus !== null) { species = genus; }
    if( genus === null && species !== null) { genus = species;}
    if( genus !== null) orArray.push({genus: new RegExp(genus, 'i')});
    if( species !== null) orArray.push({species: new RegExp(species, 'i')});

    if(terms.length > 2) {
        let family = terms[2] !== undefined ? terms[2].match(/(?<==).+$/) : null;
        if(family !== null) whereArray.push(`"family": "${family}"`);

        let water = terms[3] !== undefined ? terms[3].match(/(?<==).+$/) : null;
        if(water !== null) whereArray.push(`"water": "${water}"`);

        let light = terms[4] !== undefined ? terms[4].match(/(?<==).+$/) : null;
        if(light !== null) whereArray.push(`"light": "${light}"`);

        let humidity = terms[5] !== undefined ? terms[5].match(/(?<==).+$/) : null;
        if(humidity !== null) whereArray.push(`"humidity": "${humidity}"`);

        let tempLow = terms[6] !== undefined ? terms[6].match(/(?<==).+$/) : null;
        if(tempLow !== null && !isNaN(parseInt(tempLow))) whereArray.push(`"tempLow": ${tempLow}`);

        let tempHigh = terms[7] !== undefined ? terms[7].match(/(?<==).+$/) : null;
        if(tempHigh !== null && !isNaN(parseInt(tempHigh))) whereArray.push(`"tempHigh": ${tempHigh}`);

        let tags = terms[8] !== undefined ? terms[8].match(/(?<==).+$/) : null;
        if(tags !== null) whereArray.push(`"tags": "${tags.toString().toLowerCase()}"`);
    }

    let whereString = "{";
    for(let i = 0; i < whereArray.length; i++) {
        if(i !== 0) { whereString += ','}
        whereString += whereArray[i];
    }
    whereString += `}`;

    if(whereString !== '{}') {
        if(orArray.length > 0) { plants = await Plant.find().where(JSON.parse(whereString)).or(orArray).sort({genus: 1, species: 1}); }
        else { plants = await Plant.find().where(JSON.parse(whereString)).sort({genus: 1, species: 1}); }
    } else if ( orArray.length > 0) { plants = await Plant.find().or(orArray).sort({genus: 1, species: 1}); }
    else { plants = await Plant.find().sort({genus: 1, species: 1}); }
    if (!plants) return res.status(204).json({ 'message': 'No plants found.'});
    res.json(plants);
}



module.exports =    {createPlant,
                    deletePlant,
                    updatePlant,
                    getAllPlants,
                    getPlant,
                    searchPlantName: searchPlant}