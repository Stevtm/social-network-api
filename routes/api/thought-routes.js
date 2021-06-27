// import dependencies
const router = require("express").Router();
const {
	getAllThoughts,
	getThoughtById,
	createThought,
	updateThought,
	deleteThought,
} = require("../../controllers/thought-controller");

// set up the following routes at /api/thoughts
//  GET all thoughts
//  POST new thought
router.route("/").get(getAllThoughts).post(createThought);

// set up the following routes at /api/thoughts/:id
//  GET thought by ID
//  PUT update thought by ID
router.route("/:id").get(getThoughtById).put(updateThought);

// set up the following routes at /api/thought/:userId/:thoughtId
router.route("/:userId/:thoughtId").delete(deleteThought);

module.exports = router;
