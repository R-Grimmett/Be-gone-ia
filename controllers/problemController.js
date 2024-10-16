const Problem = require('../model/Problems.js');
const splitter = new RegExp(/%/, 'g');

const createProblem = async (req, res) => {
    if (!req?.body?.common || !req?.body?.category || !req?.body?.treatment) {
        return res.status(400).json({ 'message' : 'All problem entries require a common name, category and treatment.' });
    }

    try {
        const result = await Problem.create({
            imgSrc: req.body.imgSrc,

            common: req.body.common,
            scientific: req.body.scientific,
            category: req.body.category,

            leafTags: req.body.leafTags,
            flowerTags: req.body.flowerTags,
            stemTags: req.body.stemTags,
            rootTags: req.body.rootTags,
            wholeTags: req.body.wholeTags,
            growthTags: req.body.growthTags,

            treatment: req.body.treatment,
            information: req.body.information,
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const deleteProblem = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message' : 'Problem ID required.'});
    const problem = await Problem.findOne({ _id: req.body.id }).exec();
    if (!problem) {
        return res.status(204).json({ 'message': `Problem ${req.body.id} has no matches.` });
    }

    const result = await problem.deleteOne({ _id: req.body.id });
    res.json(result);
}

const updateProblem = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Problem ID is required.'});
    }

    const problem = await Problem.findOne({ _id: req.body.id }).exec();
    if (!problem) {
        return res.status(204).json({ 'message': `Problem ${req.body.id} has no matches.` });
    }

    if(req.body?.imgSrc) problem.imgSrc = req.body.imgSrc;

    if(req.body?.common) problem.common = req.body.common;
    if(req.body?.scientific) problem.scientific = req.body.scientific;
    if(req.body?.category) problem.category = req.body.category;

    if(req.body?.leafTags) problem.leafTags = req.body.leafTags;
    if(req.body?.flowerTags) problem.flowerTags = req.body.flowerTags;
    if(req.body?.stemTags) problem.stemTags = req.body.stemTags;
    if(req.body?.rootTags) problem.rootTags = req.body.rootTags;
    if(req.body?.wholeTags) problem.wholeTags = req.body.wholeTags;
    if(req.body?.growthTags) problem.growthTags = req.body.growthTags;

    if(req.body?.treatment) problem.treatment = req.body.treatment;
    if(req.body?.information) problem.information = req.body.information;

    const result = await problem.save();
    res.json(result);
}

const getAllProblems = async (req, res) => {
    const problems = await Problem.find().sort({common: 1});
    if (!problems) return res.status(204).json({ 'message': 'No problems found.'});
    res.json(problems);
}

const getAllCategory = async (req, res) => {
    const problems = await Problem.find().where({ category: req.params.category }).sort({common: 1}).exec();
    if(!problems) { return res.status(204).json({ 'message': 'No problems found in the specified category.'}); }
    res.json(problems);
}

const getProblem = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Problem ID is required.'});

    const problem = await Problem.findOne({ _id: req.params.id }).exec();
    if (!problem) {
        return res.status(204).json({ 'message': `Problem ${req.params.id} has no matches.` });
    }

    res.json(problem);
}

const searchProblem = async (req, res) => {
    if(!req.params?.searchTerm) return res.status(400).json({ 'message' : 'A query is required.'});
    const terms = req.params.searchTerm.split(splitter);
    let problems;
    const category = terms[0] !== undefined ? terms[0].match(/(?<==).+$/) : null;
    const name = terms[1] !== undefined ? terms[1].match(/(?<==)[^_]+/) : null;

    if(category.toString() === 'all') {
        problems = await Problem.find()
            .or([{common: new RegExp(name, 'i')}, {scientific: new RegExp(name, 'i')}]);
    } else {
        problems = await Problem.find().where({ category: category })
            .or([{common: new RegExp(name, 'i')}, {scientific: new RegExp(name, 'i')}]);
    }

    if(!problems) return res.status(204).json({ 'message': 'No problems found matching search'});
    console.log(problems);
    res.json(problems);
}

module.exports =    {
    createProblem,
    deleteProblem,
    updateProblem,
    getAllProblems,
    getAllCategory,
    getProblem,
    searchProblem
}