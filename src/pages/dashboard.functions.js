import {storage} from '@core/utils';

function toHtml(key) {
  const model = storage(key);
  const id = key.split('-')[1];
  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.title || ''}</a>
      <strong>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
      </strong>
    </li>
  `;
}

function getRecordsKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (!localStorage.key(i).includes('excel')) {
      continue;
    }
    keys.push(localStorage.key(i));
  }
  return keys;
}

export function createTableRecords() {
  const keys = getRecordsKeys();

  if (!keys.length) {
    return 'Созданных таблиц нет';
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
        ${keys.map(toHtml).join('')}
    </ul>
  `;
}
