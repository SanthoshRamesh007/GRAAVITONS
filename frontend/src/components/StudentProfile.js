import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './StudentProfile.css';

const StudentProfile = ({ student, batchStats, onBack }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      date: '2024-01-15',
      teacherFeedback: 'Excellent performance in Physics. Shows great understanding of concepts.',
      suggestions: 'Focus more on problem-solving speed for competitive exams.'
    },
    {
      id: 2,
      date: '2024-01-10',
      teacherFeedback: 'Good improvement in Chemistry. Regular attendance noted.',
      suggestions: 'Practice more organic chemistry reactions.'
    }
  ]);
  const [currentFeedback, setCurrentFeedback] = useState({
    date: new Date().toISOString().split('T')[0],
    teacherFeedback: '',
    suggestions: ''
  });

  // Extended student data
  const studentData = {
    // Basic Information
    name: student.name,
    dob: student.dob || '15/05/2008',
    grade: '12th',
    community: 'General',
    academicYear: '2024-2025',
    course: 'NEET Preparation',
    branch: 'Medical',
    rollNo: student.rollNo,
    gender: student.gender,

    // Contact Information
    studentMobile: '+91 9876543210',
    aadharNumber: 'XXXX-XXXX-1234',
    aasarId: 'ASR123456',
    emailId: 'student@example.com',

    // Personal Information
    schoolName: 'ABC High School',
    fatherName: student.parentName || 'Mr. Kumar',
    fatherOccupation: 'Business',
    fatherContact: student.parentPhone || '+91 9876543210',
    fatherEmail: student.parentEmail || 'father@example.com',
    motherName: 'Mrs. Kumar',
    motherOccupation: 'Teacher',
    motherContact: '+91 9876543211',
    motherEmail: 'mother@example.com',
    siblingName: 'John Kumar',
    siblingGrade: '10th',
    siblingSchool: 'XYZ School',

    // 10th Standard Marks
    std10Marks: {
      english: 95,
      tamil: 88,
      maths: 98,
      science: 96,
      socialScience: 92,
      total: 469
    },

    // 12th Standard Marks
    std12Marks: {
      english: 90,
      physics: 95,
      chemistry: 93,
      mathematics: 97,
      biology: 94,
      computerScience: 89,
      total: 558
    },

    // Entrance Exam Marks
    entranceExams: [
      { exam: 'JEE Main - Phase 1', score: 250, rank: 1500, percentile: 99.5 },
      { exam: 'JEE Main - Phase 2', score: 265, rank: 1200, percentile: 99.6 },
      { exam: 'NEET', score: 680, rank: 450, percentile: 99.8 }
    ],

    // Counselling Details
    counselling: {
      forum: 'NEET Counselling',
      round: '1',
      collegeAlloted: 'AIIMS Delhi',
      yearOfCompletion: '2025'
    }
  };

  // Daily Test Marks
  const dailyTests = [
    { subject: 'Physics', unit: 'Thermodynamics', test1: 25, test2: 28, test3: 27, total: 30 },
    { subject: 'Chemistry', unit: 'Organic Chemistry', test1: 27, test2: 29, test3: 28, total: 30 },
    { subject: 'Biology', unit: 'Cell Biology', test1: 28, test2: 27, test3: 29, total: 30 },
    { subject: 'Mathematics', unit: 'Calculus', test1: 26, test2: 28, test3: 27, total: 30 }
  ];

  // Mock Test Marks
  const mockTests = [
    { exam: 'Mock Test 1', physics: 85, chemistry: 88, biology: 90, mathematics: 87, total: 350 },
    { exam: 'Mock Test 2', physics: 88, chemistry: 90, biology: 92, mathematics: 89, total: 359 },
    { exam: 'Mock Test 3', physics: 90, chemistry: 92, biology: 94, mathematics: 91, total: 367 }
  ];

  return (
    <div className="student-profile">
      <div className="profile-header">
        <button className="back-button" onClick={onBack}>← Back to Students</button>
        <div className="profile-title-section">
          <h2>Student Profile - {studentData.name}</h2>
          <div className="student-photo">
            <img src="https://via.placeholder.com/150" alt={studentData.name} />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Information
        </button>
        <button
          className={`tab-button ${activeTab === 'marks' ? 'active' : ''}`}
          onClick={() => setActiveTab('marks')}
        >
          Marks & Analysis
        </button>
        <button
          className={`tab-button ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback & Suggestions
        </button>
      </div>

      {/* Personal Information Tab */}
      {activeTab === 'personal' && (
        <div className="tab-content">
          {/* Basic Student Details Section */}
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Admission Number:</label>
                <span>{studentData.rollNo}</span>
              </div>
              <div className="detail-item">
                <label>Student Name:</label>
                <span>{studentData.name}</span>
              </div>
              <div className="detail-item">
                <label>Date of Birth:</label>
                <span>{studentData.dob}</span>
              </div>
              <div className="detail-item">
                <label>Grade:</label>
                <span>{studentData.grade}</span>
              </div>
              <div className="detail-item">
                <label>Community:</label>
                <span>{studentData.community}</span>
              </div>
              <div className="detail-item">
                <label>Academic Year:</label>
                <span>{studentData.academicYear}</span>
              </div>
              <div className="detail-item">
                <label>Course:</label>
                <span>{studentData.course}</span>
              </div>
              <div className="detail-item">
                <label>Branch:</label>
                <span>{studentData.branch}</span>
              </div>
              <div className="detail-item">
                <label>Student Mobile:</label>
                <span>{studentData.studentMobile}</span>
              </div>
              <div className="detail-item">
                <label>Aadhar Number:</label>
                <span>{studentData.aadharNumber}</span>
              </div>
              <div className="detail-item">
                <label>Aasar ID:</label>
                <span>{studentData.aasarId}</span>
              </div>
              <div className="detail-item">
                <label>Email ID:</label>
                <span>{studentData.emailId}</span>
              </div>
            </div>
          </div>

          {/* School and Family Details */}
          <div className="profile-section">
            <h3>School & Family Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>School Name:</label>
                <span>{studentData.schoolName}</span>
              </div>
              <div className="detail-item">
                <label>Father Name:</label>
                <span>{studentData.fatherName}</span>
              </div>
              <div className="detail-item">
                <label>Father Occupation:</label>
                <span>{studentData.fatherOccupation}</span>
              </div>
              <div className="detail-item">
                <label>Father Contact:</label>
                <span>{studentData.fatherContact}</span>
              </div>
              <div className="detail-item">
                <label>Father Email:</label>
                <span>{studentData.fatherEmail}</span>
              </div>
              <div className="detail-item">
                <label>Mother Name:</label>
                <span>{studentData.motherName}</span>
              </div>
              <div className="detail-item">
                <label>Mother Occupation:</label>
                <span>{studentData.motherOccupation}</span>
              </div>
              <div className="detail-item">
                <label>Mother Contact:</label>
                <span>{studentData.motherContact}</span>
              </div>
              <div className="detail-item">
                <label>Mother Email:</label>
                <span>{studentData.motherEmail}</span>
              </div>
              <div className="detail-item">
                <label>Sibling Name:</label>
                <span>{studentData.siblingName}</span>
              </div>
              <div className="detail-item">
                <label>Sibling Grade:</label>
                <span>{studentData.siblingGrade}</span>
              </div>
              <div className="detail-item">
                <label>Sibling School:</label>
                <span>{studentData.siblingSchool}</span>
              </div>
            </div>
          </div>

          {/* 10th Standard Marks */}
          <div className="profile-section">
            <h3>10th Standard Marks</h3>
            <div className="marks-table">
              <table>
                <thead>
                  <tr>
                    <th>English</th>
                    <th>Tamil</th>
                    <th>Mathematics</th>
                    <th>Science</th>
                    <th>Social Science</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{studentData.std10Marks.english}</td>
                    <td>{studentData.std10Marks.tamil}</td>
                    <td>{studentData.std10Marks.maths}</td>
                    <td>{studentData.std10Marks.science}</td>
                    <td>{studentData.std10Marks.socialScience}</td>
                    <td><strong>{studentData.std10Marks.total}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 12th Standard Marks */}
          <div className="profile-section">
            <h3>12th Standard Marks</h3>
            <div className="marks-table">
              <table>
                <thead>
                  <tr>
                    <th>English</th>
                    <th>Physics</th>
                    <th>Chemistry</th>
                    <th>Mathematics</th>
                    <th>Biology</th>
                    <th>Computer Science</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{studentData.std12Marks.english}</td>
                    <td>{studentData.std12Marks.physics}</td>
                    <td>{studentData.std12Marks.chemistry}</td>
                    <td>{studentData.std12Marks.mathematics}</td>
                    <td>{studentData.std12Marks.biology}</td>
                    <td>{studentData.std12Marks.computerScience}</td>
                    <td><strong>{studentData.std12Marks.total}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Entrance Exam Marks */}
          <div className="profile-section">
            <h3>Entrance Exam Marks</h3>
            <div className="marks-table">
              <table>
                <thead>
                  <tr>
                    <th>Exam</th>
                    <th>Score</th>
                    <th>Rank</th>
                    <th>Percentile</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.entranceExams.map((exam, index) => (
                    <tr key={index}>
                      <td className="exam-name">{exam.exam}</td>
                      <td>{exam.score}</td>
                      <td>{exam.rank}</td>
                      <td>{exam.percentile}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Counselling Details */}
          <div className="profile-section">
            <h3>Counselling Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Forum of Counselling:</label>
                <span>{studentData.counselling.forum}</span>
              </div>
              <div className="detail-item">
                <label>Round:</label>
                <span>{studentData.counselling.round}</span>
              </div>
              <div className="detail-item">
                <label>College Alloted:</label>
                <span>{studentData.counselling.collegeAlloted}</span>
              </div>
              <div className="detail-item">
                <label>Year of Completion:</label>
                <span>{studentData.counselling.yearOfCompletion}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Marks & Analysis Tab */}
      {activeTab === 'marks' && (
        <div className="tab-content">
          {/* Daily Test Performance */}
          <div className="profile-section">
            <h3>Daily Test Performance</h3>
            <div className="marks-table">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Unit Name</th>
                    <th>Test-1</th>
                    <th>Test-2</th>
                    <th>Test-3</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyTests.map((test, index) => (
                    <tr key={index}>
                      <td className="exam-name">{test.subject}</td>
                      <td>{test.unit}</td>
                      <td>{test.test1}</td>
                      <td>{test.test2}</td>
                      <td>{test.test3}</td>
                      <td><strong>{test.total}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mock Test Performance */}
          <div className="profile-section">
            <h3>Mock Test Performance</h3>
            <div className="marks-table">
              <table>
                <thead>
                  <tr>
                    <th>Exam</th>
                    <th>Physics</th>
                    <th>Chemistry</th>
                    <th>Biology</th>
                    <th>Mathematics</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTests.map((exam, index) => (
                    <tr key={index}>
                      <td className="exam-name">{exam.exam}</td>
                      <td>{exam.physics}</td>
                      <td>{exam.chemistry}</td>
                      <td>{exam.biology}</td>
                      <td>{exam.mathematics}</td>
                      <td><strong>{exam.total}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Graph Section */}
          {batchStats && (
            <div className="profile-section performance-graph-section">
              <h3>Performance Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: 'Top Mark', topMark: batchStats.topMark },
                    { name: 'Batch Average', batchAverage: Math.round(batchStats.averageMark * 10) / 10 },
                    { name: 'Your Mark', yourMark: batchStats.studentMark }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="topMark" fill="#FF6B9D" name="Top Mark (%)" />
                  <Bar dataKey="batchAverage" fill="#4A90E2" name="Batch Average (%)" />
                  <Bar dataKey="yourMark" fill="#00D9C0" name="Your Mark (%)" />
                </BarChart>
              </ResponsiveContainer>
              <div className="performance-stats">
                <div className="stat-item">
                  <span className="stat-label">Top Mark in Batch:</span>
                  <span className="stat-value">{batchStats.topMark}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Batch Average:</span>
                  <span className="stat-value">{Math.round(batchStats.averageMark * 10) / 10}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Your Mark:</span>
                  <span className="stat-value">{batchStats.studentMark}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Teachers Feedback & Signatures */}
          <div className="profile-section">
            <h3>Feedback & Signatures</h3>
            <div className="feedback-section">
              <div className="feedback-item">
                <label>Date:</label>
                <input
                  type="date"
                  value={currentFeedback.date}
                  onChange={(e) => setCurrentFeedback({ ...currentFeedback, date: e.target.value })}
                  className="feedback-date"
                />
              </div>
              <div className="feedback-item">
                <label>Teachers Feedback:</label>
                <textarea
                  className="feedback-textarea"
                  placeholder="Enter teacher's feedback here..."
                  rows="4"
                  value={currentFeedback.teacherFeedback}
                  onChange={(e) => setCurrentFeedback({ ...currentFeedback, teacherFeedback: e.target.value })}
                ></textarea>
              </div>
              <div className="feedback-item">
                <label>Suggestions:</label>
                <textarea
                  className="feedback-textarea"
                  placeholder="Enter suggestions here..."
                  rows="4"
                  value={currentFeedback.suggestions}
                  onChange={(e) => setCurrentFeedback({ ...currentFeedback, suggestions: e.target.value })}
                ></textarea>
              </div>
              <button
                className="btn-save-feedback"
                onClick={() => {
                  if (currentFeedback.teacherFeedback || currentFeedback.suggestions) {
                    setFeedbackList([
                      {
                        id: feedbackList.length + 1,
                        ...currentFeedback
                      },
                      ...feedbackList
                    ]);
                    setCurrentFeedback({
                      date: new Date().toISOString().split('T')[0],
                      teacherFeedback: '',
                      suggestions: ''
                    });
                    alert('Feedback saved successfully!');
                  }
                }}
              >
                Save Feedback
              </button>
              <div className="signature-grid">
                <div className="signature-box">
                  <label>Academic Director's Signature</label>
                  <div className="signature-area"></div>
                </div>
                <div className="signature-box">
                  <label>Student Signature</label>
                  <div className="signature-area"></div>
                </div>
                <div className="signature-box">
                  <label>Parents Signature</label>
                  <div className="signature-area"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback & Suggestions Tab */}
      {activeTab === 'feedback' && (
        <div className="tab-content">
          <div className="profile-section">
            <h3>Feedback History</h3>
            {feedbackList.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', padding: '40px' }}>
                No feedback entries yet.
              </p>
            ) : (
              <div className="feedback-history">
                {feedbackList.map((feedback) => (
                  <div key={feedback.id} className="feedback-card">
                    <div className="feedback-card-header">
                      <span className="feedback-date-badge">{new Date(feedback.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="feedback-card-body">
                      <div className="feedback-entry">
                        <h4>Teachers Feedback:</h4>
                        <p>{feedback.teacherFeedback}</p>
                      </div>
                      {feedback.suggestions && (
                        <div className="feedback-entry">
                          <h4>Suggestions:</h4>
                          <p>{feedback.suggestions}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
