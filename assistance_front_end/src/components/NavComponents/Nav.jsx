import '../../styles/Nav.css'
import { NavItems } from './NavItems.jsx'
import { ThemeButton } from '../CommonComponents/ThemeButton.jsx'

export function Nav({ opacity }) {

  return (
    <nav style={ opacity }>
      <div className="nav-container">
        <div className='nav-header'>
        </div>
        <div className="nav-menu">
          <ul>
            <NavItems> Home </NavItems>
            <NavItems> Perfil </NavItems>
            <NavItems> Contactos </NavItems>
            <NavItems> Horarios </NavItems>
            <NavItems> Configuracion </NavItems>
          </ul>
        </div>
      <ThemeButton />
    </div>
    </nav>
  )
}

export default Nav
