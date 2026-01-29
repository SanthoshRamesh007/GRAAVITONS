import React from 'react';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <h3 className="course-title">{course.name}</h3>
      {course.description && (
        <p className="course-description">{course.description}</p>
      )}
    </div>
  );
};

export default CourseCard;
