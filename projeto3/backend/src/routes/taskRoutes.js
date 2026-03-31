const express = require("express")
const router = express.Router()
const controller = require("../controllers/taskController")
const checkTaskExists = require("../middlewares/checkTaskExists")

router.get("/", controller.getTasks)
router.post("/", controller.createTask)

router.put("/:id", checkTaskExists, controller.updateTask)
router.delete("/:id", checkTaskExists, controller.deleteTask)

router.get("/stats", controller.getStats)

router.post("/:id/tags", checkTaskExists, controller.addTagToTask)

router.post("/:id/comments", checkTaskExists, controller.createComment)
router.get("/:id/comments", checkTaskExists, controller.getComments)

module.exports = router