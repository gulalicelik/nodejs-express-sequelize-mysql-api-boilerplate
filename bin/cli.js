#!/usr/bin/env node
const util = require('util');
const path = require('path');
const fs = require('fs');

// Utility functions
const exec = util.promisify(require('child_process').exec);
async function runCmd(command) {
    try {
        const { stdout, stderr } = await exec(command);
        console.log(stdout);
        console.log(stderr);
    } catch {
        (error) => {
            console.log(error);
        };
    }
}


// Validate arguments
if (process.argv.length < 3) {
    console.log('Please specify the target project directory.');
    console.log('For example:');
    console.log('    npx create-nodejs-app my-app');
    console.log('    OR');
    console.log('    npm init nodejs-app my-app');
    process.exit(1);
}

// Define constants
const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/gulalicelik/nodejs-express-sequelize-mysql-api-boilerplate.git';

// Check if directory already exists
try {
    fs.mkdirSync(appPath);
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log('Directory already exists. Please choose another name for the project.');
    } else {
        console.log(err);
    }
    process.exit(1);
}

async function setup() {
    try {
        // Clone repo
        console.log(`Downloading files from repo ${repo}`);
        await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
        console.log('Cloned successfully.');
        console.log('');

        // Change directory
        process.chdir(appPath);

        // Install dependencies

        console.log('Installing dependencies...');

        await runCmd('npm install');

        console.log('Dependencies installed successfully.');
        console.log();


        // Delete .git folder
        await runCmd('npx rimraf ./.git');

        // Remove extra files
        fs.unlinkSync(path.join(appPath, 'bin', 'cli.js'));
        fs.rmdirSync(path.join(appPath, 'bin'));
        fs.unlinkSync(path.join(appPath, 'CHANGELOG.md'));


        console.log('Installation is now complete!');
        console.log();

        console.log('We suggest that you start by typing:');
        console.log(`run: cd ${folderName}`);
        console.log(`edit config/config.json file and change your database name, username and password`);
        console.log('run: npm run prepare');
        console.log('run: npm run start:dev');
        console.log('run: pm2 list');
        console.log('run: pm2 logs');
        console.log();
        console.log('Enjoy your Node.js API boilerplate!');
        console.log('Check README.md for more info.');
    } catch (error) {
        console.log(error);
    }
}

setup();