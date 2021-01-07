import {Page} from '@core/Page';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@core/utils';
import {getInitialState} from '@/redux/initialState';

export class ExcelPage extends Page {
  getRoot() {
    const storageName = this.params ? `excel-${this.params}` : 'excel';
    const store = createStore(rootReducer, getInitialState(storageName));

    const storeListener = debounce((state) => {
      storage(storageName, state);
    }, 300);

    store.subscribe(storeListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
