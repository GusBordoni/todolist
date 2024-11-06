import { projetos } from "./app";


class ProjectManager {
    static listProjects() {
        console.log(projetos);
    }
    static addProject(projectName) {
        projetos.push(projectName);
    }
    static removeProject(projectName) {
        if(projectName != 'default' && projectName != 'completed' && projectName != 'trash') {
            projetos.splice(projetos.indexOf(projectName),1);
        } else {
            throw new Error(`Can't remove this project.`);
        }
    }
    static changeProjectName(projectName,newProjectName) {
        if(projectName === 'default' || projectName === 'completed' || projectName === 'trash') {
            throw new Error(`This project can't be renamed.`);
        } else if((newProjectName != 'default' && newProjectName != 'completed' && newProjectName != 'trash') && (projetos.indexOf(projectName) != -1)){
            projetos[projetos.findIndex(project => project === projectName)] = newProjectName;
        } else if(newProjectName === 'default' || newProjectName === 'completed' || newProjectName === 'trash') {
            throw new Error(`Project can't be renamed to ${newProjectName}`);
        } else {
            throw new Error(`Project not found.`);
        }
    }
}


export { ProjectManager }