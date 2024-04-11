import '../../styles/ThemeButton.css'
import { LIGHT_THEME, DARK_THEME, isLightTheme, updateTheme } from '../../logic/themeContext.js'
import { useTheme } from '../../context/ThemeContext.jsx'
import { SvgElement } from './SvgElement.jsx'

export const ThemeButton = () => {

  const {contextTheme, setContextTheme} = useTheme()
  const isLight = isLightTheme(contextTheme)
  const styles = !isLight ? {width: '50px', height: '50px'}  : {width: '35px', height: '35px'}

  const themeChange = (colorTheme) => {
    setContextTheme(colorTheme);
    updateTheme(colorTheme);
  };

  return (
    <div className='theme-button-div'>
      <button onClick={() => themeChange(isLight ? DARK_THEME : LIGHT_THEME)}>
        <SvgElement svgStyles={styles} svgName={contextTheme}></SvgElement>
      </button>
    </div>
  );
}
