#!/usr/bin/env node

import { help_info } from "./helpers/cli-help-info.js";
import { actions } from "./helpers/action-list.js";
import { create } from "./actions/create.js";
import { TIP_MESSAGE } from "./helpers/messages.js";
import { delete_action } from "./actions/delete.js";

const args = process.argv;
const userInputs = args.slice(2);
const userAction = userInputs[0];

if (actions.includes(userAction)) {
    
    if(userAction === "--h" || userAction === "help") help_info();
    if(userAction === "create") create(userInputs);
    if(userAction === "delete") delete_action(userInputs);

} else {
    console.log("[Error]: incorrect usage!");
    console.log("[Usage]: spark [ACTION]");
    console.log(TIP_MESSAGE);
    process.exit(1);
}