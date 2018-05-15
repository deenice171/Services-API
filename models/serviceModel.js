var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var serviceModel = new Schema({
    serviceID: { type: String },
    service: { type: String },
    name: { type: String },
    profession: { type: String },
    cost: { type: String }
});



module.exports = mongoose.model('Services', serviceModel);
