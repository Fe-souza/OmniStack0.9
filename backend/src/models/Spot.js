const mongoose = require('mongoose');

const Spotchema = new mongoose.Schema({
    thumbnail:String,
    company:String,
    price:Number,
    techs:[String],
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
},{
    toJSON:{
        virtuals:true,
    }
}
);

Spotchema.virtual('thumbnail_url').get(function () {
    return `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', Spotchema);