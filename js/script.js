new Vue({
    el: '#app',
    data: {
        title: '',
        items: ['', '', '', '', ''],
        column1: [],
        column2: [],
        column3: [],
        colums: JSON.parse(localStorage.getItem('notes-app-data')) || [[],[], []]
    },
    computed: {
        canAdd() {
            const filled = this.items.filter(i => i.trim() !== '').length;
            return this.title.trim() !== '' && filled >= 3;
        }
    },
    watch: {
        colums: {
            handler(newColums) {
                localStorage.setItem('notes-app-data', JSON.stringify (newColums));
            },
            deep: true
        }
    },
    methods: {
        addCard() {
            if (!this.canAdd) return;
            const validTodos = this.items
                .filter(i => i.trim() !== '')
                .map(text => ({ text: text, done: false }));

            this.column1.push({
                id: Date.now(),
                title: this.title,
                todos: validTodos,
                completedAt: null
            });
            this.title = '';
            this.items = ['', '', '', '', ''];
        },

        checkMove(colNum, index) {
            if (colNum === 1) {
                const card = this.column1[index];
                const doneCount = card.todos.filter(t => t.done).length;
                const progress = (doneCount / card.todos.length) * 100;

                if (progress > 50) {
                    if (this.column2.length < 5) {
                        const moved = this.column1.splice(index, 1);
                        this.column2.push(moved[0]);
                    }
                }
            } else if (colNum === 2) {
                const card = this.column2[index];
                const doneCount = card.todos.filter(t => t.done).length;
                const progress = (doneCount / card.todos.length) * 100;
                if (progress === 100) {
                    card.completedAt = new Date().toLocaleString();
                    const moved = this.column2.splice(index, 1);
                    this.column3.push(moved[0]);
                }
            }
        }
    }
});
