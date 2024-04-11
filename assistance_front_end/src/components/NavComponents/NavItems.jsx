import SvgElement from '../CommonComponents/SvgElement.jsx';

export const NavItems = ({ children }) => {
  const svgName = children.toLowerCase().trim();
  const itemStyles = {
    stroke: 'var(--font-color)',
    fill: 'none',
    width: '70%',
  }

  return (
    <li className="nav-item">
      <div className="nav-item-image">
        <SvgElement svgStyles={itemStyles} svgName={svgName} />
      </div>
      <span>{children}</span>
    </li>
  );
}