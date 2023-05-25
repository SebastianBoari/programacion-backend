import mongoose from 'mongoose';

const studentsCollection = 'students';

const studentsSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    grade: Number,
    group: {
        type: String,
        enum: ["1A", "1B"],
        default: "1A" 
    },
});

const studentsModel = mongoose.model(studentsCollection, studentsSchema);

export default studentsModel;