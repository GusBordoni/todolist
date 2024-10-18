import "./styles.css";
import { ProjectManager } from "./projectmanager.js"
import { Task, TaskManager } from "./taskmanager.js"

export let projetos = [
    {projectName: 'default',
     tasks: [
            {
                id: 1,
                title: 'tarefa 01',
                description: 'fazer tal coisa',
                dueDate: '2024-11-03',
                priority: 1,
                labels: ['2024','pessoal','profissional']
            },
            {
                id: 2,
                title: 'tarefa 02',
                description: 'fazer tal coisa',
                dueDate: '2024-11-03',
                priority: 1,
                labels: ['2024','pessoal','profissional']
            },
            {
                id: 3,
                title: 'tarefa 03',
                description: 'fazer tal coisa',
                dueDate: '2024-11-03',
                priority: 1,
                labels: ['2024','pessoal','profissional']
            }
        ]
    },
    {projectName: 'compromissos'},
    {projectName: 'saúde'},
    {projectName: 'lista de compras'},
    {projectName: 'completed'}
]

// verificar se local storage é suportado
/* if (typeof(Storage) !== "undefined") {
    console.log('localStorage is available!');
} else {
    console.log("Web Storage não é suportado");
} */

//testes de local storage
/* localStorage.setItem('projetos', JSON.stringify(projetos));
const storedProjects = JSON.parse(localStorage.getItem('projetos'));
console.log(storedProjects[0].projectName); */

// console.clear();

let tar01 = new Task('tarefa 99','fazer coisa ddd','2024-11-03',2,['label1','label2']);
TaskManager.addTaskToProject(tar01,'default');

// console.log(projetos);



// testes
/* TaskManager.changeTaskName('default',1,'teste de nova task title');
console.log(`task name changed from 'tarefa 01' to 'teste de nova task title'`);
TaskManager.changeTaskDesc('default',1,'fazer coisa nenhuma');
console.log(`task description changed from 'fazer tal coisa' to 'fazer coisa nenhuma'`);
TaskManager.changeTaskDate('default',1,'2024-11-02');
console.log(`task date changed from '2024-11-03' to '2024-11-02'`);
TaskManager.changeTaskPriority('default',1,2);
console.log('task priority changed from 1 to 2'); */

TaskManager.addTaskLabel('default',1,'2025');