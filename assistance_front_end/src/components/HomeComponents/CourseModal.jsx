import '../../styles/CourseModal.css'
import PropTypes from 'prop-types';

export const CourseModal = ({courseInformation, closeModal}) => {
  const styles = {
    display: courseInformation ? 'grid' : 'none'
  }
  return (
    <div className='modal-course-container' style={styles}>
      <div className='modal-course-card'>
        <div className='modal-course-header'>
          <h3>{courseInformation.courseName}</h3>
          <button onClick={closeModal}>X</button>
        </div>
        <div className='modal-course-options'>
          <span>
            <label htmlFor="search-box">
              <svg viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.6034 22.0612C33.0703 29.6034 25.6329 34.4909 17.9916 32.9776C10.3502 31.4644 5.39853 24.1236 6.93165 16.5814C8.46476 9.0392 15.9021 4.15176 23.5435 5.66499C31.1848 7.17821 36.1365 14.5191 34.6034 22.0612ZM37.6196 22.6585C35.7522 31.8449 26.6935 37.7978 17.3864 35.9547C14.8229 35.4471 12.5079 34.4009 10.5381 32.9595L4.44602 39.4586C3.86911 40.0741 2.89593 40.1114 2.27238 39.542C1.64882 38.9725 1.61101 38.012 2.18793 37.3965L8.24072 30.9393C4.56808 27.0749 2.77897 21.5749 3.91543 15.9841C5.78277 6.79771 14.8415 0.844808 24.1486 2.68791C33.4558 4.53101 39.4869 13.4722 37.6196 22.6585Z" />
              </svg>
            </label>
            <input type='text' id='search-box'placeholder='Nombre del Alumno...' />
          </span>
        </div>
        <div className='modal-course-body'>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th className='modal-optional-info'>Carnet</th>
                <th className='modal-optional-info'>Entrada</th>
                <th className='modal-optional-info'>Salida</th>
                <th>Asistencia</th>
              </tr>
            </thead>
            <tbody>
        {[0,1,2,3,4].map((index) => (
        <tr key={index}>
          <td>Jean Manuel Ocampo Aragón</td>
          <td className='modal-optional-info'>ACA01-1220-12</td>
          <td className='modal-optional-info'>10 am</td>
          <td className='modal-optional-info'>12 pm </td>
          <td>Check</td>
        </tr>

        ))}


            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

CourseModal.propTypes = {
  courseInformation: PropTypes.shape({
    courseName: PropTypes.string,
    courseGroup: PropTypes.string,
    courseRoom: PropTypes.string,
  }),
  closeModal: PropTypes.func.isRequired,
};
