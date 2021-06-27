const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

// set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// use routes in routes directory
app.use(require("./routes"));

// set up server
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/social-network-api",
	{
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

// enable debug
mongoose.set("debug", true);

// start listening on PORT
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
