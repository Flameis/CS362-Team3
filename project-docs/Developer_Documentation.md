# Developer Documentation

## Overview
Hopefully you looked at the [User Documentation](User_Documentation.md) to get an understanding of what this project is about. If not, feel free to check it out!

The campus of OSU is home to a wide diversity of plants contributed by talented botanists over the years. It is hard for new botany students to know where all these plants are. They are left with little option save to ask for help from professors or explore the campus themselves. Our goal is to help these botany students by providing them with an online map that can tell them where plants lie on OSU’s campus. 

## How to Get the Source Code
Thankfully, all the code is located right here in GitHub! To obtain it, navigate to [the source folder](https://github.com/Flameis/CS362-Team3/tree/main/src).


## Directory Structure
### Home
The home directory contains the design, project-docs, src, and weekly-reports folders, which are elaborated on below. It also contains the .gitignore file, the README.md file, package-lock.json, and package.json. The .gitignore file conteins files that git should ignore when committing and pushing, in order to save data across multiple workspaces.

The README.md file contains general developer information and instructions on both how to test the software and how to run it locally. We also include how to install the websites dependencies and how to run it on the local host.

The package-lock.json and package.json files do (0000).


### Demo / Design
#### This is currently a work in progress and is currently undergoing structural changes. 
Inside our [source folder](https://github.com/Flameis/CS362-Team3/tree/main/demo), you will find several folders: backend, frontend, generate-species-list[0000 are we keeping this folder?], pages, and styles.

Located in our backend folder is the api.js. The api.js contains the code that allows us to connect to our database. It also contains scripts to manage and display data from the database, such as getting a specific user by ID or getting all plant species. It also manages posting new entries to the database, updated old ones, or even deleting them.

Our generate-species-list folder includes our landscapeplants.json file, various parser files, and a landscapeplants_plant-page_parser.js file. Our landscapeplants.json file contains the landscape plants parsed from [OSU's horticulture website](https://landscapeplants.oregonstate.edu/). The parser files contain iterations of the landscape plant parser described in landscapeplants_plant-page_parser.js. The parser takes information from the horticulture website and converts it into a json file containing the plant information we need. 

The src folder contains all of the React pages and style sheets. It will contain everything needed to display the pages on the client.

Our pages folder contains Login.html, Register.html, Map.html, Plants.html, and other files. The Plants.html file displays a table of plants and the ability to filter through them. Login and Register are the general log in and acocunt registration features. Map is our main menu and hub for acitivity, you will be able to place a plant onto the map and fill out the needed information for it. Account is the general settings page and includes the function to log out. 

In our styles folder, we have style.css. This provides style guidelines for our platform, and includes details for the body, the sidebar, and various navigation buttons. It is the main file that contains all of our styling for our webiste. 


### Project-Docs
Our project-docs folder contains all the documents and presentations that went into making Beaver Botanica. In md2html, we have a small script that converts a markdown file into a more palatable html file. This was designed to more easily convert our living document iterations into releasable pdfs.

Our presentations folder contains our project idea powerpoint, which we presented to our class to garner interest and potential applicants to our team. The folder also contains our software architecture powerpoint, which was presented to the class and includes details about the high-level architecture of our platform. We also have links to the direct Google Slides and Google Docs that we developed to present.

All other files are located in the main project-docs folder. Beaver_Botanica.md contains our living document, which is updated periodically to maintain accuracy and relevancy as our platform evolves. Our developer documentation is listed here, as well as our user documentation. Our initial project proposal is located here as well, although it is a little outdated and does not reflect our current plans for our project.


### Weekly-Reports
The weekly reports folder contains our weekly reports and progress updates from 1.15.25 to 3.19.25, the span of out 11-week timeline. Each report contains team and individual progress we've made on our goals for the past week, and our goals for the upcoming week.


## Building Beaver Botanica
### This is currently a work in progress and is subject to change. The information here works as of 2/17/2025.
Before beginning, ensure that you have Node and npm installed, which can be done by following [this guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
Clone the Github repository to your local machine, open a command line and navigate to the demo directory inside of directory you created.

Enter the following command to install all needed modules:

```npm install```

Once this finishes, make sure your IP has been whitelisted for access to the database and you have the necessary environment variables file in your project repository. More information on this process can be found here: 0000 WORK IN PROGRESS.

### Launching the website and api on your local machine

Open a terminal in the demo directory and run the following command:

```npm start```

The system will now automatically open up a webpage on your default browser to localhost:3000

## Testing Beaver Botanica
## Testing
1. Ensure the server is running by following the "How to Run" instructions in the [User Documentation](User_Documentation.md).
2. Open a terminal and navigate to the `demo` directory.
3. Run the test suite:
   ```sh
   npm test
   ```
4. Review the test results in the terminal to ensure all tests pass.


## Test-Automation and CI

### Test-Automation Infrastructure
We use Jest as our test-automation infrastructure. Jest is a JavaScript testing framework maintained by Facebook, designed to ensure correctness of any JavaScript codebase.

**Justification:**
- Jest is easy to set up and has a simple API.
- It provides a great developer experience with features like snapshot testing and a powerful mocking library.
- Jest is widely used in the industry and has good community support.

### Adding a New Test
1. Create a new test file in the `__tests__` directory inside the `demo/src` directory.
2. Write your test cases using the Jest framework.
3. Run the tests locally using:
   ```sh
   npm test
   ```

### Continuous Integration (CI) Service
We use GitHub Actions as our CI service. GitHub Actions allows us to automate workflows directly from our GitHub repository.

**Justification:**
- GitHub Actions is tightly integrated with GitHub, making it easy to set up and use.
- It provides a generous free tier for open-source projects.
- GitHub Actions supports a wide range of CI/CD workflows and has a large number of pre-built actions available.

### Pros/Cons Matrix for CI Services

| CI Service       | Pros                                                                 | Cons                                                      |
|------------------|----------------------------------------------------------------------|-----------------------------------------------------------|
| GitHub Actions   | Easy integration with GitHub, generous free tier, flexible workflows | Limited to GitHub repositories                            |
| Travis CI        | Supports multiple languages, good documentation                      | Limited free tier, slower build times                     |
| CircleCI         | Fast builds, good Docker support                                     | Complex configuration, limited free tier for open-source  |

### CI Build Execution
- **Tests Executed:** All unit tests, integration tests, and system tests.
- **Triggers:** CI builds are triggered on every push to the `main` branch and on every pull request.

### Setting Up CI with GitHub Actions
1. Create a `.github/workflows` directory in the root of your repository.
2. Add a new workflow file (e.g., `ci.yml`) with the following content:
   ```yaml
   name: CI

   on:
     push:
       branches:
         - main
     pull_request:
       branches:
         - main

   jobs:
     build:
       runs-on: ubuntu-latest

       steps:
         - name: Checkout code
           uses: actions/checkout@v2

         - name: Set up Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '14'

         - name: Install dependencies
           run: npm install

         - name: Run tests
           run: npm test
   ```
3. Commit and push the workflow file to your repository. GitHub Actions will automatically run the CI workflow on every push and pull request to the `main` branch.


## Building a New Release
1. Ensure all tests pass by running the test suite.
2. Update the version number in `package.json` according to the changes made.
3. Commit the changes and push to the repository:
   ```sh
   git add .
   git commit -m "Release version <version_number>"
   git push origin main
   ```
4. Create a new release on GitHub with the updated version number and release notes.
