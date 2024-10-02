const Problem = require('../model/Problems.js');

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

    const problem = await Plant.findOne({ _id: req.body.id }).exec();
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
    const problems = await Plant.find();
    if (!problems) return res.status(204).json({ 'message': 'No plants found.'});
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

module.exports =    {
    createProblem,
    deleteProblem,
    updateProblem,
    getAllProblems,
    getProblem
}