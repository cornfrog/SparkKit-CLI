import fs from "fs";
import { execSync } from "child_process";
import { VITE_TEMPLATES } from "./vite-templates.js";

export const SPARK_CREATE_USEAGE_STATEMENT = `[Usage]: spark create [name] --[options].`;

export const SPARK_CREATE_HELP_TIP = `[Tip]: Use 'spark create --h' to display help info. `;

export const createUsageError = () => {
    console.log("[Error]: Incorrect create usage!");
    console.log(SPARK_CREATE_USEAGE_STATEMENT);
    console.log(SPARK_CREATE_HELP_TIP);
    process.exit(1);
};

export const createParseProjectName = (projectName) => {
    if (projectName === "--h") {
        createHelpInfo();
        process.exit(0);
    }
    if (projectName.startsWith("--")) {
        console.log("[Error]: Option supplied for project or database name");
        console.log(SPARK_CREATE_USEAGE_STATEMENT);
        console.log(SPARK_CREATE_HELP_TIP);
        process.exit(1);
    }
};

export const createNodeProject = (projectName) => {
    createProjectFolder(projectName);
    try {
        process.chdir(projectName);
        execSync("npm init -y", { stdio: "inherit" });
        process.chdir("..");
        console.log(`[Success] Node project ${projectName} created!`)
    } catch (error) {
        console.log("[Error]: Error while creating express project...");
        console.log(error);
        process.exit(1);
    }
};

export const createViteProject = (projectName, projectTemplate) => {
    if (!VITE_TEMPLATES.includes(projectTemplate)) {
        if (!projectTemplate) {
            console.log(`[Error]: No vite template entered!`);
        } else {
            console.log(`[Error]: Vite project tempalte ${projectTemplate} not known.`);
        }
        console.log("[Usage]: spark create [project-name] --vite [template]")
        console.log(SPARK_CREATE_HELP_TIP);
        process.exit(1);
    }
    try {
        execSync(
            `echo "n" | npm create vite@latest ${projectName} -- --template ${projectTemplate}`,
            { stdio: "inherit" }
        );
        console.log(`[Success]: Vite project ${projectName} created!`)
    } catch (error) {
        console.log("[Error]: Error while creating vite project...");
        console.log("error");
        process.exit(1);
    }
};


export const createPSQLDatabase = (dbName) => {
    console.log(`Creating Local PSQL Database ${dbName}...`);
    if (!psqlInstallCheck()) {
        console.log("[Error]: PSQL currently not installed.");
        console.log("Visit https://www.postgresql.org/download/ to install");
        process.exit(1);
    }
    try {
        execSync(`createdb ${dbName}`, { stdio: "pipe" });
        console.log(`[Success]: Local Database ${dbName} created!`);
    } catch (error) {
        const errMsg = error.stderr.toString();

        if (errMsg.includes(`database "${dbName}" already exists`)) {
            console.log(`[Error]: Database "${dbName}" already exists!`);
        } else {
            console.log("[Error]: Error creating psql database...");
            console.log(errMsg);
        }

        process.exit(1);
    }
};

const psqlInstallCheck = () => {
    try {
        execSync("psql --version", { stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

const createHelpInfo = () => {
    console.log("\x1b[1mSpark Create Command\x1b[0m");
    console.log("\n");
    console.log("\x1b[32mcreate - creates a templated project or database\x1b[0m");
    console.log("\n");
    console.log("\x1b[1mUsage:\x1b[0m");
    console.log("\tspark \x1b[1mcreate\x1b[0m \x1b[1m[PROJECT-NAME]\x1b[0m \x1b[1m--[OPTION]\x1b[0m");
    console.log("\n");
    console.log("\x1b[1mCreate Options:\x1b[0m");
    console.log("\t\x1b[33m--vite\x1b[0m : creates vite project");
    console.log("\t\x1b[33m--express\x1b[0m : creates expressjs project");
    console.log("\t\x1b[33m--psql\x1b[0m : creates psql database");
    console.log("\t\x1b[33m--h\x1b[0m : displays help info");
    console.log("\n")
    console.log("\x1b[1mVite Template Options:\x1b[0m");
    console.log("\t\x1b[33mvanilla\x1b[0m : Vanilla JS Template");
    console.log("\t\x1b[33mvanilla-ts\x1b[0m : Vanilla TS Template");
    console.log("\t\x1b[33mvue\x1b[0m : VUE JS Template");
    console.log("\t\x1b[33mvue-ts\x1b[0m : VUE JS Template");
    console.log("\t\x1b[33mreact\x1b[0m : React JS Template");
    console.log("\t\x1b[33mreact-ts\x1b[0m : React TS Template");
    console.log("\t\x1b[33mpreact\x1b[0m : Preact JS Template");
    console.log("\t\x1b[33mpreact-ts\x1b[0m : Preact TS Template");
    console.log("\t\x1b[33mlit\x1b[0m : Lit JS Template");
    console.log("\t\x1b[33mlit-ts\x1b[0m : Lit TS Template");
    console.log("\t\x1b[33msvelte\x1b[0m : Svelte JS Template");
    console.log("\t\x1b[33msvelte-ts\x1b[0m : Svelte TS Template");
    console.log("\t\x1b[33msolid\x1b[0m : Solid JS Template");
    console.log("\t\x1b[33msolid-ts\x1b[0m : Solid TS Template");
    console.log("\n");
    console.log("\x1b[1mDatabase Options:\x1b[0m");
    console.log("\t\x1b[33m--psql\x1b[0m : PSQL Database");
    console.log("\n");
}

const createProjectFolder = (projectFolderName) => {
    try {
        fs.mkdirSync(projectFolderName);
        console.log(`[Success]: Created project directory ${projectFolderName}`);
    } catch (error) {
        if (error.code === "EEXIST") {
            console.log(`[Error]: Directory ${projectFolderName} already exists`);
            process.exit(1);
        }
    }
};