const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController")
const checkUserExists = require("../middlewares/checkUserExists")

router.get("/", controller.getUsers)
router.post("/", controller.createUser)

router.put("/:id", checkUserExists, controller.updateUser)
router.patch("/:id", checkUserExists, controller.toggleUser)
router.delete("/:id", checkUserExists, controller.deleteUser)

router.get("/stats", controller.getStats)

module.exports = router