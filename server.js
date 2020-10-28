let express = require("express");
let fs = require("fs");
let path = require("path");
let app = express();
let PORT = process.env.PORT || 3001;

console.log("Successfully opened port" + PORT);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

require("./public/apiRoutes.js")(app);
require("./public/htmlRoutes.js")(app);

app.listen(PORT, function(){
    console.log("App listening on PORT:" + PORT);
});