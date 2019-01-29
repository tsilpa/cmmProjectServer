const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const projectSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
}, { collection : 'project' });

const Project = mongoose.model('Project', projectSchema);

const domainSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
}, { collection : 'domain' });

const Domain = mongoose.model('Domain', domainSchema);

const maturityCriteriaSchema = new Schema({
    question: { type: String, required: true, unique: true },
    description: { type: String }
}, { collection : 'maturityCriteria' });

const MaturityCriteria = mongoose.model('MaturityCriteria', maturityCriteriaSchema);

module.exports = {
    Project : Project,
    Domain : Domain,
    MaturityCriteria: MaturityCriteria
};