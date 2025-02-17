# Developer Documentation

## Overview
Hopefully you looked at the [User Documentation](User_Documentation.md) to get an understanding of what this project is about. If not, feel free to check it out!

The campus of OSU is home to a wide diversity of plants contributed by talented botanists over the years. It is hard for new botany students to know where all these plants are. They are left with little option save to ask for help from professors or explore the campus themselves. Our goal is to help these botany students by providing them with an online map that can tell them where plants lie on OSU’s campus. 

## How to Get the Source Code
Thankfully, all the code is located right here in GitHub! To obtain it, navigate to [the source folder](https://github.com/Flameis/CS362-Team3/tree/main/src).


## Directory Structure
0000 The layout of your directory structure. What do the various directories (folders) contain, and where to find source files, tests, documentation, data files, etc.

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
0000


### Other Files
0000


## Building Beaver Botanica
0000 How to build the software. Provide clear instructions for how to use your project’s build system to build all system components.


## Testing Beaver Botanica
### Running Tests
0000 How to test the software. Provide clear instructions for how to run the system’s test cases. In some cases, the instructions may need to include information such as how to access data sources or how to interact with external systems. You may reference the user documentation (e.g., prerequisites) to avoid duplication.


### Adding New Tests
0000 How to add new tests. Are there any naming conventions/patterns to follow when naming test files? Is there a particular test harness to use?


## Building a New Release
0000 How to build a release of the software. Describe any tasks that are not automated. For example, should a developer update a version number (in code and documentation) prior to invoking the build system? Are there any sanity checks a developer should perform after building a release?
