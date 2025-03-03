# Beaver Botanica: The OSU Plant Map

## Documentation
[User Documentation](https://github.com/Flameis/CS362-Team3/blob/main/project-docs/User_Documentation.md)

[Developer Documentation](https://github.com/Flameis/CS362-Team3/blob/main/project-docs/Developer_Documentation.md)

[Living Document](https://github.com/Flameis/CS362-Team3/blob/main/project-docs/Beaver_Botanica.md)

## Repository and Trello
[Github](https://github.com/Flameis/CS362-Team3)

[Trello](https://trello.com/invite/b/67889462677f5d65a4989b33/ATTIe0f43054cfcbbfb3830f98380cd77a4bFBE38CB3/pt3-backups-made-simple)

## Members
* Adison Daggett - Front End Designer and Developer
* Kathryn Butler - Technical Documentation and Front End Developer
* Luke Scovel - Back End Developer
* William Brennan - Back End Developer
* Anshu Avinash - Front End Designer and Developer
* Finlay Curtiss - Technical Documentation and Front End Developer
* Jake Thompson - Back End Developer

# How to Run
1. Clone the repository from GitHub
2. Insert the `.env` file into the ./demo directory
3. Run `npm install` and `npm update` in the demo directory
4. Run `npm start` in the demo directory
5. React should start the server and open a browser window to `http://localhost:8070`
6. To see the raw plant data, navigate to `http://localhost:8081/api/plants`

# How to Test
1. Ensure the server is running by following the "How to Run" instructions.
2. Open a terminal and navigate to the `demo` directory.
3. Run `npm test` to execute the test suite.
4. Review the test results in the terminal to ensure all tests pass (They don't currently because of compatibility issues with jest itself).

# Operational Use Case
The current operational use case allows a user to add a known plant to the database and see it on the map. The user can also view the plant details by clicking on the plant icon on the map.