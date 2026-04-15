export const help_info = () => {
    console.log("\x1b[1mSparkkit Command Line Interface (CLI)\x1b[0m");
    console.log("\n");
    console.log("\x1b[32mSparkkit - an easy to use dev kit\x1b[0m");
    console.log("\n");
    console.log("\x1b[1mUsage:\x1b[0m");
    console.log("\tspark \x1b[1m[ACTION]\x1b[0m");
    console.log("\n");
    console.log("\x1b[1mActions:\x1b[0m");
    console.log("\t\x1b[33mcreate\x1b[0m : creates template project and database");
    console.log("\t\x1b[33mdelete\x1b[0m : deletes template project and database");
    console.log("\t\x1b[33mhelp, --h\x1b[0m : displays help");
    console.log("\n");
    process.exit(0);
};