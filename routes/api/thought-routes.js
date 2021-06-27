// import dependencies
const router = require("express").Router();
const {
	getAllThoughts,
	getThoughtById,
	createThought,
	updateThought,
	deleteThought,
} = require("../../controllers/thought-controller");

// set up GET all thoughts at /api/thoughts
router.route("/").get(getAllThoughts);

// set up GET thought by ID at /api/thoughts/:id
router.route("/:id").get(getThoughtById);

// set up POST create thought at /api/thoughts/:userId
router.route("/:userId").post(createThought);

// set up PUT create thought and DELETE thought at /api/thoughts/:userId/:thoughtId
router.route("/:userId/:thoughtId").put(updateThought).delete(deleteThought);

module.exports = router;
