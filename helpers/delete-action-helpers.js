import fs from "fs";
import { execSync } from "child_process";

// ---------- Constants ----------
export const SPARK_DELETE_USEAGE_STATEMENT = `[Usage]: spark delete [name] --[option]`;
export const SPARK_DELETE_HELP_TIP = `[Tip]: Use 'spark delete --h' to display help info`;

// ---------- Helpers ----------
const psqlInstallCheck = () => {
    try {
        execSync("psql --version", { stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
};

const deletePSQLDatabase = (dbName) => {
    if (!psqlInstallCheck()) {
        console.log("[Error]: PSQL not installed");
        console.log("Install it: https://www.postgresql.org/download/");
        process.exit(1);
    }

    try {
        execSync(`dropdb ${dbName}`, { stdio: "pipe" });
        console.log(`[Success]: Deleted database '${dbName}'`);
    } catch (error) {
        const errMsg = error.stderr?.toString() || "";
        if (errMsg.includes("does not exist")) {
            console.log(`[Error]: Database '${dbName}' does not exist`);
        } else {
            console.log("[Error]: Failed to delete database");
            console.log(errMsg);
        }
        process.exit(1);
    }
};

// ---------- Project Folder ----------
export const deleteProjectFolder = (projectName) => {
    if (!fs.existsSync(projectName)) {
        console.log(`[Error]: Project folder '${projectName}' does not exist`);
        process.exit(1);
    }

    try {
        fs.rmSync(projectName, { recursive: true, force: true });
        console.log(`[Success]: Deleted project '${projectName}'`);
    } catch (error) {
        console.log("[Error]: Failed to delete project");
        console.log(error.message);
        process.exit(1);
    }
};

// ---------- Usage & Help ----------
export const deleteUsageError = () => {
    console.log("[Error]: Incorrect delete usage!");
    console.log(SPARK_DELETE_USEAGE_STATEMENT);
    console.log(SPARK_DELETE_HELP_TIP);
    process.exit(1);
};

const deleteHelpInfo = () => {
    console.log("\x1b[1mSpark Delete Command\x1b[0m\n");
    console.log("\x1b[32mdelete - removes projects or databases\x1b[0m\n");

    console.log("\x1b[1mUsage:\x1b[0m");
    console.log("\tspark delete [NAME] --[OPTION]\n");

    console.log("\x1b[1mOptions:\x1b[0m");
    console.log("\t\x1b[33m--project\x1b[0m : delete a project folder");
    console.log("\t\x1b[33m--database\x1b[0m : delete a database");
    console.log("\t\x1b[33m--h\x1b[0m : show help\n");

    console.log("\x1b[1mDatabase Types:\x1b[0m");
    console.log("\t\x1b[33mpsql\x1b[0m : PostgreSQL\n");
};

export const deleteParseProjectName = (name) => {
    if (!name) deleteUsageError();

    if (name === "--h") {
        deleteHelpInfo();
        process.exit(0);
    }

    if (name.startsWith("--")) {
        console.log("[Error]: Option supplied instead of name");
        deleteUsageError();
    }
};

// ---------- Main Delete Functions ----------
export const deleteDatabase = (inputs) => {
    if (inputs.length < 3) {
        deleteUsageError();
    }

    const dbName = inputs[0];
    const dbFlag = inputs[1]; 
    const dbType = inputs[2]; 

    if (!dbName || dbName.startsWith("--")) {
        console.log("[Error]: Invalid database name");
        deleteUsageError();
    }

    if (dbFlag !== "--database") {
        console.log("[Error]: Missing --database option");
        deleteUsageError();
    }

    switch (dbType) {
        case "psql":
            console.log("deleting database...");
            deletePSQLDatabase(dbName);
            break;
        default:
            console.log("[Error]: Unknown database type");
            deleteUsageError();
    }
};