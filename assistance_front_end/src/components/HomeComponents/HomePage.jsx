// COMPONENTS
import { Nav } from '../NavComponents/Nav.jsx'
import { UserCard } from './UserCard.jsx'
import { CourseModal } from './CourseModal.jsx';
import { CourseCard } from './CourseCard.jsx'
import { useState } from 'react';

//STYLES
import '../../styles/HomePage.css'
import CameraButton from '../CameraComponent/CameraButton.jsx';

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
  const [courseInfo, setCourseInfo] = useState(null);
  const [showNav, setShowNav] = useState({
    opacity: '1'
  })

  const openModal = (courseInfo) => {
    setShowNav({
      opacity: '0.1'
    });
    setCourseInfo(courseInfo);
  }

  const closeModal = () => {
    setShowNav({
      opacity: '1'
    });
    setCourseInfo(null)
  }

  return (
    <>
      <Nav opacity={showNav} />

      <div className='home-page-container main-content'>
        <div className='home-page-content'>
          <div className='home-page-header'>
            <div className='welcome-message'>
              <h2 className='destacable-message' > Welcome to our website! </h2>
              <span> {userName} <CameraButton /></span>
            </div>
            <UserCard 
              userName={userName} 
              userTitle={'Ing. Cibernetico Electrónico'}
              userSrc={'https://github.com/soun93.png'}/>
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
      {courseInfo && <CourseModal courseInfo={courseInfo} closeModal={closeModal}></CourseModal>}
    </>
  
  )
}

export default HomePage;
