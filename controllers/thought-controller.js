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
					res.status(404).json({ message: "No thought found with this id" });
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
	createThought({ body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: body.userId },
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

	// PUT update a thought by its id
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((updatedThought) => {
				// if there is no thought with this id, return 404 status
				if (!updatedThought) {
					res.status(404).json({ message: "No thhought found with this id" });
					return;
				}

				// remove the old version of the comment from the User
				// User.findOneAndUpdate(
				// 	{ _id: params.userId },
				// 	{ $pull: { thoughts: params.thoughtId } },
				// 	{ new: true }
				// );

				// add the new version of the comment to the user
				// return User.findOneAndUpdate(
				// 	{ _id: params.userId },
				// 	{ $push: { thoughts: params.thoughtId } },
				// 	{ new: true }
				// );
				res.status(200).json(updatedThought);
			})
			// .then((dbUserData) => {
			// 	if (!dbUserData) {
			// 		res.status(404).json({ message: "No user found with this id" });
			// 		return;
			// 	}

			// 	res.status(200).json(dbUserData);
			// })
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// DELETE a thought by its id
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId })
			.then((deletedThought) => {
				// if there is no thought with this id, send 404 response
				if (!deletedThought) {
					res.status(404).json({ message: "No thought found with this id" });
					return;
				}

				// remove the thought from the user
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $pull: { thoughts: params.thoughtId } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				// if there is no user found with this id, send 404 response
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id" });
					return;
				}

				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// POST create a reaction to a thought
	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.id },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true }
		)
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id" });
					return;
				}

				res.status(200).json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// DELETE a reaction to a thought
	deleteReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id" });
					return;
				}

				res.status(200).json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
};

module.exports = thoughtController;
