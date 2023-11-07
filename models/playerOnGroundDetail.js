const mongoose = require("mongoose");
const validator = require("validator");

const onGroundPlayerSchema = new mongoose.Schema({
    playerFullName: {
        type: String,
        required: true
    },
    playerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    teamName: {
        type: String,
        required: true 
    },
    teamID: {
        // type: String
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeamDetail',
        required: true
    }
});

onGroundPlayerSchema.statics.isThisContactInUse = async function(contact) {
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
const PlayerOnGround = new mongoose.model('PlayerOnGround', onGroundPlayerSchema);
module.exports = PlayerOnGround;