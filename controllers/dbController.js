const Family = require("../model/Families.js");
const Reference = require("../model/References.js");

const populateFamily = async (name) => {
    try {
        const data = await Family.findOne({name});
        if(!data) {
            const result = await Family.create({ name: name });
            console.log(result)
        }
    } catch (err) {
        console.log(err);
    }
}

const getFamilies = async (req, res) => {
    const data = await Family.find();
    if (!data) return res.status(204).json({ 'message': 'No plant botanical family names found.'});
    res.json(data);
}

const getReferences = async (req, res) => {
    const data = await Reference.find();
    if (!data) return res.status(204).json({ 'message': 'No references found.'});
    res.json(data);
}

module.exports =    {populateFamily,
                    getFamilies,
                    getReferences}