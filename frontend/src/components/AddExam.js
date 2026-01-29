import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './AddExam.css';

const AddExam = ({ batch, students, onBack, onSave }) => {
  const [examMode, setExamMode] = useState('manual'); // 'manual' or 'excel'
  const [examData, setExamData] = useState({
    examName: '',
    examDate: '',
    subject: '',
    totalMarks: '',
    examType: ''
  });

  // Initialize marks for all students
  const [studentMarks, setStudentMarks] = useState(
    students.map(student => ({
      id: student.id,
      name: student.name,
      rollNo: student.rollNo,
      marks: ''
    }))
  );

  const handleExamDataChange = (e) => {
    const { name, value } = e.target;
    setExamData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMarksChange = (studentId, value) => {
    setStudentMarks(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, marks: value } : student
      )
    );
  };

  const handleDownloadFormat = () => {
    // Create Excel format data
    const headers = ['Admission Number', 'Student Name', 'Marks (out of ' + examData.totalMarks + ')'];
    const rows = students.map(student => [student.rollNo, student.name, '']);

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Marks');

    // Download
    XLSX.writeFile(wb, `${examData.examName || 'exam'}_marks_format.xlsx`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          let data;
          const fileName = file.name.toLowerCase();

          if (fileName.endsWith('.csv')) {
            // Handle CSV files
            const text = event.target.result;
            const rows = text.split('\n').slice(1); // Skip header

            const updatedMarks = studentMarks.map(student => {
              const row = rows.find(r => r.startsWith(student.rollNo));
              if (row) {
                const marks = row.split(',')[2]?.trim();
                return { ...student, marks: marks || '' };
              }
              return student;
            });

            setStudentMarks(updatedMarks);
          } else {
            // Handle Excel files (.xlsx, .xls)
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            // Skip header row
            const rows = jsonData.slice(1);

            const updatedMarks = studentMarks.map(student => {
              const row = rows.find(r => r[0] === student.rollNo);
              if (row) {
                const marks = row[2]?.toString().trim();
                return { ...student, marks: marks || '' };
              }
              return student;
            });

            setStudentMarks(updatedMarks);
          }

          alert('Marks uploaded successfully!');
        } catch (error) {
          alert('Error reading file. Please check the format and try again.');
          console.error('File upload error:', error);
        }
      };

      // Read file based on type
      if (file.name.toLowerCase().endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (!examData.examName || !examData.examDate || !examData.subject || !examData.totalMarks) {
      alert('Please fill all exam details');
      return;
    }

    const hasEmptyMarks = studentMarks.some(student => student.marks === '');
    if (hasEmptyMarks) {
      if (!window.confirm('Some students have no marks entered. Continue anyway?')) {
        return;
      }
    }

    const examResult = {
      ...examData,
      studentMarks: studentMarks
    };

    onSave(examResult);
    alert('Exam marks saved successfully!');
    onBack();
  };

  return (
    <div className="add-exam">
      <div className="add-exam-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Add New Exam - {batch.name}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Exam Details Section */}
        <div className="form-section">
          <h3>Exam Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Exam Name *</label>
              <input
                type="text"
                name="examName"
                value={examData.examName}
                onChange={handleExamDataChange}
                placeholder="e.g., Mid Term 1"
                required
              />
            </div>

            <div className="form-group">
              <label>Exam Date *</label>
              <input
                type="date"
                name="examDate"
                value={examData.examDate}
                onChange={handleExamDataChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={examData.subject}
                onChange={handleExamDataChange}
                placeholder="e.g., Physics"
                required
              />
            </div>

            <div className="form-group">
              <label>Total Marks *</label>
              <input
                type="number"
                name="totalMarks"
                value={examData.totalMarks}
                onChange={handleExamDataChange}
                placeholder="e.g., 100"
                required
              />
            </div>

            <div className="form-group">
              <label>Exam Type</label>
              <select
                name="examType"
                value={examData.examType}
                onChange={handleExamDataChange}
              >
                <option value="">Select Type</option>
                <option value="Daily Test">Daily Test</option>
                <option value="Mock Test">Mock Test</option>
                <option value="Mid Term">Mid Term</option>
                <option value="Final Exam">Final Exam</option>
              </select>
            </div>
          </div>
        </div>

        {/* Entry Mode Selection */}
        <div className="form-section">
          <h3>Marks Entry Mode</h3>
          <div className="mode-selector">
            <button
              type="button"
              className={`mode-btn ${examMode === 'manual' ? 'active' : ''}`}
              onClick={() => setExamMode('manual')}
            >
              ✏️ Manual Entry
            </button>
            <button
              type="button"
              className={`mode-btn ${examMode === 'excel' ? 'active' : ''}`}
              onClick={() => setExamMode('excel')}
            >
              📊 Excel Upload
            </button>
          </div>
        </div>

        {/* Manual Entry Mode */}
        {examMode === 'manual' && (
          <div className="form-section">
            <h3>Enter Marks for Students</h3>
            <div className="marks-entry-table">
              <table>
                <thead>
                  <tr>
                    <th>Admission Number</th>
                    <th>Student Name</th>
                    <th>Marks (out of {examData.totalMarks || '___'})</th>
                  </tr>
                </thead>
                <tbody>
                  {studentMarks.map(student => (
                    <tr key={student.id}>
                      <td>{student.rollNo}</td>
                      <td>{student.name}</td>
                      <td>
                        <input
                          type="number"
                          value={student.marks}
                          onChange={(e) => handleMarksChange(student.id, e.target.value)}
                          min="0"
                          max={examData.totalMarks || 100}
                          placeholder="Enter marks"
                          className="marks-input"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Excel Upload Mode */}
        {examMode === 'excel' && (
          <div className="form-section">
            <h3>Excel Upload</h3>
            <div className="excel-upload-section">
              <p className="instruction">
                Download the Excel format, fill in the marks, and upload the completed file.
              </p>

              <div className="upload-steps">
                <div className="step">
                  <span className="step-number">1</span>
                  <button
                    type="button"
                    className="btn-download"
                    onClick={handleDownloadFormat}
                    disabled={!examData.examName || !examData.totalMarks}
                  >
                    📥 Download Excel Format
                  </button>
                  {(!examData.examName || !examData.totalMarks) && (
                    <small className="note">Fill exam details first</small>
                  )}
                </div>

                <div className="step">
                  <span className="step-number">2</span>
                  <div className="file-upload">
                    <input
                      type="file"
                      id="excelFile"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="excelFile" className="upload-label">
                      📤 Upload Completed Excel
                    </label>
                  </div>
                </div>
              </div>

              {/* Preview uploaded data */}
              <div className="preview-section">
                <h4>Preview Data</h4>
                <div className="marks-entry-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Admission Number</th>
                        <th>Student Name</th>
                        <th>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentMarks.map(student => (
                        <tr key={student.id}>
                          <td>{student.rollNo}</td>
                          <td>{student.name}</td>
                          <td>{student.marks || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onBack}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Save Exam Marks
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExam;
