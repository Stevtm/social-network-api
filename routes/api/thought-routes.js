// import dependencies
const router = require("express").Router();
const {
	getAllThoughts,
	getThoughtById,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	deleteReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts
//  GET all thoughts
//  POST new thought
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:id
//  GET thought by ID
//  PUT update thought by ID
//  POST new reaction for thought
router.route("/:id").get(getThoughtById).put(updateThought).post(addReaction);

// /api/thought/:userId/:thoughtId
//  DELETE thought by ID
router.route("/:userId/:thoughtId").delete(deleteThought);

// /api/thoughts/:thoughtId/:reactionId
//  DELETE a reaction by ID
router.route("/:thoughtId/:reactionId").delete(deleteReaction);

module.exports = router;
