import { useTheme } from '../../context/ThemeContext.jsx'

export const NavItems = ({ children }) => {
  const { contextTheme } = useTheme()
  let url = '/images/nav-images/nav-svg.svg#' + children.toLowerCase().trim();

  const styles = {
    stroke: 'var(--font-color)',
    fill: 'none',
    width: '70%',
    height: '70%'
  }

  return (
    <li className="nav-item">
      <div className="nav-item-image" >
        <svg role='img' style={styles}>
          <use xlinkHref={url}></use>
        </svg>
      </div>
      <span>{children}</span>
    </li>
  );
}