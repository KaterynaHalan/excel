import {Page} from '@core/Page';
import {$} from '@core/dom';
import {createTableRecords} from './dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const param = Date.now().toString();
    return $.create('div', 'dn').html(`
       <div class="db__header">
        <h1>Excel Dashboard</h1>
      </div>
  
      <div class="db__new">
        <div class="db__view">
          <a href="#excel/${param}" class="db__create">
            Новая <br /> Таблица
          </a>
        </div>
      </div>
  
      <div class="db__table db__view">
         ${createTableRecords()}
      </div>
    `);
  }
}
