import '../../styles/LoginPage.css'

import { LoginForm } from './LoginForm.jsx'
import { ThemeButton } from '../CommonComponents/ThemeButton.jsx'
import { Carousel } from '../CommonComponents/CarouselComponent/Carousel.jsx'

export function LoginPage() {

  return (
    <div className='login-main'>
      <ThemeButton />
      <div className='login-card'>
        <div className='container login-body'>
          <div className='welcome-message'>
            <h2>Hello Again!</h2>
            <p>Welcome back you've been missed!</p>
          </div>
          <LoginForm />
        </div>
        <div className='container'>
            <Carousel />
        </div>
      </div>
    </div>
  )
}

export default LoginPage;