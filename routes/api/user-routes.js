// import dependencies
const router = require("express").Router();
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
	deleteFriend,
} = require("../../controllers/user-controller");

// /api/users
// 	GET all users
// 	POST new user
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id
// 	GET one user by id
// 	PUT update user by id
// 	DELETE user by id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
// 	POST add new friend to a user's friend list
//  DELETE remove friend from user's friend list
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
