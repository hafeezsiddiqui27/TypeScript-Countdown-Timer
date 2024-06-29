#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";



//displaying welcome message
console.log(
  chalk.green.yellow(
    `\n  \t\t <<<================================================>>>`
  )
);
console.log(
  chalk.bold.blue(
    `<<<=========>>>  ${chalk.green.bold(
      "Welcome To 'Hafeez Siddiqui' - Countdown Timer"
    )}  <<<=========>>>`
  
  )
);
console.log(
  chalk.bold.yellow(
    `\t\t <<<===============================================>>>\n`
  )
);



// countdown timer : step 1

function* countdowntimer(second: number) {
  //while loop
  while (second > 0) {
    yield second;
    second--;
  }
}

//function to create a countdown timer
function displaycountdown(second: number) {
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
      const remainingseconds = differenceInSeconds(countdowntime, now);
      console.log(chalk.blueBright(`Remaining seconds : 00 : ${remainingseconds}`));

      setTimeout(display, 1000); //1 sec is = 1000ms
    } else {
      console.log(chalk.green(`Countdown Complete!`));
    }
  }
  //invoke
  display();
}

// Prompt user for input using inquirer
inquirer
  .prompt([
    {
      type: "input",
      name: "seconds",
      message: chalk.green("Enter the number of seconds for the countdown timer:"),
      validate: function (value) {
        const parsedValue = parseInt(value);
        if (Number.isInteger(parsedValue) && parsedValue > 0 && parsedValue <=3600 ) {
          return true;
        }
        return chalk.red("Please enter a valid positive integer (1 to 3600)for seconds.");
      },
    },
  ])
  .then((answers) => {
    const seconds = parseInt(answers.seconds);
    console.log(chalk.magentaBright(`Starting countdown timer for ${seconds} seconds...`));
    displaycountdown(seconds);
  })
  .catch((error) => {
    console.log(chalk.red("Error while prompting:", error));
  });


