const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/authMiddleware");


const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/coursesController");

// CRUD routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", isAuth, createCourse);
router.put("/:id", isAuth, updateCourse);
router.delete("/:id", isAuth, deleteCourse);

module.exports = router;
