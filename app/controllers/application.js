import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

const ENTER_KEY = 13;

export default Controller.extend({
    repo: service(),

    remaining: filterBy('model', 'completed', false),

    completed: filterBy('model', 'completed', true),

    actions: {
        createTodo(e) {
            const isEnterKey = e.keyCode === ENTER_KEY;
            if (isEnterKey && !isBlank(e.target.value)) {
                this.repo.add({
                    title: e.target.value.trim(),
                    completed: false
                });
                e.target.value = '';
            }
        }
    }
});
