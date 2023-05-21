var express = require("express");
var bodyParser = require("body-parser");
var dotenv = require("dotenv")

var index = require('./routes/index');




var app = express();
dotenv.config();
app.all("/*",(req,res,next)=>{
	var development_env = !process.env.PRODUCTION;
	if(development_env){
		res.header('Access-Control-Allow-Origin',"*");		
	}
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Headers","Content-type,Accept,X-Access-Token,X-Key");
	if(req.method == "OPTIONS"){
		res.status(200).end()
	}
	else{
		next();
	}
});


app.set('view engine', 'html');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);


// catch 404 and forward to error handler
app.use( (req, res, next)=>{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = !process.env.PRODUCTION ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(process.env.PORT || 3000, () =>{
	console.log(`Server Running on port ${process.env.PORT || 3000}`);
});
