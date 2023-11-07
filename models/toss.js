const mongoose = require('mongoose');
const teamDetailSchema  =require("./teamDetail");
const TeamDetail = require('./teamDetail');


const tossSchema= new mongoose.Schema({

    team1_id: {
        type: mongoose.Schema.Types.ObjectId,   
        ref:"TeamDetail"
        
    },
    team2_id: {
      type: mongoose.Schema.Types.ObjectId,   
      ref:"TeamDetail"
      
  },

    tosses:{
    type:Number
  },
  team1Name: {
    type: mongoose.Schema.Types.String,
    ref:"teamDetail"
  },
  team2Name:{
    type:mongoose.Schema.Types.String,
    ref:"teamDetail"
  }

},
 {
   timestamps:true
 
})

module.exports = mongoose.model("Toss",tossSchema); 