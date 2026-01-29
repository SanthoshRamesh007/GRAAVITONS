import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import * as XLSX from 'xlsx';
import StudentProfile from './StudentProfile';
import AddStudent from './AddStudent';
import AddExam from './AddExam';
import './BatchDetail.css';

const BatchDetail = ({ batch, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddExam, setShowAddExam] = useState(false);

  // Sample data - can be replaced with API calls
  const analyticsData = {
    totalStudents: 45,
    boys: 28,
    girls: 17,
    batchTopics: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    totalExams: 12
  };

  // Sample Chart Data
  const examPerformanceData = [
    { name: 'Exam 1', average: 65 },
    { name: 'Exam 2', average: 68 },
    { name: 'Exam 3', average: 75 },
    { name: 'Exam 4', average: 72 },
    { name: 'Exam 5', average: 80 },
    { name: 'Exam 6', average: 85 },
  ];

  const subjectAnalysisData = [
    { name: 'Math', average: 82, fill: '#8884d8' },
    { name: 'Physics', average: 75, fill: '#82ca9d' },
    { name: 'Chem', average: 78, fill: '#ffc658' },
    { name: 'Bio', average: 85, fill: '#ff7300' },
  ];

  const students = [
    { id: 1, name: 'Rajesh Kumar', rollNo: 'NB001', gender: 'Male', marks: 85 },
    { id: 2, name: 'Priya Sharma', rollNo: 'NB002', gender: 'Female', marks: 92 },
    { id: 3, name: 'Amit Patel', rollNo: 'NB003', gender: 'Male', marks: 78 },
    { id: 4, name: 'Sneha Reddy', rollNo: 'NB004', gender: 'Female', marks: 88 },
    { id: 5, name: 'Vikram Singh', rollNo: 'NB005', gender: 'Male', marks: 75 }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'male' && student.gender === 'Male') ||
      (selectedFilter === 'female' && student.gender === 'Female');
    return matchesSearch && matchesFilter;
  });

  const handleDownloadFormat = () => {
    alert('Downloading exam format template...');
  };

  const handleUploadMarks = () => {
    alert('Upload exam marks feature');
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleBackToStudents = () => {
    setSelectedStudent(null);
  };

  const handleAddStudent = () => {
    setShowAddStudent(true);
  };

  const handleBackFromAddStudent = () => {
    setShowAddStudent(false);
  };

  const handleSaveStudent = (studentData) => {
    console.log('New student data:', studentData);
    // Here you would typically send the data to your backend API
  };

  const handleAddExam = () => {
    setShowAddExam(true);
  };

  const handleBackFromAddExam = () => {
    setShowAddExam(false);
  };

  const handleSaveExam = (examData) => {
    console.log('New exam data:', examData);
    // Here you would typically send the data to your backend API
  };

  const handleGenerateReport = () => {
    // Create workbook
    const wb = XLSX.utils.book_new();

    // Batch Information Sheet
    const batchInfo = [
      ['Batch Report'],
      ['Batch Name:', batch.name],
      ['Description:', batch.description],
      ['Total Students:', analyticsData.totalStudents],
      ['Boys:', analyticsData.boys],
      ['Girls:', analyticsData.girls],
      ['Total Exams:', analyticsData.totalExams],
      [''],
      ['Batch Topics:', analyticsData.batchTopics.join(', ')]
    ];
    const wsInfo = XLSX.utils.aoa_to_sheet(batchInfo);
    XLSX.utils.book_append_sheet(wb, wsInfo, 'Batch Information');

    // Student List Sheet
    const studentHeaders = ['Admission Number', 'Student Name', 'Gender', 'Latest Marks'];
    const studentRows = filteredStudents.map(student => [
      student.rollNo,
      student.name,
      student.gender,
      student.marks
    ]);
    const wsStudents = XLSX.utils.aoa_to_sheet([studentHeaders, ...studentRows]);
    XLSX.utils.book_append_sheet(wb, wsStudents, 'Student List');

    // Exam Performance Sheet
    const examHeaders = ['Exam Name', 'Average Score'];
    const examRows = examPerformanceData.map(exam => [
      exam.name,
      exam.average
    ]);
    const wsExams = XLSX.utils.aoa_to_sheet([examHeaders, ...examRows]);
    XLSX.utils.book_append_sheet(wb, wsExams, 'Exam Performance');

    // Subject Analysis Sheet
    const subjectHeaders = ['Subject', 'Average Score'];
    const subjectRows = subjectAnalysisData.map(subject => [
      subject.name,
      subject.average
    ]);
    const wsSubjects = XLSX.utils.aoa_to_sheet([subjectHeaders, ...subjectRows]);
    XLSX.utils.book_append_sheet(wb, wsSubjects, 'Subject Analysis');

    // Statistics Sheet
    const marks = students.map(s => s.marks);
    const topMark = Math.max(...marks);
    const averageMark = (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(2);
    const lowestMark = Math.min(...marks);

    const statistics = [
      ['Batch Statistics'],
      [''],
      ['Metric', 'Value'],
      ['Highest Score', topMark],
      ['Average Score', averageMark],
      ['Lowest Score', lowestMark],
      ['Total Students', analyticsData.totalStudents],
      ['Pass Percentage', '85%'], // You can calculate this based on your criteria
    ];
    const wsStats = XLSX.utils.aoa_to_sheet(statistics);
    XLSX.utils.book_append_sheet(wb, wsStats, 'Statistics');

    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `${batch.name.replace(/\s+/g, '_')}_Report_${date}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);

    alert('Report generated successfully!');
  };

  if (showAddExam) {
    return <AddExam batch={batch} students={students} onBack={handleBackFromAddExam} onSave={handleSaveExam} />;
  }

  if (showAddStudent) {
    return <AddStudent onBack={handleBackFromAddStudent} onSave={handleSaveStudent} />;
  }

  if (selectedStudent) {
    // Calculate batch statistics for the graph
    const marks = students.map(s => s.marks);
    const topMark = Math.max(...marks);
    const averageMark = marks.reduce((a, b) => a + b, 0) / marks.length;

    const batchStats = {
      topMark,
      averageMark,
      studentMark: selectedStudent.marks
    };

    return <StudentProfile student={selectedStudent} batchStats={batchStats} onBack={handleBackToStudents} />;
  }

  return (
    <div className="batch-detail">
      <div className="batch-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>{batch.name}</h2>
      </div>

      {/* Analytics Box */}
      <div className="analytics-box">
        <div className="analytics-card">
          <h3>Total Students</h3>
          <p className="analytics-value">{analyticsData.totalStudents}</p>
        </div>
        <div className="analytics-card">
          <h3>Boys</h3>
          <p className="analytics-value">{analyticsData.boys}</p>
        </div>
        <div className="analytics-card">
          <h3>Girls</h3>
          <p className="analytics-value">{analyticsData.girls}</p>
        </div>
        <div className="analytics-card">
          <h3>Total Exams</h3>
          <p className="analytics-value">{analyticsData.totalExams}</p>
        </div>
      </div>

      {/* Batch Topics */}
      <div className="batch-topics">
        <h3>Batch Topics</h3>
        <div className="topics-list">
          {analyticsData.batchTopics.map((topic, index) => (
            <span key={index} className="topic-tag">{topic}</span>
          ))}
        </div>
      </div>

      {/* Student Management Buttons */}
      <div className="management-buttons">
        <button className="btn btn-primary" onClick={handleAddStudent}>+ Add New Student</button>
        <button className="btn btn-secondary" onClick={handleAddExam}>+ New Exam</button>
        <button className="btn btn-report" onClick={handleGenerateReport}>📊 Generate Report</button>
      </div>

      {/* Student List */}
      <div className="student-list-section">
        <div className="section-header">
          <h3>Student List</h3>
          <div className="list-controls">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Students</option>
              <option value="male">Boys</option>
              <option value="female">Girls</option>
            </select>
          </div>
        </div>

        <div className="student-table">
          <table>
            <thead>
              <tr>
                <th>Admission Number</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Latest Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>{student.gender}</td>
                  <td>{student.marks}%</td>
                  <td>
                    <button className="btn-action" onClick={() => handleViewStudent(student)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="analytics-section">
        <h3>Analytics & Performance</h3>
        <div className="analytics-charts">
          <div className="chart-container">
            <h4>Exam-wise Performance (Average)</h4>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={examPerformanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="average" stroke="#8884d8" name="Batch Average" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-container">
            <h4>Subject-wise Last Exam Analysis</h4>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={subjectAnalysisData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="average" name="Subject Average" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetail;
