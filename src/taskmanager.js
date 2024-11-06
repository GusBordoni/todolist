import { projetos, tasks, getProjectsList } from "./app";
import { differenceInDays, isThisISOWeek, startOfDay } from "date-fns";
import { populateTasks, populateLabels } from "./dom";

class Task {
    constructor(project,title,description,dueDate,priority,labels) {
        this.project = project;
        this.previousProject = project;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.labels = labels;
        this.complete = false;
    }
}

class TaskManager {
    static listTasks() {
        console.log(tasks);
    }
    static getTaskIndexById(id) {
        const itemIndex = tasks.findIndex(item => item.id === Number(id));
        if (itemIndex === -1) {
            throw new Error(`Task id#${id} not found.`);
        }
        return itemIndex;
    }
    static addTask(task) {
        const id = tasks.length + 1;
        task['id'] = id;
        tasks.push(task);
        populateLabels();
    }
    static remTask(id) {
        const itemIndex = this.getTaskIndexById(id);
        if(itemIndex != -1) {
            tasks.splice(itemIndex,1);
            this.reorderTasks();
        } else {
            throw new Error(`Task id#${id} not found.`)
        }
    }
    static moveTask(id,project) {
        const itemIndex = this.getTaskIndexById(id);
        if (tasks[itemIndex].project !== 'trash') {
            tasks[itemIndex].previousProject = tasks[itemIndex].project;
        }
        tasks[itemIndex].project = project;
    }
    static restoreTask(id) {
        const itemIndex = this.getTaskIndexById(id);
        tasks[itemIndex].project = tasks[itemIndex].previousProject;
    }
    static reorderTasks() {
        if(tasks.length === 0 || !tasks.length) {
            throw new Error('There are no tasks registered at the moment.')
        }
        if(tasks.length != tasks.at(-1).id) {
            for (let i = 0; i < tasks.length; i++) {
                tasks[i].id = i+1;
            }
        }
    }
    static changeTaskTitle(id,newTitle) {
        const itemIndex = this.getTaskIndexById(id);
        tasks[itemIndex].title = newTitle;
    }
    static changeTaskDesc(id,newDesc) {
        const itemIndex = this.getTaskIndexById(id);
        tasks[itemIndex].description = newDesc;
    }
    static changeTaskDate(id,newDate) {
        const itemIndex = this.getTaskIndexById(id);
        tasks[itemIndex].dueDate = newDate;
    }
    static changeTaskPriority(id,newPriority) {
        const itemIndex = this.getTaskIndexById(id);
        tasks[itemIndex].priority = newPriority;
    }
    static addTaskLabel(id,label) {
        const itemIndex = this.getTaskIndexById(id);
        tasks[itemIndex].labels.push(label);
    }
    static remTaskLabel(id,label) {
        const itemIndex = this.getTaskIndexById(id);
        const labelIndex = tasks[itemIndex].labels.findIndex(item => item === label);
        if(labelIndex != -1) {
            tasks[itemIndex].labels.splice(labelIndex,1);
        } else {
            throw new Error(`Label ${label} not found in task id#${id}.`)
        }
    }
    static toggleComplete(id) {
        const itemIndex = this.getTaskIndexById(id);
        tasks[itemIndex].complete = !tasks[itemIndex].complete;

        if (tasks[itemIndex].complete) {
            this.moveTask(id, 'completed');
        } else {
            const previousProject = tasks[itemIndex].previousProject;
            this.moveTask(id, previousProject);
        }
        populateTasks('default');
    }
    static calcTime(id) {
        const today = startOfDay(new Date());
        const dueDate = startOfDay(new Date(tasks[id - 1].dueDate));
        
        const daysLeft = differenceInDays(dueDate, today);
    
        if (daysLeft === 0) {
            return 'The task is today.';
        } else if (daysLeft < 0) {
            return `${Math.abs(daysLeft)} day${daysLeft > 1 ? 's' : ''} late`;
        } else {
            return `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`;
        }
    }
}


export { Task, TaskManager }