"use strict";
// Previne que suje o escopo global (EEFE)
(function () {
    // Meu reminder implementara Task além de atribuir os valores unicos do reminder
    var Reminder = /** @class */ (function () {
        // Metodo construtor
        function Reminder(description, date, notifications) {
            this.id = '';
            this.dateCreated = new Date();
            this.dateUpdated = new Date();
            this.description = '';
            this.date = new Date();
            this.notifications = ['EMAIL'];
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        // Metodo render retorna string de (this)
        Reminder.prototype.render = function () {
            return JSON.stringify(this);
        };
        return Reminder;
    }());
    // Todo ira implementar Task com seus valores unicos
    var Todo = /** @class */ (function () {
        // Metodo construtor
        function Todo(description) {
            this.id = '';
            this.dateCreated = new Date();
            this.dateUpdated = new Date();
            this.description = '';
            this.done = false;
            this.description = description;
        }
        // Metodo render retorna string de (this)
        Todo.prototype.render = function () {
            return JSON.stringify(this);
        };
        return Todo;
    }());
    // Irao representar meu TODO e Reminder
    var todo = new Todo('Todo criado com a classe');
    var reminder = new Reminder('Reminder criado com a classe', new Date(), ['EMAIL']);
    // View renderiza o TODO e Reminder
    var taskView = {
        // Function render (recebe lista de tasks) criando objeto
        render: function (tasks) {
            // Ira exibir e limpar nossa lista
            var taskList = document.getElementById('tasksList');
            while (taskList === null || taskList === void 0 ? void 0 : taskList.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }
            // Iremos receber uma task apos cada interação em nosso foreach
            tasks.forEach(function (task) {
                var li = document.createElement('li');
                // Tranforma o retorno da nossa task em String
                var textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                taskList === null || taskList === void 0 ? void 0 : taskList.appendChild(li);
            });
        },
    };
    // Garante quando sera renderizada e armazenada em memoria nossas tasks
    var TaskController = function (view) {
        var _a;
        var tasks = [todo, reminder];
        // Funcao que ira ser passada ao nosso evento
        var handleEvent = function (event) {
            event.preventDefault();
            view.render(tasks);
        };
        // Decide quando renderizar nossa lista
        (_a = document.getElementById('taskForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleEvent);
    };
    TaskController(taskView);
})();
