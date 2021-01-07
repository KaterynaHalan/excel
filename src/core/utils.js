export const capitalized = (string) => {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const range = (start, end) => {
  if (start > end) {
    [start, end] = [end, start];
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index);
};

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  return localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelCaseToDashCase(str) {
  return str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelCaseToDashCase(key)}: ${styles[key]}`)
      .join(';');
}

export function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function preventDefault(event) {
  event.preventDefault();
}
