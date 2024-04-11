import '../../styles/UserCard.css'
import SvgElement from '../CommonComponents/SvgElement'
export const UserCard = ( { userName, userTitle, userSrc} ) => {

  return (
    <>
      <div className="user-card-container">
          <div className='user-card-body'>
            <div className='user-card-image'>
              <img src={userSrc} alt="user icon" />
            </div>
            <div className='user-card-info'>
              <div>
                <span>{userName}</span>
                <p>{userTitle}</p>
                <p>10 de Dic. 23</p>
                <p className='logout'>
                  Logout
                  {/* <SvgElement svgName='logout'></SvgElement> */}
                </p>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

