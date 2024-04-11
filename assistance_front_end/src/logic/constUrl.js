export const API_URL = 'http://localhost:3000';
const ICONS_URL = '/images/svg-icons/icons.svg#';

export function getUrlSvgElement(iconId) {
  return `${ICONS_URL}${iconId}`;
}