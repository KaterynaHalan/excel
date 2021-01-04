import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
  }

  toHtml() {
    return '<div>hello</div>';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
