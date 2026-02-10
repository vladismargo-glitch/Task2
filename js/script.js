new Vue({
    el: '#app',
    data: {
        title: '',
        items: ['', '', '', '', ''],

        column1: [],
        column2: [],
        column3: []
    },
    computed: {
        canAdd() {
            const filledItems = this.items.filter(i => i.trim() !== '').length;
            return this.title.trim() !== '' && filledItems >= 3 && filledItems <= 5;
        }
    },
    methods: {
        addCard() {
            if (!this.canAdd) return;

            const validTodos = this.items
                .filter(i => i.trim() !== '')
                .map(text => ({
                    text: text,
                    done: false
                }));

            const newCard = {
                id: Date.now(),
                title: this.title,
                todos: validTodos,
                completedAt: null
            };

            this.column1.push(newCard);

            this.title = '';
            this.items = ['', '', '', '', ''];
        }
    }
});