import "./styles.css";

console.log('hello world!');

let projetos = [
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

if (typeof(Storage) !== "undefined") {
    console.log('localStorage is available!');
} else {
    console.log("Web Storage não é suportado");
}

/* localStorage.setItem('projetos', JSON.stringify(projetos));
const storedProjects = JSON.parse(localStorage.getItem('projetos'));
console.log(storedProjects[0].projectName); */

console.clear();

class ProjectManager {
    static get listProjects() {
        let projectsList = [];
        for (let i = 0; i < projetos.length; i++) {
            projectsList.push(projetos[i].projectName);
        }
        console.log(projectsList);
    }
    static addNewProject(newProjectName) {
        let index = projetos.findIndex(proj => proj.projectName === newProjectName);

        if(index === -1){
            projetos.push({projectName: newProjectName});
            console.log(projetos);
        } else {
            throw new Error(`Project "${newProjectName}" already exists!`)
        }
        
    }
    static removeProject(projectName) {
        let index = projetos.findIndex(proj => proj.projectName === projectName);

        if(index === -1){
            throw new Error(`Project "${projectName}" not found!`)
        }
        if(projectName === 'completed'){
            throw new Error(`Project "Completed" can't be deleted!`)
        }
        
        projetos.splice(index,1);
        console.log(projetos);
    }
}

/* ProjectManager.addNewProject('saúde'); */
/* ProjectManager.removeProject('Completed'); */



class Task {
    constructor(title,description,dueDate,priority,labels){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.labels = labels;
    }
}

class TaskManager {
    // add task to general projects
    static addTaskToProject(task,projectName) {
        const index = projetos.findIndex(proj => proj.projectName === projectName);
        const newId = projetos[index].tasks.length + 1;

        if(index === -1){
            throw new Error(`Project "${projectName}" not found!`);
        }

        if (!projetos[index].tasks) {
            projetos[index].tasks = [];
        }
        
        projetos[index].tasks.push({
            id: newId,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            labels: task.labels
        });

        console.log(`Task "${task.title}" added to project "${projectName}".`);
    }
    // remove task from general projects
    static remTaskFromProject(id,projectName) {
        const projIndex = projetos.findIndex(proj => proj.projectName === projectName);

        if (projIndex === -1) {
            throw new Error(`Project "${projectName}" not found!`);
        }

        const taskIndex = projetos[projIndex].tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            throw new Error(`Task with ID "${id}" not found in project "${projectName}".`);
        }

        projetos[projIndex].tasks.splice(taskIndex,1);
        console.log(`Task with ID "${id}" removed from project "${projectName}".`);

        this.reorderTaskNumber(projectName);
    }
    // reset tasks id number
    static reorderTaskNumber(projectName) {
        const projIndex = projetos.findIndex(proj => proj.projectName === projectName);

        if(projetos[projIndex].tasks.length != projetos[projIndex].tasks.at(-1).id) {
            console.log(projetos[projIndex].tasks.length);
            console.log(projetos[projIndex].tasks.at(-1).id);
            console.log('teste1');
            for (let i = 0; i < projetos[projIndex].tasks.length; i++) {
                projetos[projIndex].tasks[i].id = i+1;
            }
        }
    }
    // testes
}


let tar01 = new Task('tarefa 99','fazer coisa ddd','2024-11-03',2,['label1','label2']);
TaskManager.addTaskToProject(tar01,'default');



/* TaskManager.remTaskFromProject(1,'default');
console.log(projetos);

 */


