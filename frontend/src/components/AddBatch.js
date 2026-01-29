import React, { useState } from 'react';
import './AddBatch.css';

const AddBatch = ({ onBack, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="add-batch">
            <div className="add-batch-header">
                <button className="back-button" onClick={onBack}>← Back</button>
                <h2>Add New Batch</h2>
            </div>

            <form onSubmit={handleSubmit} className="add-batch-form">
                <div className="form-section">
                    <h3>Batch Details</h3>
                    <div className="form-group">
                        <label>Batch Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., NEET 2025"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter batch description..."
                            rows="4"
                            required
                        ></textarea>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={onBack}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                        Create Batch
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBatch;
