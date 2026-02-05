const { ObjectId } = require("mongodb");
const connectDB = require("../models/db");

// GET all students
async function getAllStudents(req, res) {
  try {
    const db = await connectDB();
    const students = await db.collection("students").find().toArray();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// GET student by ID
async function getStudentById(req, res) {
  try {
    const db = await connectDB();
    const student = await db
      .collection("students")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
}

// CREATE student
async function createStudent(req, res) {
  const {
    firstName,
    lastName,
    email,
    registrationNumber,
    course,
    yearOfStudy
  } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const db = await connectDB();
    const result = await db.collection("students").insertOne({
      firstName,
      lastName,
      email,
      registrationNumber,
      course,
      yearOfStudy,
      createdAt: new Date()
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to create student" });
  }
}

// UPDATE student
async function updateStudent(req, res) {
  try {
    const db = await connectDB();
    const result = await db.collection("students").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
}

// DELETE student
async function deleteStudent(req, res) {
  try {
    const db = await connectDB();
    const result = await db
      .collection("students")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
