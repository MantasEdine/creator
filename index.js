#!/usr/bin/env node
import inquirer from 'inquirer'
import chalk from 'chalk'; 
import figlet from 'figlet'
import shell from 'shelljs'

const init = () => {
  const banner = figlet.textSync("Node F*cking JS", {
    font: "Standard", // Try 'Standard', 'Slant', or 'Big'
    horizontalLayout: "default",
    verticalLayout: "default",
    width: process.stdout.columns
  });

  console.log(
    chalk.green.bold('\n' + banner + '\n')
  );
};

const askQuestions = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "What is the name of the file without extension?"
    },
    {
      type: "list",
      name: "EXTENSION",
      message: "What is the file extension?",
      choices: [".txt", ".pdf", ".html", ".js"],
      filter: function(val) {
        return val.split(".")[1];
      }
    }
  ];
  return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
  const filepath = `${process.cwd()}/${filename}.${extension}`;
  shell.touch(filepath);
  return filepath;
};

const success = filepath => {
  console.log(
    chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
  );
};

const run = async () => {
  init();
  const answers = await askQuestions();
  const { FILENAME, EXTENSION } = answers;
  const filepath = createFile(FILENAME, EXTENSION);
  success(filepath);
};

run();
