import {
    createParseProjectName,
    createNodeProject,
    createViteProject,
    createUsageError,
    SPARK_CREATE_USEAGE_STATEMENT,
    SPARK_CREATE_HELP_TIP,
    createPSQLDatabase
} from "../helpers/create-action-helpers.js";

export const create = (inputsFromCommandLine) => {
    if (inputsFromCommandLine.length === 1) {
        createUsageError();
    }
    const projectName = inputsFromCommandLine[1];
    createParseProjectName(projectName);
    const projectOptions = inputsFromCommandLine[2];
    const projectTemplate = inputsFromCommandLine[3];
    switch (projectOptions) {
        case "--vite":
            console.log("create vite project...");
            createViteProject(projectName, projectTemplate);
            break;
        case "--node":
            console.log("create node project...");
            createNodeProject(projectName);
            break;
        case "--psql":
            console.log("create psql database...");
            createPSQLDatabase(projectName);
            break;
        default:
            console.log("[Error]: No option supplied!");
            console.log(SPARK_CREATE_USEAGE_STATEMENT);
            console.log(SPARK_CREATE_HELP_TIP);
            break;
    }
    process.exit(0);
};