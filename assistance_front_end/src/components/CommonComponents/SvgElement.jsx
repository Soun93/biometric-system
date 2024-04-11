import { getUrlSvgElement } from "../../logic/constUrl";

export const SvgElement = ({svgStyles, svgName, svgEvent}) => {
  const urlSvgElement = getUrlSvgElement(svgName);

  return (
    <svg role='img' className={svgName} style={svgStyles}>
      <use xlinkHref={ urlSvgElement }></use>
    </svg>
  )
}

export default SvgElement;