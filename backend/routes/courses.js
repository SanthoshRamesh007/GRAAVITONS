const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new course
router.post('/', async (req, res) => {
  const course = new Course({
    code: req.body.code,
    name: req.body.name,
    description: req.body.description,
    instructors: req.body.instructors,
    category: req.body.category
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Seed sample courses
router.post('/seed', async (req, res) => {
  const sampleCourses = [
    {
      code: 'SPD-SEMINAR-CCOA',
      name: 'Student Personality Development',
      description: 'Student Personality Development - Student Personality Development',
      instructors: ['S.SRIPRIYA', 'G.SASIKALA', 'E.SOWMIYA', 'M.E.PRATHIKA', 'S.KRISHNAVENI'],
      category: 'Soft Skills'
    },
    {
      code: 'PLACEMENT',
      name: 'Placement Training',
      description: 'Placement Training - Placement Training',
      instructors: ['M.E.PRATHIKA', 'DR.E.M.ROOPA DEVI'],
      category: 'Career Development'
    },
    {
      code: '22ITT62',
      name: 'Mobile Communication',
      description: '22ITT62 - Mobile Communication',
      instructors: ['DR.R.SHANTHAKUMARI'],
      category: 'Theory'
    },
    {
      code: '22ITP62',
      name: 'Project Work - I',
      description: '22ITP62 - Project Work - I',
      instructors: ['A.DEENU MOL', 'T.VAISHNAVI', 'S.KRISHNAVENI', 'M.E.PRATHIKA'],
      category: 'Project'
    },
    {
      code: '22MNT31',
      name: 'Environmental Science',
      description: '22MNT31 - Environmental Science',
      instructors: ['K.KRISHNAVENI'],
      category: 'Science'
    },
    {
      code: 'B1-22ITL61',
      name: 'Cloud Computing Laboratory',
      description: '22ITL61 - Cloud Computing Laboratory',
      instructors: ['T.S.VISHNU PRIYA', 'S.KRISHNAVENI', 'V.P.GAYATHRI', 'DR.E.M.ROOPA DEVI'],
      category: 'Laboratory'
    },
    {
      code: '22ITF02',
      name: 'DevOps',
      description: '22ITF02 - Devops',
      instructors: ['D.VIJAY ANAND'],
      category: 'Theory'
    },
    {
      code: '22GEP61',
      name: 'Comprehensive Test and Viva',
      description: '22GEP61 - Comprehensive Test and Viva',
      instructors: ['DR.S.VARADHAGANAPATHY'],
      category: 'Assessment'
    },
    {
      code: 'B1-22ITL62',
      name: 'Internet of Things Laboratory',
      description: '22ITL62 - Internet of Things Laboratory',
      instructors: ['S.SRIPRIYA', 'M.E.PRATHIKA', 'R.SANDHIYA'],
      category: 'Laboratory'
    }
  ];

  try {
    await Course.deleteMany({});
    const courses = await Course.insertMany(sampleCourses);
    res.status(201).json({ message: 'Sample courses created', courses });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
