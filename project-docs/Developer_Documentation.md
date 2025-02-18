# Developer Documentation

## Overview
Hopefully you looked at the [User Documentation](User_Documentation.md) to get an understanding of what this project is about. If not, feel free to check it out!

The campus of OSU is home to a wide diversity of plants contributed by talented botanists over the years. It is hard for new botany students to know where all these plants are. They are left with little option save to ask for help from professors or explore the campus themselves. Our goal is to help these botany students by providing them with an online map that can tell them where plants lie on OSU’s campus. 

## How to Get the Source Code
Thankfully, all the code is located right here in GitHub! To obtain it, navigate to [the source folder](https://github.com/Flameis/CS362-Team3/tree/main/src).


## Directory Structure
### Home
The home directory contains the design, project-docs, src, and weekly-reports folders, which are elaborated on below. It also contains the .gitignore file, the README.md file, package-lock.json, and package.json. The .gitignore file conteins files that git should ignore when committing and pushing, in order to save data across multiple workspaces.

The README.md file contains 0000.

The package-lock.json and package.json files do 0000.


### Design
0000 work in progress


### Project-Docs
0000 work in progress


### Src
Inside our [source folder](https://github.com/Flameis/CS362-Team3/tree/main/src), you will find several folders: backend, frontend, generate-species-list[0000 are we keeping this folder?], pages, and styles.

Located in our backend folder is our api.js, event-listener.js, and testing-port.js. Our api.js contains the code that allows us to connect to our database. It also contains scripts to manage and display data from the database, such as getting a specific user by ID or getting all plant species. Our event-listener.js is in charge of - you guessed it - listening to events. It detects errors and can add plants. 

In our frontend folder, we have our server.js. This serves static files from the frontend directory, and displays plants. 0000 there's probably a lot more files that will be added here.

Our generate-species-list folder includes our landscapeplants.json file, various parser files, and a landscapeplants_plant-page_parser.js file. Our landscapeplants.json file contains the landscape plants parsed from [OSU's horticulture website](https://landscapeplants.oregonstate.edu/). The parser files contain iterations of the landscape plant parser described in landscapeplants_plant-page_parser.js. The parser takes information from the horticulture website and converts it into a json file containing the plant information we need. 

Our pages folder contains display-plants.html, 0000 and other files. The display_plants.html file displays a table of plants and their respective attributes. 0000 there's probably a lot more files that will be added here.

In our styles folder, we have styles.css. This provides style guidelines for our platform, and includes details for the body, the sidebar, and various navigation buttons. 0000 there's going to be more styles here.


### Weekly-Reports
The weekly reports folder contains our weekly reports and progress updates from 1.15.25 to 3.19.25, the span of out 11-week timeline. Each report contains team and individual progress we've made on our goals for the past week, and our goals for the upcoming week.


## Building Beaver Botanica
### This is currently a work in progress and is subject to change. The information here works as of 2/17/2025.
Before beginning, ensure that you have Node and npm installed, which can be done by following [this guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
Clone the Github repository to your local machine, open a command line and navigate to the directory you created.

Enter the following to install all needed modules:

```npm install```

Once this finishes, make sure your IP has been whitelisted for access to the database and you have the necessary environment variables file in your project repository. More information on this process can be found here: 0000 WORK IN PROGRESS.

To connect to the database, enter the following command:

```node --env-file=[codeDirectoryPath]/.env [codeDirectoryPath]/src/backend/api.js```

where [codeDirectoryPath] is the absolute path to your project directory.

To run the frontend, ensure you are not connected to the database and run the following:

```node -r dotenv/config [codeDirectoryPath]/src/frontend/server.js```

where [codeDirectoryPath] is the absolute path to your project directory.


## Testing Beaver Botanica
### Running Tests
0000 How to test the software. Provide clear instructions for how to run the system’s test cases. In some cases, the instructions may need to include information such as how to access data sources or how to interact with external systems. You may reference the user documentation (e.g., prerequisites) to avoid duplication.


### Adding New Tests
0000 How to add new tests. Are there any naming conventions/patterns to follow when naming test files? Is there a particular test harness to use?


## Building a New Release
0000 How to build a release of the software. Describe any tasks that are not automated. For example, should a developer update a version number (in code and documentation) prior to invoking the build system? Are there any sanity checks a developer should perform after building a release?
