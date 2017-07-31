/**
 * Created by ngalstyan on 7/30/17.
 */
(function (exports) {
    'use strict';

    exports.app = new Vue({
        el: "#app",
        data: {
            haha: "haha It is from Vue!",
            newTodo: "",
            todos: []
        },
        //watch:{}, //what is this for?
        computed: {},
        methods: {
            add: function () {
                var that = this;
                this.$http.post("/add", {author: "Narek", content: this.newTodo}).then(function (res, err) {
                    if (err) console.log("sth went wrong" + err);
                    that.newTodo = "";
                    that.todos.push(res.body);
                })
            },
            list: function () {
                var that = this;

                this.$http.get("/listAll").then(function (res, err) {
                    if (err) console.log(err);
                    that.todos = res.body;
                })
            },
            update: function (todo) {
                todo.done = !todo.done;
                this.$http.post("/update", todo).then(function (res, err) {
                    if (err) console.log("sth went wrong")
                })
            },
            deleteTodo: function (todo) {
                console.log("haha");
                this.todos = this.todos.filter(function (el) {
                    return el != todo
                });

                this.$http.post("/delete", todo).then(function (res, err) {
                    if (err) console.log("sth went wrong")
                })
            }
        },
        directives: {}
    });
})(window);