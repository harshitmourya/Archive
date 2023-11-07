const mongoose = require("mongoose");
const validator = require("validator");

const playerDetailSchema = new mongoose.Schema({
    playerFullName: {
        type: String,
        required: true
    },
    // playerLastName: {
    //     type: String,
    //     required: true
    // },
    playerContact: {
        type: Number,
        required: true,
        minlangth: 10,
        maxlangth: 10,
        Unique: true
        
    }
    // teamName: {
    //     type: String,..
    //     // required: true
    // },
    // teamID: {
    //     type: String
    //     // type: mongoose.Schema.Types.ObjectId,
    //     // ref: 'TeamDetail',
    //     // required: true
    // }
});

playerDetailSchema.statics.isThisContactInUse = async function(contact) {
    if (!contact) throw new error ('Invalid Contact')
    try {
        const user = await this.findOne({contact});
        console.log("User: ",user);
        if(user) return false
        return true;
    } catch (error) {
        console.log("Error inside isThisContactInUse method", error.message);
        return false;
    }
}
const Player = new mongoose.model('Player', playerDetailSchema);
module.exports = Player;



// teamName: {
    //     type: String,
    //     required: true
    // }
    // playerName:[{
    //     name: {
    //         type: String,
    //         require: true,
    //         minlenght: 3
    //     }
    // }]