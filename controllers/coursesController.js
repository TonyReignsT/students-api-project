const { ObjectId } = require("mongodb");
const connectDB = require("../models/db");


// GET all courses
async function getAllCourses(req, res) {
  try {
    const db = await connectDB();
    const courses = await db.collection("courses").find().toArray();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// GET course by ID
async function getCourseById(req, res) {
  try {
    const db = await connectDB();
    const course = await db
      .collection("courses")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
}

// CREATE course
async function createCourse(req, res) {
  const { name, code, instructor, credits, semester, department, year } = req.body;

  if (!name || !code || !instructor) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const db = await connectDB();
    const result = await db.collection("courses").insertOne({
      name,
      code,
      instructor,
      credits,
      semester,
      department,
      year,
      createdAt: new Date()
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to create course" });
  }
}

// UPDATE course
async function updateCourse(req, res) {
  try {
    const db = await connectDB();
    const result = await db.collection("courses").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course updated" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
}

// DELETE course
async function deleteCourse(req, res) {
  try {
    const db = await connectDB();
    const result = await db
      .collection("courses")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};