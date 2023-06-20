// Previne que suje o escopo global (EEFE)
(() => {
    // Criacao da interface Task
    interface Task {
        id: string;
        dateCreated: Date;
        dateUpdated: Date;
        description: string;
        render(): string;
    }

    // Meu reminder implementara Task além de atribuir os valores unicos do reminder
    class Reminder implements Task {
        id: string = '';
        dateCreated: Date = new Date();
        dateUpdated: Date = new Date();
        description: string = '';

        date: Date = new Date();
        notifications: Array<string> = ['EMAIL'];

        // Metodo construtor
        constructor(description: string, date: Date,  notifications: Array<string>) {
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        // Metodo render retorna string de (this)
        render(): string {
            return JSON.stringify(this);
        }

    }

    // Todo ira implementar Task com seus valores unicos
    class Todo implements Task {
        id: string = '';
        dateCreated: Date = new Date();
        dateUpdated: Date = new Date();
        description: string = '';

        done: boolean = false;

        // Metodo construtor
        constructor(description: string) {
            this.description = description;
        }

        // Metodo render retorna string de (this)
        render(): string {
            return JSON.stringify(this);
        }

    }

    // Irao representar meu TODO e Reminder
    const todo = new Todo('Todo criado com a classe');

    const reminder = new Reminder ('Reminder criado com a classe', new Date(), ['EMAIL']);

    // View renderiza o TODO e Reminder
    const taskView = {
        // Function render (recebe lista de tasks) criando objeto
        render(tasks: Array<Task>) {
            // Ira exibir e limpar nossa lista
            const taskList = document.getElementById('tasksList');
            while(taskList?.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }
            // Iremos receber uma task apos cada interação em nosso foreach
            tasks.forEach((task) => {
                const li = document.createElement('li');
                // Tranforma o retorno da nossa task em String
                const textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                taskList?.appendChild(li);
            })
        },
    };
    // Garante quando sera renderizada e armazenada em memoria nossas tasks
    const TaskController = (view: typeof taskView) => {
        const tasks: Array<Task> = [todo, reminder];

        // Funcao que ira ser passada ao nosso evento
        const handleEvent = (event: Event) => {
            event.preventDefault();
            view.render(tasks);
        }
        // Decide quando renderizar nossa lista
        document.getElementById('taskForm')?.addEventListener('submit', handleEvent);
    };

    TaskController(taskView);
})();