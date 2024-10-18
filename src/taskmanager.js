import { projetos } from "./app.js";

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
            /* console.log(projetos[projIndex].tasks.length);
            console.log(projetos[projIndex].tasks.at(-1).id);
            console.log('teste1'); */
            for (let i = 0; i < projetos[projIndex].tasks.length; i++) {
                projetos[projIndex].tasks[i].id = i+1;
            }
        }
    }

    //change tasks info
    static changeTaskName(project,task,title) {
        const projIndex = projetos.findIndex(proj => proj.projectName === project);
        const taskID = projetos[projIndex].tasks.findIndex(taskItem => taskItem.id === task);
        
        projetos[projIndex].tasks[taskID].title = title;
        console.log(projetos[projIndex].tasks[taskID]);
    }
    static changeTaskDesc(project,task,description) {
        const projIndex = projetos.findIndex(proj => proj.projectName === project);
        const taskID = projetos[projIndex].tasks.findIndex(taskItem => taskItem.id === task);
        
        projetos[projIndex].tasks[taskID].description = description;
        console.log(projetos[projIndex].tasks[taskID]);
    }
    static changeTaskDate(project,task,date) {
        const projIndex = projetos.findIndex(proj => proj.projectName === project);
        const taskID = projetos[projIndex].tasks.findIndex(taskItem => taskItem.id === task);
        
        projetos[projIndex].tasks[taskID].dueDate = date;
        console.log(projetos[projIndex].tasks[taskID]);
    }
    static changeTaskPriority(project,task,priority) {
        const projIndex = projetos.findIndex(proj => proj.projectName === project);
        const taskID = projetos[projIndex].tasks.findIndex(taskItem => taskItem.id === task);
        
        projetos[projIndex].tasks[taskID].priority = priority;
        console.log(projetos[projIndex].tasks[taskID]);
    }

    // testes
    static addTaskLabel(project,task,label){
        const projIndex = projetos.findIndex(proj => proj.projectName === project);
        const taskID = projetos[projIndex].tasks.findIndex(taskItem => taskItem.id === task);

        const labelIndex = projetos[projIndex].tasks[taskID].labels.findIndex(labelItem => labelItem.task ) // continuar daqui... tem que a char o index da label pra poder ver se tem repetido ou não.. se ja tiver, não adicionar, se não tiver, adicionar (conforme codigo abaixo)
        
        projetos[projIndex].tasks[taskID].labels.push(label);
        console.log(projetos[projIndex].tasks[taskID]);
    }
    static removeTaskLabel(project,task,label){

    }
    
}


// criar uma função só pra dar erro?
// criar uma função pra encontrar uma task - pq esse códido se repete por todo o código


export { Task, TaskManager }