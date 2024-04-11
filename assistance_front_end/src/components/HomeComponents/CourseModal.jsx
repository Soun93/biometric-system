import { useState } from 'react';
import '../../styles/CourseModal.css'
import PropTypes from 'prop-types';
import { getUrlSvgElement } from '../../logic/constUrl';
import SvgElement from '../CommonComponents/SvgElement';

let studentList = [
  {
    id: 1,
    student_name: 'Jean Manuel Ocampo Aragón',
    student_carnet: 'ACA01-1220-12',
    entry_time: '10 am',
    exit_time: '12 pm',
    assitance: 'Check'
  },
  {
    id: 2,
    student_name: 'Tomas Enmanuel Palacios Gallo',
    student_carnet: 'ACA01-1220-12',
    entry_time: '10 am',
    exit_time: '12 pm',
    assitance: 'Check'
  },
  {
    id: 3,
    student_name: 'Roxana Raquel Vanegas',
    student_carnet: 'ACA01-1220-12',
    entry_time: '10 am',
    exit_time: '12 pm',
    assitance: 'Check'
  },  
  {
    id: 4,
    student_name: 'Jesús de León Ocampo Aragón',
    student_carnet: 'ACA01-1220-12',
    entry_time: '10 am',
    exit_time: '12 pm',
    assitance: 'Check'
  },
]

export const CourseModal = ({courseInfo, closeModal}) => {
  const [assistanceList, setAssitanceList] = useState(studentList);

  const styles = {
    display: courseInfo ? 'grid' : 'none'
  }

  const filterByName = (event) => {
    const input = event.target.value.toLowerCase();
    const NewStudentList = studentList.filter( student => student.student_name.toLowerCase().includes(input));
    setAssitanceList(NewStudentList);
  }
  const buttonStyle = {
    stroke: 'var(--font-color)',
    fill: 'none',
    width: '80%',
    height: '40px',
    'stroke-width': '4px'
  }

  return (
    <div className='modal-course-container' style={styles}>
      <div className='modal-course-card'>
        <div className='modal-course-header'>
          <h3>{courseInfo.courseName}</h3>
          <button onClick={closeModal}>X</button>
        </div>
        <div className='modal-course-options'>
          <span>
            <label htmlFor="search-box">
              <SvgElement svgName='lens' svgStyles={buttonStyle}></SvgElement>
            </label>
            <input type='text' id='search-box' placeholder='Nombre del Alumno...' onChange={(event) => filterByName(event)} />
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
        {assistanceList.map(({id, student_name, student_carnet, entry_time, exit_time, assitance}) => (
        <tr key={id}>
          <td>{student_name}</td>
          <td className='modal-optional-info'>{student_carnet}</td>
          <td className='modal-optional-info'>{entry_time}</td>
          <td className='modal-optional-info'>{exit_time}</td>
          <td>{assitance}</td>
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
  courseInfo: PropTypes.shape({
    courseName: PropTypes.string,
    courseGroup: PropTypes.string,
    courseRoom: PropTypes.string,
  }),
  closeModal: PropTypes.func.isRequired,
};
