import React, { useState } from 'react';
import './AddStudent.css';

const AddStudent = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    rollNo: '',
    name: '',
    dob: '',
    grade: '',
    community: '',
    academicYear: '',
    course: '',
    branch: '',
    studentMobile: '',
    aadharNumber: '',
    aasarId: '',
    emailId: '',
    gender: '',

    // School & Family Details
    schoolName: '',
    fatherName: '',
    fatherOccupation: '',
    fatherContact: '',
    fatherEmail: '',
    motherName: '',
    motherOccupation: '',
    motherContact: '',
    motherEmail: '',
    siblingName: '',
    siblingGrade: '',
    siblingSchool: '',

    // 10th Standard Details
    std10: {
      schoolName: '',
      passingYear: '',
      board: '',
      marks: {
        english: '',
        tamil: '',
        maths: '',
        science: '',
        social: '',
        total: ''
      }
    },

    // 12th Standard Details
    std12: {
      schoolName: '',
      passingYear: '',
      board: '',
      marks: {
        english: '',
        physics: '',
        chemistry: '',
        maths: '',
        biology: '',
        computer: '',
        total: ''
      }
    },

    // Entrance Exams (Array)
    entranceExams: [],

    // Counselling Details
    counselling: {
      forum: '',
      round: '',
      college: '',
      completionYear: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleMarksChange = (section, subject, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        marks: {
          ...prev[section].marks,
          [subject]: value
        }
      }
    }));
  };

  // Entrance Exam Handlers
  const handleAddExam = () => {
    const newExam = {
      exam: 'NEET',
      year: '',
      scores: {
        communication: '',
        physics: '',
        chemistry: '',
        biology: '',
        maths: '',
        other: '',
        total: ''
      },
      rank: '',
      communityRank: ''
    };
    setFormData(prev => ({
      ...prev,
      entranceExams: [...prev.entranceExams, newExam]
    }));
  };

  const handleRemoveExam = (index) => {
    setFormData(prev => ({
      ...prev,
      entranceExams: prev.entranceExams.filter((_, i) => i !== index)
    }));
  };

  const handleExamChange = (index, field, value) => {
    const updatedExams = [...formData.entranceExams];
    updatedExams[index][field] = value;
    setFormData(prev => ({ ...prev, entranceExams: updatedExams }));
  };

  const handleExamScoreChange = (index, subject, value) => {
    const updatedExams = [...formData.entranceExams];
    updatedExams[index].scores[subject] = value;
    setFormData(prev => ({ ...prev, entranceExams: updatedExams }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Form Data:', formData);
    onSave(formData);
    alert('Student added successfully!');
    onBack();
  };

  return (
    <div className="add-student">
      <div className="add-student-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Add New Student</h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Admission Number *</label>
              <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required placeholder="e.g., 2024001" />
            </div>
            <div className="form-group">
              <label>Student Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Date of Birth *</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Grade *</label>
              <input type="text" name="grade" value={formData.grade} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Gender *</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Community</label>
              <input type="text" name="community" value={formData.community} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Academic Year *</label>
              <input type="text" name="academicYear" value={formData.academicYear} onChange={handleChange} placeholder="e.g., 2024-2025" required />
            </div>
            <div className="form-group">
              <label>Course *</label>
              <input type="text" name="course" value={formData.course} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Branch</label>
              <input type="text" name="branch" value={formData.branch} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Student Mobile Number</label>
              <input type="tel" name="studentMobile" value={formData.studentMobile} onChange={handleChange} placeholder="+91 XXXXXXXXXX" />
            </div>
            <div className="form-group">
              <label>Aadhar Number</label>
              <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} placeholder="XXXX-XXXX-XXXX" />
            </div>
            <div className="form-group">
              <label>Aasar ID</label>
              <input type="text" name="aasarId" value={formData.aasarId} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email ID</label>
              <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} />
            </div>

            {/* Student Photo Upload */}
            <div className="form-group">
              <label>Student Photo</label>
              <div className="photo-upload">
                <input type="file" accept="image/*" id="studentPhoto" />
                <label htmlFor="studentPhoto" className="upload-label">
                  📷 Upload Photo
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* School & Family Details */}
        <div className="form-section">
          <h3>School & Family Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>School Name *</label>
              <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Father Name *</label>
              <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Father Occupation</label>
              <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Father Contact *</label>
              <input type="tel" name="fatherContact" value={formData.fatherContact} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Father Email</label>
              <input type="email" name="fatherEmail" value={formData.fatherEmail} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Mother Name *</label>
              <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Mother Occupation</label>
              <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Mother Contact *</label>
              <input type="tel" name="motherContact" value={formData.motherContact} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Mother Email</label>
              <input type="email" name="motherEmail" value={formData.motherEmail} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Sibling Name</label>
              <input type="text" name="siblingName" value={formData.siblingName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Sibling Grade/Degree</label>
              <input type="text" name="siblingGrade" value={formData.siblingGrade} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Sibling School/College</label>
              <input type="text" name="siblingSchool" value={formData.siblingSchool} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* 10th Standard Details */}
        <div className="form-section">
          <h3>10th Standard Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>School Name</label>
              <input type="text" value={formData.std10.schoolName} onChange={(e) => handleNestedChange('std10', 'schoolName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Year of Passing</label>
              <input type="text" value={formData.std10.passingYear} onChange={(e) => handleNestedChange('std10', 'passingYear', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Board of Study</label>
              <input type="text" value={formData.std10.board} onChange={(e) => handleNestedChange('std10', 'board', e.target.value)} />
            </div>
          </div>

          <div className="marks-section">
            <h4>Marks Reached</h4>
            <div className="marks-grid">
              <div className="form-group">
                <label>English</label>
                <input type="number" value={formData.std10.marks.english} onChange={(e) => handleMarksChange('std10', 'english', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Tamil</label>
                <input type="number" value={formData.std10.marks.tamil} onChange={(e) => handleMarksChange('std10', 'tamil', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Maths</label>
                <input type="number" value={formData.std10.marks.maths} onChange={(e) => handleMarksChange('std10', 'maths', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Science</label>
                <input type="number" value={formData.std10.marks.science} onChange={(e) => handleMarksChange('std10', 'science', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Social Sci</label>
                <input type="number" value={formData.std10.marks.social} onChange={(e) => handleMarksChange('std10', 'social', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Total</label>
                <input type="number" value={formData.std10.marks.total} onChange={(e) => handleMarksChange('std10', 'total', e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* 12th Standard Details */}
        <div className="form-section">
          <h3>12th Standard Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>School Name</label>
              <input type="text" value={formData.std12.schoolName} onChange={(e) => handleNestedChange('std12', 'schoolName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Year of Passing</label>
              <input type="text" value={formData.std12.passingYear} onChange={(e) => handleNestedChange('std12', 'passingYear', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Board of Study</label>
              <input type="text" value={formData.std12.board} onChange={(e) => handleNestedChange('std12', 'board', e.target.value)} />
            </div>
          </div>

          <div className="marks-section">
            <h4>Marks Reached</h4>
            <div className="marks-grid">
              <div className="form-group">
                <label>English</label>
                <input type="number" value={formData.std12.marks.english} onChange={(e) => handleMarksChange('std12', 'english', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Physics</label>
                <input type="number" value={formData.std12.marks.physics} onChange={(e) => handleMarksChange('std12', 'physics', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Chemistry</label>
                <input type="number" value={formData.std12.marks.chemistry} onChange={(e) => handleMarksChange('std12', 'chemistry', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Maths</label>
                <input type="number" value={formData.std12.marks.maths} onChange={(e) => handleMarksChange('std12', 'maths', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Biology</label>
                <input type="number" value={formData.std12.marks.biology} onChange={(e) => handleMarksChange('std12', 'biology', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Comp. Sci</label>
                <input type="number" value={formData.std12.marks.computer} onChange={(e) => handleMarksChange('std12', 'computer', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Total</label>
                <input type="number" value={formData.std12.marks.total} onChange={(e) => handleMarksChange('std12', 'total', e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Entrance Exam Marks */}
        <div className="form-section">
          <h3>Entrance Exam Marks</h3>
          <button type="button" className="btn-add-exam" onClick={handleAddExam}>
            + Add Attempt
          </button>

          {formData.entranceExams.map((exam, index) => (
            <div key={index} className="exam-card">
              <div className="exam-card-header">
                <h4>Attempt {index + 1}</h4>
                <button type="button" className="btn-remove-exam" onClick={() => handleRemoveExam(index)}>
                  Remove
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Exam Name</label>
                  <select
                    value={exam.exam}
                    onChange={(e) => handleExamChange(index, 'exam', e.target.value)}
                  >
                    <option value="JEE Main - Phase 1">JEE Main - Phase 1</option>
                    <option value="JEE Main - Phase 2">JEE Main - Phase 2</option>
                    <option value="JEE Advanced">JEE Advanced</option>
                    <option value="NEET">NEET</option>
                    <option value="CUET">CUET</option>
                    <option value="IISER">IISER</option>
                    <option value="NISER">NISER</option>
                    <option value="ICAR">ICAR</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Year of Passing</label>
                  <input type="text" value={exam.year} onChange={(e) => handleExamChange(index, 'year', e.target.value)} />
                </div>
              </div>

              <div className="marks-grid">
                <div className="form-group">
                  <label>Physics</label>
                  <input type="number" value={exam.scores.physics} onChange={(e) => handleExamScoreChange(index, 'physics', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Chemistry</label>
                  <input type="number" value={exam.scores.chemistry} onChange={(e) => handleExamScoreChange(index, 'chemistry', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Biology</label>
                  <input type="number" value={exam.scores.biology} onChange={(e) => handleExamScoreChange(index, 'biology', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Maths</label>
                  <input type="number" value={exam.scores.maths} onChange={(e) => handleExamScoreChange(index, 'maths', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Total Score</label>
                  <input type="number" value={exam.scores.total} onChange={(e) => handleExamScoreChange(index, 'total', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Overall Rank</label>
                  <input type="text" value={exam.rank} onChange={(e) => handleExamChange(index, 'rank', e.target.value)} />
                </div>
              </div>
            </div>
          ))}

          {formData.entranceExams.length === 0 && (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No attempts added yet. Click "+ Add Attempt" to add exam details.</p>
          )}
        </div>

        {/* Counselling Details */}
        <div className="form-section">
          <h3>Counselling Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Proposed/Completed Forum</label>
              <input type="text" value={formData.counselling.forum} onChange={(e) => handleNestedChange('counselling', 'forum', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Round</label>
              <input type="text" value={formData.counselling.round} onChange={(e) => handleNestedChange('counselling', 'round', e.target.value)} />
            </div>
            <div className="form-group">
              <label>College Allotted</label>
              <input type="text" value={formData.counselling.college} onChange={(e) => handleNestedChange('counselling', 'college', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Year of Completion</label>
              <input type="text" value={formData.counselling.completionYear} onChange={(e) => handleNestedChange('counselling', 'completionYear', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onBack}>Cancel</button>
          <button type="submit" className="btn-submit">Add Student</button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
