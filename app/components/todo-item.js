import Component from '@ember/component';
import { set } from '@ember/object';
import { isBlank } from '@ember/utils';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export default Component.extend({
    repo: service(),
    tagName: 'li',
    editing: false,

    classNameBindings: ['todo.completed', 'editing'],

    actions: {
        startEditing() {
            this.onStartEdit();
            this.set('editing', true);
            scheduleOnce('afterRender', this, 'focusInput');
        },

        doneEditing(todoTitle) {
            if (!this.editing) return;

            if (isBlank(todoTitle)) {
                this.send('removeTodo');
            } else {
                this.set('todo.title', todoTitle.trim());
                this.set('editing', false);
                this.onEndEdit();
            }
        },

        handleKeydown(e) {
            if (e.keyCode === ENTER_KEY) {
                e.target.blur();
            } else if (e.keyCode === ESCAPE_KEY) {
                this.set('editing', false);
            }
        },

        toggleCompleted(e) {
            const todo = this.todo;
            set(todo, 'completed', e.target.checked);
            this.repo.persist();
        },

        removeTodo() {
            this.repo.delete(this.todo);
        }
    },

    focusInput() {
        this.element.querySelector('input.edit').focus();
    }
});
