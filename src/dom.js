import { tasks, projetos, setToLocalStorage } from "./app";
import { TaskManager, Task } from "./taskmanager";
import { format, addMonths, isAfter, isBefore, isToday, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { ProjectManager } from "./projectmanager";

// menu
const projMenu = document.querySelector('#projectsDiv');
const labelMenu = document.querySelector('#labelsDiv');

const filterToday = document.querySelector('.filterToday');
const filterWeek = document.querySelector('.filterWeek');
const filterMonth = document.querySelector('.filterMonth');
const filter3Months = document.querySelector('.filter3Months');

// main
const mainContainer = document.querySelector('#mainTaskContainer');

// form
const bTitle = document.querySelector('#bTitle');
const bDesc = document.querySelector('#bDescription');
const bDate = document.querySelector('#bDate');
const bPrior = document.querySelectorAll('input[name="bPriority"]');
const priorField = document.querySelector('#priorityField');
const bLabels = document.querySelector('#bLabels');
const inputs = [bTitle,bDesc,bDate]
const currentProjectSpan = document.querySelector('#actualProject');

const taskInfo = document.querySelector('.taskInfo');


class ProjectMenuLink {
    constructor(projItem){
        this.projItem = projItem;
    }
    buildMenuLink() {
        const menuProjDiv = document.createElement('div');
        const projFilterLink = document.createElement('a');
        projFilterLink.classList.add('menuProjItem');
        projFilterLink.href = "javascript:void(0)";
        projFilterLink.innerHTML = this.projItem;
        projFilterLink.addEventListener('click', () => {
            populateTasks(this.projItem);
            changeCurrentProjectTitle(this.projItem);
        })

        menuProjDiv.appendChild(projFilterLink);
        return menuProjDiv;
    }
}

function changeCurrentProjectTitle(project) {
    currentProjectSpan.innerHTML = `All tasks in: (${project})`
}

function populateProjects() {
    projMenu.innerHTML = '';
    for (let i = 0; i < projetos.length; i++) {
        let eachProject = new ProjectMenuLink(projetos[i]);
        projMenu.appendChild(eachProject.buildMenuLink());
    }
}

class TaskCard {
    constructor(task) {
        this.project = task.project;
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.dueDate = format(task.dueDate, 'dd/MM');
        this.priority = task.priority;
        this.labels = task.labels;
        this.complete = task.complete || false;
    }

    buildCard() {
        const taskCard = document.createElement('div');
        taskCard.classList.add('taskContainer');
        taskCard.setAttribute('id', 'taskID-' + this.id);
    
        // checkbox
        const taskDone = document.createElement('div');
        taskDone.classList.add('taskComplete');
        const checkDone = document.createElement('input');
        checkDone.setAttribute('type', 'checkbox');
        checkDone.classList.add('checkDone');
        checkDone.setAttribute('id', 'checkDone-' + this.id);
        checkDone.checked = this.complete;
        taskDone.appendChild(checkDone);
    
        // main container
        const taskInfo = document.createElement('div');
        taskInfo.classList.add('taskInfo');
    
        // title
        const taskTitle = document.createElement('div');
        taskTitle.classList.add('taskTitle');
        taskTitle.innerText = this.title;
        taskInfo.appendChild(taskTitle);
    
        // task description
        const taskDesc = document.createElement('div');
        taskDesc.classList.add('taskDesc');
        taskDesc.innerText = this.description;
        taskInfo.appendChild(taskDesc);
    
        // task labels
        const taskLabels = document.createElement('div');
        taskLabels.classList.add('taskLabels');
        this.labels.forEach(label => {
            const span = document.createElement('span');
            span.innerText = label;
            taskLabels.appendChild(span);
        });
        taskInfo.appendChild(taskLabels);
    
        // task date info container
        const taskDateInfo = document.createElement('div');
        taskDateInfo.classList.add('taskDateInfo');
    
        const taskDate = document.createElement('div');
        taskDate.classList.add('taskDate');
        taskDate.innerText = this.dueDate;
        taskDateInfo.appendChild(taskDate);
    
        const taskTimeLeft = document.createElement('div');
        taskTimeLeft.classList.add('taskTimeLeft');
        taskTimeLeft.innerText = TaskManager.calcTime(this.id);
        taskDateInfo.appendChild(taskTimeLeft);
    
        taskInfo.appendChild(taskDateInfo);
    
        // task priority section
        const taskPriority = document.createElement('div');
        taskPriority.classList.add('taskPriority');
        const taskPriorTitle = document.createElement('div');
        taskPriorTitle.classList.add('priorityTitle');
        taskPriorTitle.innerText = 'Priority';
    
        const taskPriorNumber = document.createElement('div');
        taskPriorNumber.classList.add('priorityNumber');
        taskPriorNumber.innerText = this.priority;
    
        taskPriority.appendChild(taskPriorTitle);
        taskPriority.appendChild(taskPriorNumber);
    

        taskCard.appendChild(taskDone);
        taskCard.appendChild(taskInfo);
        taskCard.appendChild(taskPriority);

        return taskCard;
    }
}

function populateTasks(project, date) {
    mainContainer.innerHTML = '';

    const today = new Date();
    const startOfTheWeek = startOfWeek(today);
    const endOfTheWeek = endOfWeek(today);
    const startOfTheMonth = startOfMonth(today);
    const endOfTheMonth = endOfMonth(today);
    const threeMonthsLater = addMonths(today, 3);

    // Filtra as tarefas com base no tipo de data (today, week, month, 3month)
    let filteredTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        
        switch (date) {
            case 'today':
                return isToday(taskDate) && task.project === project;

            case 'week':
                return isAfter(taskDate, startOfDay(startOfTheWeek)) && isBefore(taskDate, endOfDay(endOfTheWeek)) && task.project === project;

            case 'month':
                return isAfter(taskDate, startOfDay(startOfTheMonth)) && isBefore(taskDate, endOfDay(endOfTheMonth)) && task.project === project;

            case '3month':
                return isAfter(taskDate, startOfDay(today)) && isBefore(taskDate, endOfDay(threeMonthsLater)) && task.project === project;

            default:
                return task.project === project;
        }
    });

    // Se houver tarefas filtradas, cria e adiciona os cards ao DOM
    filteredTasks.forEach(task => {
        let eachTaskCard = new TaskCard(task);
        mainContainer.appendChild(eachTaskCard.buildCard());
    });

    // Caso o filtro seja indefinido (default), muda o título do projeto
    if (date === undefined) {
        changeCurrentProjectTitle(project);
    }
}

class LabelTags {
    constructor(){
        this.labels = getTagCount();
    }

    buildMenuTag() {
        let fragment = document.createDocumentFragment();
        let sortedLabels = Object.keys(this.labels)
        .sort()
        .reduce((obj, key) => {
            obj[key] = this.labels[key];
            return obj;
        }, {});

        for (let label in sortedLabels) {
            if (sortedLabels.hasOwnProperty(label)) {
                
                let eachLabel = document.createElement('p');
                eachLabel.classList.add('menuLabelTag');
                tagFontSize(sortedLabels, label, eachLabel);
                eachLabel.innerHTML = label;
                fragment.appendChild(eachLabel);
            }
        }
        return fragment;
    }
}

function getTagCount() {
    let countLabels = {};

    for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks[i].labels.length; j++) {
            let label = tasks[i].labels[j];
            if(countLabels[label]){
                countLabels[label]++;
            } else {
                countLabels[label] = 1;
            }
        }
    }
    return countLabels;
}

function tagFontSize(tags, tag, eachLabel) {
    let counts = Object.values(tags);
    let maxCount = Math.max(...counts);
    let minCount = Math.min(...counts);

    // count min value tags
    let countOfMin = counts.filter(count => count === minCount).length;

    // check if min value is the majority
    let isMinMajority = countOfMin > Math.floor(counts.length / 2);

    let count = tags[tag];
    let className = '';

    if (count === maxCount) {
        className = 'tagSize3';
    } else if (count === minCount && isMinMajority) {
        className = 'tagSize2';
    } else if (count === minCount) {
        className = 'tagSize1';
    } else {
        className = 'tagSize2';
    }
    eachLabel.classList.add(className);
}

function populateLabels() {
    labelMenu.innerHTML = '';
    let projetoLabels = new LabelTags();
    labelMenu.appendChild(projetoLabels.buildMenuTag())
}

function cleanForm() {
    bTitle.value = '';
    bDesc.value = '';
    bDate.value = '';
    bPrior.forEach((element) => element.checked = false);
    bLabels.value = '';
}


// task click expand - task checkbox complete click - 
document.addEventListener('click', function(event) {
    const taskContainer = event.target.closest('.taskContainer');
    
    // CHECKBOX
    if (event.target.matches('input[type="checkbox"]') && event.target.checked) {
        const taskID = event.target.id.slice(10);

        taskContainer.classList.add('removeCard');

        setTimeout(() => {
            TaskManager.toggleComplete(taskID);
        }, 1050);
    } else if (event.target.matches('input[type="checkbox"]') && event.target.checked === false) {
        const taskID = event.target.id.slice(10);

        taskContainer.classList.remove('removeCard');

        setTimeout(() => {
            TaskManager.toggleComplete(taskID);
        }, 1050);
    }

    // EXPAND TASK
    if (event.target.closest('.taskInfo') || event.target.closest('.taskTitle') || event.target.closest('.taskDate')) {
        if (taskContainer) {
            // Toggle expanded class for the description, date info, and time left
            const taskDescriptionDiv = taskContainer.querySelector('.taskDesc');
            const taskDateInfoDiv = taskContainer.querySelector('.taskDateInfo');
            const taskTimeLeftDiv = taskContainer.querySelector('.taskTimeLeft');

            if (taskDescriptionDiv && taskDateInfoDiv && taskTimeLeftDiv) {
                taskDescriptionDiv.classList.toggle('expanded');
                taskDateInfoDiv.classList.toggle('expandedDate');
                taskTimeLeftDiv.classList.toggle('expandedTimeLeft');
            } else {
                throw new Error('Element class not found.')
            }
        }
    }

    // FILTERS
    if (event.target.closest('.filterAll')) {
        event.preventDefault();
        currentProjectSpan.innerHTML = `All tasks in: (default)`;
        populateTasks('default');
    }
    if (event.target.closest('.filterToday')) {
        event.preventDefault();
        currentProjectSpan.innerHTML = `Tasks for today in: (default)`;
        populateTasks('default','today');
    }
    if (event.target.closest('.filterWeek')) {
        event.preventDefault();
        currentProjectSpan.innerHTML = `Tasks for this week in: (default)`;
        populateTasks('default','week');
    }
    if (event.target.closest('.filterMonth')) {
        event.preventDefault();
        currentProjectSpan.innerHTML = `Tasks for this month in: (default)`;
        populateTasks('default','month');
    }
    if (event.target.closest('.filter3Months')) {
        event.preventDefault();
        currentProjectSpan.innerHTML = `Tasks for the next 3 months in: (default)`;
        populateTasks('default','3month');
    }
});

// Show dialog modal
document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.querySelector('#addTaskBtn');
    const dialog = document.querySelector('dialog');
    const closeButton = document.querySelector('.close');
    const cancelButton = document.querySelector('#bCancel');
    const bRegister = document.querySelector('#bRegister');

    // const bPrior = document.querySelector('#bPriority');

    if (addTaskButton && dialog) {
        addTaskButton.addEventListener("click", (event) => {
            event.preventDefault(); // Evita o comportamento padrão
            dialog.showModal();
        });
    }
    // CLOSE OPTIONS
    closeButton.addEventListener("click", () => {
        inputs.forEach(input => {
            input.placeholder = '';
            input.style.border = '';
        })
        priorField.style.border = '';
        dialog.close();
        cleanForm();
    });
    cancelButton.addEventListener("click", () => {
        inputs.forEach(input => {
            input.placeholder = '';
            input.style.border = '';
        })
        priorField.style.border = '';
        dialog.close();
        cleanForm();
    });
    dialog.addEventListener('click', (event) => {
        const rect = dialog.getBoundingClientRect();
        if (
            event.clientX < rect.left || 
            event.clientX > rect.right || 
            event.clientY < rect.top || 
            event.clientY > rect.bottom
        ) {
            dialog.close();
        }
    });
    // REGISTER A NEW TASK
    bRegister.addEventListener('click', (e) => {
        e.preventDefault();

        let formValidation = true;

        inputs.forEach(input => {
            input.style.border = '';
            input.ariaPlaceholder = '';
        
            if (input.value.trim() === '') {
                input.style.border = '2px solid red';
                input.placeholder = "Required";
                formValidation = false;
            } else {
                input.placeholder = '';
            }
        })

        if(![...bPrior].some(radio => radio.checked)) {
            priorField.style.border = '2px solid red';
            formValidation = false;
        } else {
            priorField.style.border = '2px solid transparent';
        }

        if(formValidation === true) {
            const newTitle = bTitle.value;
            const newDesc = bDesc.value;
            const newDateString = bDate.value;
            const [year, month, day] = newDateString.split('-').map(Number);
            const newDate = new Date(year, month - 1, day)
            const newPrior = document.querySelector('input[name="bPriority"]:checked').value;
            const labelArray = bLabels.value.split(',').map(item => item.trim());
            const newTask = new Task('default',newTitle,newDesc,new Date(newDate),Number(newPrior),labelArray);
            
            TaskManager.addTask(newTask);
            dialog.close();
            cleanForm();

            populateTasks('default');
        }
    })
});

export { populateProjects, populateTasks, populateLabels };