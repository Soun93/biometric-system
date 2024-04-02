import '../../styles/ThemeButton.css'
import { LIGHT_THEME, DARK_THEME, isLightTheme, updateTheme } from '../../logic/themeContext.js'
import { useTheme } from '../../context/ThemeContext.jsx'

export const ThemeButton = () => {

  const {contextTheme, setContextTheme} = useTheme()
  const isLight = isLightTheme(contextTheme)
  const url = '/images/theme-images/themes-svg.svg#' + contextTheme;
  const styles = !isLight ? {width: '50px', height: '50px'}  : {width: '35px', height: '35px'}

  const themeChange = (colorTheme) => {
    setContextTheme(colorTheme);
    updateTheme(colorTheme);
    window.open('http://localhost:5173/camera', '_blank','width=600,height=400')
  };

  return (
    <div className='theme-button-div'>
      <button onClick={() => themeChange(isLight ? DARK_THEME : LIGHT_THEME)}>
        <svg role='img' style={styles}>
          <use xlinkHref={url}></use>
        </svg>
      </button>
    </div>
  );
}
