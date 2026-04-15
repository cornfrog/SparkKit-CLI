import {
    SPARK_DELETE_USEAGE_STATEMENT,
    SPARK_DELETE_HELP_TIP,
    deleteUsageError,
    deleteParseProjectName,
    deleteProjectFolder,
    deleteDatabase,
} from "../helpers/delete-action-helpers.js";

export const delete_action = (inputsFromCommandLine) => {
    if (inputsFromCommandLine.length === 1) {
        deleteUsageError();
    }
    const projectName = inputsFromCommandLine[1];
    deleteParseProjectName(projectName);
    const projectOptions = inputsFromCommandLine[2];
    const projectTemplate = inputsFromCommandLine[3];
    switch (projectOptions) {
        case "--project":
            console.log("deleting project...");
            deleteProjectFolder(projectName, projectTemplate);
            break;
        case "--database":
            console.log("deleting database...");
            deleteDatabase([projectName, projectOptions, projectTemplate]);
            break;
        default:
            console.log("[Error]: No option supplied!");
            console.log(SPARK_DELETE_USEAGE_STATEMENT);
            console.log(SPARK_DELETE_HELP_TIP);
            break;
    }
    process.exit(0);
};