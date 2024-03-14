import '../../styles/CourseCard.css'
import PropTypes from 'prop-types';

export const CourseCard = ({ course, openModal }) => {
  return (
    <>
      <div className='course-card-container'>
        <div className='course-card-header'>
          <span>{course.courseName}</span>
        </div>
        <div className='course-card-body'>
          <div className='course-card-info'>
            <div className='course-info-wrapper'>
              <p>Grupo {course.courseGroup}</p>
              <p>{course.courseRoom}</p>
            </div>
          </div>
          <div className='course-card-button'>
            <button onClick={() => openModal(course)}>Ver más</button>
          </div>
        </div>
      </div>
    </>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    courseName: PropTypes.string,
    courseGroup: PropTypes.string,
    courseRoom: PropTypes.string,
  }),
  openModal: PropTypes.func.isRequired,
};

