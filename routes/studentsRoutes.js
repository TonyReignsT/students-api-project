const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/authMiddleware")

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentsController");

// GET all students
router.get("/", getAllStudents);

// GET one student
router.get("/:id", getStudentById);

// POST create student
router.post("/", isAuth, createStudent);

// PUT update student
router.put("/:id",isAuth, updateStudent);

// DELETE student
router.delete("/:id", isAuth, deleteStudent);

module.exports = router;
