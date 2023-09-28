const mongoose = require('mongoose');
const {Schema} = mongoose


const NotesSchema=new Schema({
    user:{
        //Fetching the object from other schema or like foreign key
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',//Model name which is defined in models folder
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true,
       
    },
    tag:{
        type: String,
        default:"General"
    },
    date:{
        type: Date,
        default:Date.now
    },
}
)
const Notes=mongoose.model('notes',NotesSchema)

module.exports=Notes