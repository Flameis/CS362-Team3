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

# How to Install
1. Ensure you have Node.js and npm installed. You can download them from [Node.js](https://nodejs.org/).
2. Clone the repository from GitHub:
    ```sh
    git clone https://github.com/Flameis/CS362-Team3.git
    ```
3. Navigate to the project directory:
    ```sh
    cd CS362-Team3
    ```
4. Insert the `.env` file into the `./demo` directory. The `.env` file should contain the following variables:
    ```
    DB_HOST="67.222.47.90"
    DB_USER="mthopeac_OSU_Beta_Test"
    DB_PASSWORD="YG?)6YEe@R95pr."
    DB_NAME="mthopeac_OSU_PlantMap"
    API_PORT=8081
    PORT=8070
    JWT_SECRET_KEY="Test_Secret_Key"
    ```

# How to Run
1. Navigate to the `demo` directory:
    ```sh
    cd demo
    ```
2. Install the dependencies:
    ```sh
    npm install
    npm update
    ```
3. Start the server:
    ```sh
    npm start
    ```
4. React should start the server and open a browser window to `http://localhost:8070`.
5. To see the raw plant data, navigate to `http://localhost:8081/api/plants`.

# How to Test
1. Go to `http://localhost:8070/register` and create a new account.
2. Log in to the account.
3. Click on the map to add a plant.
4. Click on the plant icon to view the plant details.


# Operational Use Case
The current operational use case allows a user to add a known plant to the database and see it on the map. The user can also view the plant details by clicking on the plant icon on the map.