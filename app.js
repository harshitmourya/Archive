require("dotenv").config();

var express = require("express"),
    bodyParser = require("body-parser"),
    // oAuthProvider = require('oAuthProvider'), 
    OAuth2Server = require('oauth2-server'),
     Request = OAuth2Server.Request,
     Response = OAuth2Server.Response,
     players_routes = require("./routes/players"),
     connectDB = require("./db/connect"),
     PORT = process.env.PORT || 3000;
     router = express.Router();
     
  var app = express();

app.get("/", (_req, res) => {
    res.send("Hi, I am live");
});


const saveLoginDetail = require("./controllers/loginDetail")
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/oauth/token/login', obtainToken);
app.get('/test', authenticaterequest, function (_req, res) {
    res.send('Success')
})
// router.route("/login").post(saveLoginDetail);

// app.post('/login',saveLoginDetail)
//set router or middleware
app.use("/api/players", players_routes);

async function start() {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} is connected`);
        });
    } catch (error) {
        console.log(error);
    }
}



const oauthServer = new OAuth2Server({
    model: require('./model.js'),
    accessTokenLifetime: 4 * 60 *  60,
    allowBearerTokensInQueryString: false

});

function obtainToken(req, res) {
    var request = new Request(req);
    var response = new Response(res);

    return oauthServer.token(request, response)
        .then(function (token) {
            res.json(token);
        }).catch(function (err) {
            res.status(err.code || 500).json(err);


        })
}
function authenticaterequest(req, res, next) {
    var request = new Request(req);
    var response = new Response(res);

    return oauthServer.authenticate(request, response)
        .then(function (token) {

            response.locals.auth = {_id: token._id, user:token.user}
            next();
        }).catch(function (err) {
            res.status(err.code || 500).json(err);
        });
}


start();
module.exports = app
// module.exports= authenticaterequest