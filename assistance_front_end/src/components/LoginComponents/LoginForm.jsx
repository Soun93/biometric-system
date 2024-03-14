import { LoginInput } from './LoginInput.jsx'
import { API_URL } from '../../logic/apiConnection.js'
import { useAuth } from '../../auth/AuthProvider.jsx';
import { Navigate } from 'react-router-dom';

export const LoginForm = ({ }) => {
  const auth = useAuth();

  const loginRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value
        })
      });

      // MEJORAR
      if(!response.ok) return;
      const json = (await response.json());
      if (json.token) auth.saveUser(json.token);
    }
    catch(error) {
      console.log(error)
    }
  }

  return auth.isAuthenticated ?  <Navigate to='/home' /> 
  : (
    <form className='login-form' onSubmit={(event) => {loginRequest(event)}}>
        <LoginInput 
          type='text' 
          placeholder='Ingrese su usuario...'
          children='Username'/>
        <LoginInput
          type='password' 
          placeholder='Ingrese su contraseña...'
          children='Password'/>
        <button> Iniciar Sesión </button>
        <div className='options'>
          <div>
            <input type="checkbox" name="recuerdame" id="recuerdame" />
            <label htmlFor="recuerdame">Recuerdame</label>
          </div>
          <div>
            <a href=".">¿Has olvidado tu contraseña?</a>
          </div>
        </div>
    </form>
  );
}

export default LoginForm