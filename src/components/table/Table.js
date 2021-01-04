import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions';
import {resizeHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  toHtml() {
    return createTable();
  }

  init() {
    super.init();

    this.selection = new TableSelection();
    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$emit('table:select', $(event.target).text());
    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell.text());
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const group = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup(group);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const {key} = event;
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
    ];

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:select', $(event.target).text());
  }
}
