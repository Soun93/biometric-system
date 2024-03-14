export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

export const getLocalStorage = (nombreItem, parse) => {
  const itemLocalStorage = window.localStorage.getItem(nombreItem);
  return parse ? JSON.parse(itemLocalStorage) : itemLocalStorage;
}

export const isLightTheme = (dataTheme) => {
  return dataTheme == LIGHT_THEME
}

export const updateTheme = (dataTheme) => {
  document.body.setAttribute('data-theme',  dataTheme);
  window.localStorage.setItem('Theme', dataTheme);
}
