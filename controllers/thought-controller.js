const { Thought, User } = require("../models");

const thoughtController = {
	// GET all thoughts
	getAllThoughts(req, res) {
		Thought.find({})
			.select("-__v")
			.sort({ _id: -1 })
			.then((dbThoughtData) => {
				res.status(200).json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// GET a single thought by id
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.select("-__v")
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404), json({ message: "No thought found with this id" });
					return;
				}

				res.status(200).json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// POST create a new thought
	createThought({ params, body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id" });
					return;
				}

				res.status(200).json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
};
