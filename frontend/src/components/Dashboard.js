import React, { useState } from 'react';
import CourseCard from './CourseCard';
import BatchDetail from './BatchDetail';
import AddBatch from './AddBatch';
import AnalysisDashboard from './AnalysisDashboard';
import AchieversSection from './AchieversSection';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [showAddBatch, setShowAddBatch] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showAchievers, setShowAchievers] = useState(false);

  const [batches, setBatches] = useState([
    {
      id: 1,
      name: 'Neet Batch',
      description: 'Comprehensive NEET preparation program',
      year: '2024-2025'
    },
    {
      id: 2,
      name: 'Jee Batch',
      description: 'Complete JEE Main & Advanced preparation',
      year: '2024-2025'
    },
    {
      id: 3,
      name: '6th to 10th foundation Batch',
      description: 'Foundation course for students from 6th to 10th grade',
      year: '2023-2024'
    }
  ]);

  const handleBatchClick = (batch) => {
    setSelectedBatch(batch);
  };

  const handleBackToBatches = () => {
    setSelectedBatch(null);
  };

  const handleAddBatch = () => {
    setShowAddBatch(true);
  };

  const handleBackFromAddBatch = () => {
    setShowAddBatch(false);
  };

  const handleSaveBatch = (batchData) => {
    const newBatch = {
      id: batches.length + 1,
      ...batchData,
      year: selectedYear // Assign to currently selected year or let user choose (for now using selected view year)
    };
    setBatches([...batches, newBatch]);
    setShowAddBatch(false);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredBatches = batches.filter(batch => {
    return batch.year === selectedYear;
  });

  const years = ['2023-2024', '2024-2025', '2025-2026'];

  if (showAddBatch) {
    return <AddBatch onBack={handleBackFromAddBatch} onSave={handleSaveBatch} />;
  }

  if (showAnalysis) {
    return <AnalysisDashboard onBack={() => setShowAnalysis(false)} />;
  }

  if (showAchievers) {
    return <AchieversSection onBack={() => setShowAchievers(false)} />;
  }

  if (selectedBatch) {
    return <BatchDetail batch={selectedBatch} onBack={handleBackToBatches} />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="breadcrumb">HOME</div>
      </div>

      <div className="filter-section">
        <div className="filter-container">
          <button className="filter-button" onClick={toggleFilters}>
            {showFilters ? '▲ Hide Filters' : '▼ Show Filters'}
          </button>
          {showFilters && (
            <div className="filter-options">
              <div className="filter-group">
                <label>Academic Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn-achievers" onClick={() => setShowAchievers(true)}>🌟 Achievers</button>
          <button className="btn-analysis" onClick={() => setShowAnalysis(true)}>📊 Analysis</button>
          <button className="btn-add-batch" onClick={handleAddBatch}>+ Add Batch</button>
        </div>
      </div>

      <div className="courses-grid">
        {filteredBatches.map((batch) => (
          <div key={batch.id} onClick={() => handleBatchClick(batch)}>
            <CourseCard course={batch} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
