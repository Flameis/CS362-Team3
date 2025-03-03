# User Documentation

## Overview 
Welcome to Beaver Botanica, your new go-to tool for exploring and discovering the amazing plant life at Oregon State University! Whether you're a student, a visitor, or just a plant enthusiast, you’ll find it easy to use our interactive map to locate and learn about the plants around campus.

Getting started is simple! Just take a picture of any plant you come across, upload it to the platform, and watch the map fill in with plant locations across OSU. The best part? You’ll be able to see what’s in bloom throughout the year, thanks to our seasonal map layers. So, no matter when you visit, you can explore plants that are thriving at that time.

If you're a botany student, Beaver Botanica is a huge time-saver! You can easily find and study different plant species without wandering all over campus. And for nature lovers and visitors, this is the perfect way to discover plants you might never have noticed before. You’ll also get to interact with other users through features like liking and commenting on plant posts.

What makes Beaver Botanica unique is that it’s specifically designed for OSU. This means that unlike other general plant maps, you’ll have a focused, detailed look at the plants that grow right here on campus. It's a fun and social way to learn, interact, and share your discoveries with others who love plants just as much as you do.

So, dive in, explore the map, and let Beaver Botanica guide you through OSU’s rich plant life! Whether you're studying for class, enjoying a walk, or just curious about the plants around you, we hope you’ll have fun while you discover something new. Happy exploring!


## How to Install Beaver Botanica
Luckily for you, there's no need to install any software! All you need to do is navigate to our website, [BeaverBotanica.com](http://flip2.engr.oregonstate.edu:8070/map).


### Local Installation
You can install Beaver Botanica locally by cloning the Github which can be found at [this link](https://github.com/Flameis/CS362-Team3/tree/main)

Once installed on your machine, in the /demo/ folder, create a .env file and enter this information
    ```
    DB_HOST="67.222.47.90"
    DB_USER="mthopeac_OSU_Beta_Test"
    DB_PASSWORD="YG?)6YEe@R95pr."
    DB_NAME="mthopeac_OSU_PlantMap"
    API_PORT=8081
    PORT=8070
    JWT_SECRET_KEY="Test_Secret_Key"
    ```

## How to Run Beaver Botanica

Beaver Botanica can be accessed by going to this URL: [BeaverBotanica.com](http://flip2.engr.oregonstate.edu:8070/map)


### Running Locally
Open two of your operating system's terminal window and navigate to <parent-path>/CS362-Team3/demo in both. 
Run the following command in one window:

```npm install```

Once this finishes running, you're almost ready to view Beaver Botanica! Make sure you are on the OSU WiFi or connected to the OSU VPN before continuing.

Run the following command in one window:

```npm run api```

And wait for it to finish running executing.
In the other terminal window run:

```npm run react```

This will open Beaver Botanica in your browser! Happy plant hunting!!!!!!!!!!!!!!!

## How to Use Beaver Botanica
How to use the software. You can assume that your user is familiar with your particular platform (e.g., use of a Web browser, desktop applications, or mobile applications). For missing functionality, your documentation should simply indicate that this functionality is work in progress.

<Work in progress>
To add or view plant entries from the main menu, then select the "Map" options:

![Homepage Menu with Map option highlighted](https://github.com/Flameis/CS362-Team3/blob/main/project-docs/images/map_option.png?raw=true)

Navigate to your location on the map and click/press on the location of the plant. A marker will appear like below:
![Image of map with a plant marker](https://github.com/Flameis/CS362-Team3/blob/main/project-docs/images/example_marker.png?raw=true)

A button to place the plant will appear in the bottom middle of the screen, which you can press to enter the plant's information.
![A button on the map that says "Place Plant"](https://github.com/Flameis/CS362-Team3/blob/main/project-docs/images/place_plant_button.png?raw=true)

A menu will appear on the left side of the screen where you can enter the plant's information.
![A menu where a user can input the plant's species, description, location, season, and a link to an image of a plant](https://github.com/Flameis/CS362-Team3/blob/main/project-docs/images/plant_info_menu.png?raw=true)

When entering data for a plant, you can begin typing the plant's species in the text box, then press the dropdown menu underneath it to select the species from the list. 
Description: this should include any information or observations about the plant.
Location: this can be used to provide additional information about where the plant is. For example, something like "this plant is next to the bike racks, right by the pavement" will help other users find this plant more easily.
Season: enter the season you found the plant in.
Image URL: if you have an image that you can upload to a webserver to get a URL to the image (Github repos can do this), enter a link to the URL here.
Add Another Image: If you have additional images, press this and another "Image URL" entry box will appear.


## How to Report a Bug
To report a bug, you can access the [Issues section of the Beaver Botanica Github repository](https://github.com/Flameis/CS362-Team3/issues). Once at this page, press the “New issue” button in the top right of the page. 

When reporting a new bug, please use the following template (removing all content in angled brackets <>).

### Bug Report Template
Title: <Give a *brief* description of the error>

Date: <include the date (and time if possible) when you encountered the error>

Steps to reproduce error: <list the steps you went through to cause the error. Try to add as many relevant details as possible, such as information you submitted, page(s) where the error occurs, browser, and device type and brand. Organizing the steps in a list helps show the logical flow of actions.>

Description of error: <explain what the error is. This can include descriptions of unexpected data, error messages, and screenshots.>

**Example Report**

Title: “Cannot comment on a post for a plant instance”

Date: 2/21/2025, 4:09pm

Steps to reproduce error: 

1. I opened the website and logged into my account
2. I added a plant near OSU's library, but didn't fill in any information
3. I saved the plant instance
4. I clicked on the plant I had saved
5. I clicked "Add comment"
6. I got an error pop-up: "Error: Undefined reference (reading NULL)"

I'm using a Samsung Galaxy Note 9, and I'm running your website on Google Chrome.

Description of error: I got an error pop-up: "Error: Undefined reference (reading NULL)". I'm not a programmer, so I don't know what that means. Is the plant trying to hack my phone?? :(

### Known Bugs
As bugs are found, we will update this list to include them.
