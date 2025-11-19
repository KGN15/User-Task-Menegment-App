const mongose = require('mongoose');

mongose.connect('mongodb://localhost:27017/userManagementSoftDB' );

const userSchema = mongose.Schema({
    name: String,
    email: String,
    Image: String
});

module.exports = mongose.model('User', userSchema);