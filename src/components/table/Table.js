import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions';
import {resizeHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

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
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value));
      this.updateCurrentTextStore(value);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyles(value);
      this.$dispatch(actions.applyStyles({
        value,
        ids: this.selection.selectionIds
      }));
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell.data.value);
    const styles = $cell.getStyle(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    const data = await resizeHandler(event, this.$root);
    this.$dispatch(actions.tableResize(data));
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const group = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup(group);
      } else {
        this.selectCell($target);
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

  updateCurrentTextStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }));
  }

  onInput(event) {
    this.updateCurrentTextStore($(event.target).text());
  }
}
