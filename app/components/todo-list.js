import Component from '@ember/component';
import { computed, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    repo: service(),

    tagName: 'section',
    elementId: 'main',
    canToggle: true,

    allCompleted: computed('todos.@each.completed', function() {
        return this.todos.isEvery('completed');
    }),

    actions: {
        enableToggle() {
            this.set('canToggle', true);
        },

        disableToggle() {
            this.set('canToggle', false);
        },

        toggleAll() {
            const allCompleted = this.allCompleted;
            this.todos.forEach(todo => set(todo, 'completed', !allCompleted));
            this.repo.persist();
        }
    }
});
