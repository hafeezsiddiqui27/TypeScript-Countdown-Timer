#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const date_fns_1 = require("date-fns");
//displaying welcome message
console.log(chalk_1.default.green.yellow(`\n  \t\t <<<================================================>>>`));
console.log(chalk_1.default.bold.blue(`<<<=========>>>  ${chalk_1.default.green.bold("Welcome To 'Hafeez Siddiqui' - Countdown Timer")}  <<<=========>>>`));
console.log(chalk_1.default.bold.yellow(`\t\t <<<===============================================>>>\n`));
// countdown timer : step 1
function* countdowntimer(second) {
    //while loop
    while (second > 0) {
        yield second;
        second--;
    }
}
//function to create a countdown timer
function displaycountdown(second) {
    //timer initialization :step 2
    let timer = countdowntimer(second);
    function display() {
        // value below 10
        let result = timer.next();
        // if else condition apply
        if (!result.done) {
            const now = new Date();
            //calculation in minutes
            const countdowntime = new Date(now.getTime() + result.value * 1000);
            //calculation in seconds
            const remainingseconds = (0, date_fns_1.differenceInSeconds)(countdowntime, now);
            console.log(chalk_1.default.blueBright(`Remaining seconds : 00 : ${remainingseconds}`));
            setTimeout(display, 1000); //1 sec is = 1000ms
        }
        else {
            console.log(chalk_1.default.green(`Countdown Complete!`));
        }
    }
    //invoke
    display();
}
// Prompt user for input using inquirer
inquirer_1.default
    .prompt([
    {
        type: "input",
        name: "seconds",
        message: chalk_1.default.green("Enter the number of seconds for the countdown timer:"),
        validate: function (value) {
            const parsedValue = parseInt(value);
            if (Number.isInteger(parsedValue) && parsedValue > 0 && parsedValue <= 3600) {
                return true;
            }
            return chalk_1.default.red("Please enter a valid positive integer (1 to 3600)for seconds.");
        },
    },
])
    .then((answers) => {
    const seconds = parseInt(answers.seconds);
    console.log(chalk_1.default.magentaBright(`Starting countdown timer for ${seconds} seconds...`));
    displaycountdown(seconds);
})
    .catch((error) => {
    console.log(chalk_1.default.red("Error while prompting:", error));
});
