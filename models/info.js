var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InfoSchema = new Schema({
    address: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('info' , InfoSchema);
