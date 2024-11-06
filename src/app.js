import "./styles.css";
import { Task, TaskManager } from "./taskmanager";
import { populateProjects, populateTasks, populateLabels } from "./dom";
import { startOfWeek } from "date-fns";

const task01 = new Task('default','alguma task 00','alguma desc',new Date(2024,10,3),1,['2024','personal','profissional','dev']);
const task02 = new Task('default','tarefa 01','exemplo de tarefa',new Date(2024,10,4),2,['2024','pessoal','profissional','dev']);
const task03 = new Task('default','tarefa 02','fazer tal coisa',new Date(2024,10,5),3,['2024','3d','dev','pessoal']);
const task04 = new Task('default','tarefa 03','fazer tal coisa',new Date(2024,10,6),1,['2024','garden','nutrition','profissional','3d']);
const task05 = new Task('completed','tarefa 04','alguma desc',new Date(2024,10,10),2,['2024','garden','nutrition','profissional','3d']);
const task06 = new Task('trash','alguma task 05','alguma desc',new Date(2024,10,8),3,['2024','garden','nutrition','profissional','3d']);
const task07 = new Task('default','alguma task 06','alguma desc',new Date(2024,11,8),3,['2024','garden','nutrition','profissional','3d']);

function getProjectsList(array) {
    let projectList = []
    for (let i = 0; i < tasks.length; i++) {
        if(projectList.indexOf(tasks[i].project) === -1) {
            projectList.push(tasks[i].project)
        }        
    }
    return projectList;
}

function setToLocalStorage(array){
    if (typeof(Storage) !== "undefined") {
        localStorage.clear();
        localStorage.setItem('Tasks', JSON.stringify(array));
    } else {
        throw new Error('Web LocalStorage not supported!')
    }
}

function getFromLocalStorage(){
    if (typeof(Storage) !== "undefined") {
        if (!localStorage.length) throw new Error('Web LocalStorage is empty!');
        tasks = JSON.parse(localStorage.getItem('Tasks'));
    } else {
        throw new Error('Web LocalStorage not supported!')
    }
}

// TaskManager.listTasks();
// ProjectManager.listProjects();
// ProjectManager.addProject('teste');
// ProjectManager.listProjects();
// ProjectManager.removeProject('teste');
// ProjectManager.listProjects();
// ProjectManager.changeProjectName('default','default2');
// ProjectManager.listProjects();

export let tasks = []

TaskManager.addTask(task01);
TaskManager.addTask(task02);
TaskManager.addTask(task03);
TaskManager.addTask(task04);
TaskManager.addTask(task05);
TaskManager.addTask(task06);
TaskManager.addTask(task07);
setToLocalStorage(tasks);

export let projetos = getProjectsList(tasks);

// TaskManager.remTask(1);
// TaskManager.reorderTasks();
// TaskManager.listTasks();
// TaskManager.moveTask(1,'completed');
// TaskManager.listTasks();
// TaskManager.changeTaskTitle(1,'legal1');
// TaskManager.changeTaskDesc(1,'legal1 desc');
// TaskManager.changeTaskDate(1,'2024-11-02');
// TaskManager.changeTaskPriority(1,2);
// TaskManager.listTasks();
// TaskManager.addTaskLabel(1,'legal');
// TaskManager.listTasks();
// TaskManager.remTaskLabel(1,'2024');
// TaskManager.listTasks();
// TaskManager.toggleComplete(1);
// TaskManager.listTasks();
// TaskManager.calcTime(1);

populateProjects();
populateTasks('default');
populateLabels();


// console.log(startOfWeek(new Date()));

export { setToLocalStorage, getFromLocalStorage, getProjectsList };