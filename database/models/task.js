

const mongoose = require('mongoose');
// const { Schema } = mongoose;

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3
    },
    _listId: {
        type:  mongoose.Types.ObjectId ,
        // type: mongoose.Schema.Types.ObjectId,  ref: 'Roasfsdafdsfdsfom',
        required: true
        
    },
    completed: {
        type: Boolean,
        default: false,
        
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;