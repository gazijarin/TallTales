const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promptSchema = new Schema({
    backstory: {type: Array, required: true},
    conflict: {type: Array, required: true},
    resolution: {type: Array, required: true}
})

const startSchema = new Schema({
    title: {type: String, default: "Untitled Prompt"},
    start: {type: String, required: true}
})

const genreSchema = new Schema({
    genre: {type: String, required: true},
    starts: {type: [startSchema], required: true, default: []},
    prompts: {type: [promptSchema], required: true, default: []}
})

const contributionSchema = new Schema({
    username: {type: String, required: true},
    sentence: {type: String, required: true}
})

const userScoreSchema = new Schema({
    username: {type: String, required: true},
    score: {type: Number, required: true},
    icon: {type: String, required: true}
})

const storySchema = new Schema({
    title: {type: String, default: "untitled_story"},
    start: {type: String, required: true},
    story: {type: String, default: ""},
    contributions: {type: [contributionSchema], default: []},
    userScores: {type: [userScoreSchema], default: []}
})

const roomSchema = new Schema({
    code: {type: String, unique: true},
    private: {type: Boolean, default: false},
    host: {type: String},
    genre: {type: String, default: "Adventure"},
    users: {type: Number, required: true},
    inProgress: {type: Boolean, default: false}
})

const Genre = mongoose.model('Genre', genreSchema);
const Story = mongoose.model('Story', storySchema);
const Room = mongoose.model('Room', roomSchema);

module.exports = { Genre, Story, Room }