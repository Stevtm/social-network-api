const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// schema for reactions to thoughts
const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			maxLength: 280,
		},
		username: {
			type: String,
			required: [true, "Username is required"],
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

// schema for thoughts
const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: [true, "Text is required"],
			maxLength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			// add method here to format the date
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
		username: {
			type: String,
			required: [true, "Username is required"],
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
	}
);

ThoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
