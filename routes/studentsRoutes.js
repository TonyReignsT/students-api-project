const express = require("express");
const router = express.Router();

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
router.post("/", createStudent);

// PUT update student
router.put("/:id", updateStudent);

// DELETE student
router.delete("/:id", deleteStudent);

module.exports = router;
