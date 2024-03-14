// COMPONENTS
import { Nav } from '../NavComponents/Nav.jsx'
import { UserInfo } from './UserInfo.jsx'
import { CourseModal } from './CourseModal.jsx';
import { CourseCard } from './CourseCard.jsx'
import { useState } from 'react';

//STYLES
import '../../styles/HomePage.css'

const coursesList = [
  {
    id: 1,
    courseName: 'Programación Lógica',
    courseRoom: 'B107',
    courseGroup: '1'
  },
  {
    id: 2,
    courseName: 'Introducción al taller',
    courseRoom: 'A107',
    courseGroup: '2'
  },
  {
    id: 3,
    courseName: 'Programación Web',
    courseRoom: 'D105',
    courseGroup: '2'
  },
  {
    id: 4,
    courseName: 'Programación Web',
    courseRoom: 'D105',
    courseGroup: '2'
  },
  {
    id: 5,
    courseName: 'Programación Web',
    courseRoom: 'D105',
    courseGroup: '2'
  }
]

export function HomePage() {
  let userName = 'Jean Ocampo';
  const [courseInformation, setCourseInformation] = useState(null);
  const openModal = (courseInfo) => {
    setCourseInformation(courseInfo);
  }

  const closeModal = () => {
    setCourseInformation(null)
  }

  return (
    <>
      <Nav/>

      <div className='home-page-container main-content'>
        <div className='home-page-content'>

          <div className='home-page-header'>
            <div className='welcome-message'>
              <h1> <span className='hello-message'> Welcome to our website! </span> {userName} </h1>
            </div>
            <UserInfo 
              userName={userName} 
              userTitle={'Ing. Cibernetico Electrónico'}
              userSrc={'https://github.com/juansobalvarro.png'}/>
          </div>

          <div className='home-page-body'>
            {coursesList.map((course) => (
              <CourseCard
                key={course.id}
                course={course} 
                openModal={openModal}
              />
            ))}
          </div>
        </div>
      </div>
      {courseInformation && <CourseModal courseInformation={courseInformation} closeModal={closeModal}></CourseModal>}
    </>
  
  )
}

export default HomePage;
