import { projetos } from "./app.js";

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

export { ProjectManager }