import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  dataStyles: {},
  currentText: '',
  title: defaultTitle,
  currentStyles: defaultStyles
};

export const initialState = storage('store') ? storage('store') : defaultState;
