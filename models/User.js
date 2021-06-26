// import required modules
const { Schema, model } = require("mongoose");

// define the User schema
const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required"],
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Username is required"],
			unique: true,
			match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
		},
		thoughts: {},
		friends: [UserSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
	}
);

UserSchema.virtual("friendsCount").get(function () {
	return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
