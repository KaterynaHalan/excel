import {clone, storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  dataStyles: {},
  currentText: '',
  title: defaultTitle,
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON()
};

export function getInitialState(key) {
  return storage(key) ? storage(key) : clone(defaultState);
}
