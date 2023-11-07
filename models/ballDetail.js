const mongoose = require("mongoose");

const ballDetailSchema = new mongoose.Schema({
    batsmandId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bowlerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    run: {
        type: Number,
        required: true
    },
    wicketStatus: {
        type: Boolean,
        required: true
    },
    isFour: {
        type: Boolean,
        required: true
    },
    isSix: {
        type: Boolean,
        required: true
    },
    isNoBall: {
        type: Boolean,
        required: true
    },
    isWideBall: {
        type: Boolean,
        required: true
    }
})

const ballDetail = new mongoose.model("BallDetail", ballDetailSchema);
module.exports = ballDetail;