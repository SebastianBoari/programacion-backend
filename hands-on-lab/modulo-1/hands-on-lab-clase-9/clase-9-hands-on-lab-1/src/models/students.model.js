import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const studentsCollection = 'students';

const studentsSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String
});

studentsSchema.plugin(mongoosePaginate);

const studentsModel = mongoose.model(studentsCollection, studentsSchema);

export default studentsModel;