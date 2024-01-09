const mongoose = require('mongoose');
const clientModel=require('./models/client');
const tokenModel=require('./models/token');
const userModel=require('./models/registrationDetail');
//  const saveRegistrationDetail = require("./controllers/registrationDetail")

// *******************************************************
var loadExampleData = function() {

	var client1 = new clientModel({
		id: 'application',	// TODO: Needed by refresh_token grant, because there is a bug at line 103 in https://github.com/oauthjs/node-oauth2-server/blob/v3.0.1/lib/grant-types/refresh-token-grant-type.js (used client.id instead of client.clientId)
		clientId: 'application',
		clientSecret: 'secret',
		grants: [
			'password',
			'refresh_token'
		],
		redirectUris: []
	});

	var client2 = new clientModel({
		clientId: 'confidentialApplication',
		clientSecret: 'topSecret',
		grants: [
			'password',
			'client_credentials'
		],
		redirectUris: []
	});
    
	var user = new userModel({
		username: req.body.username,
		password:  req.body.password,
        email:req.body.email,
        phone:req.body.phone
	});
    console.log("user:-",user)

	client1.save(function(err, client) {

		if (err) {
			return console.error(err);
		}
		console.log('Created client', client);
	});

	user.save(function(err, user) {

		if (err) {
			return console.error(err);
		}
		console.log('Created user', user);
	});

	client2.save(function(err, client) {

		if (err) {
			return console.error(err);
		}
		console.log('Created client', client);
	});
};

/**
 * Dump the database content (for debug).
 */

//  var dump = function() {
//  };


// *******************************************************
var getAccessToken=function(token,callback){
    tokenModel.findOne({
        accessToken:token
    }).lean().exec((function(callback, err, token) {

		if (!token) {
			console.error(' Access Token not found');
            console.log(token)
		}

		callback(err, token);
	}).bind(null, callback));
};


var getClient=function(clientId,clientSecret,callback){
    clientModel.findOne({
        clientId:clientId,
        clientSecret:clientSecret
    }).lean().exec((function(callback,err,client){
        if(!client){
            console.error('Client not found');
        }
        callback(err,client);

    }).bind(null,callback));
};


var saveToken=function(token,client,user,callback){

    token.client={
        id:client.clientId
    };

    token.user={
        _id:user._id.toString(),
        username:user.username,
        email:user.email,
        phone:user.phone,
        password:user.password
    };

    var tokeninstance=new tokenModel(token);
    tokeninstance.save((function(callback,err,token){
        if(!token){
            console.error('Access Token not found');
        } else{
            token =token.toObject();
            delete token._id;
            delete token._v;
        }
        callback(err,token);

    }).bind(null,callback))
};

var getUser=function(username,password,callback){
    userModel.findOne({
        username:username,
        password: password
}).lean().exec((function(callback,err,user){
    if(!user){
        console.error("User not Found ");
    }
    callback(err,user);
}).bind(null,callback));
};

var getUserFromClient=function(client,callback){
    clientModel.findOne({
        
        clientId:client.clientId,
        clientSecret:client.clientSecret,
        grants:'client Credentials'
    }).lean().exec((function(callback,err,client){
        if(!client){
            console.error('Client not found')
        }
        callback(err,{
            username:''
        });
    }).bind(null,callback));
};


var getRefreshToken=function(refreshToken,callback){
    tokenModel.findOne({
        refreshToken:refreshToken
    }).lean().exec((function(callback,err,token){
        if(!token){
            console.error("Refresh Token not found");
        }
        callback(err,token);

    }).bind(null,callback));
};

var revokeToken=function(token,callback){
    tokenModel.deleteOne({
        refreshToken:token.refreshToken
    }).exec((function(callback,err,results){
        var deleteSuccess=results&&results.deletedCount===1;

        if(!deleteSuccess){
            console.error('Token not deleted');
        }
        callback(err,deleteSuccess);
    }).bind(null,callback));
};
//    loadExampleData()

module.exports={
    getAccessToken: getAccessToken,
	getClient: getClient,
	saveToken: saveToken,
	getUser: getUser,
	getUserFromClient: getUserFromClient,
	getRefreshToken: getRefreshToken,
	revokeToken: revokeToken
}