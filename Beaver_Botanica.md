# Beaver Botanica: The OSU Plant Map

## GitHub Repository and Trello
[Github](https://github.com/Flameis/CS362-Team3)  
[Trello](https://trello.com/invite/b/67889462677f5d65a4989b33/ATTIe0f43054cfcbbfb3830f98380cd77a4bFBE38CB3/pt3-backups-made-simple)

## Communication Channel and Rules
Communications Channels:
* MS Teams
* Text group chat

Rules:
* MS Teams will be used for non-imperative communication. Non-imperative communication includes questions, discussions, or helpful status updates regarding the group project.
* All members must check MS Teams once a day and respond within a day of a message being sent.
* A texting group chat will be used for conveying time-sensitive information. If a problem has to be addressed within a day then it is considered time-sensitive.
* All members must be able to receive and respond to a text message within 4 hours of it being sent.

# Product Description
## Abstract
The campus of OSU is home to a wide diversity of plants contributed by talented botanists over the years. It is hard for new botany students to know where all these plants are. They are left with little option save for asking for help from professors or exploring the campus themselves. Our goal is to help these botany students by providing them an online map that can tell them where plants lie on OSU’s campus. This project is a plant identification app for the Oregon State University campus. Users will take pictures of plants around campus, identify them, and upload them to a website that will show a map of campus with the locations of each identified plant. There will be layers to the map for each season, so users can see what plants are in bloom at any given time. Each plant, when clicked on, will show details of the plant that the user provides.

## Goal
Our goal for this software before the end of the term is to create a map of plants on campus and allow for users to upload pictures and descriptions of plants to OSU Plant Map's database. Our end goal is to allow any student at OSU the ability to look-up and identify plants around the OSU campus.

## Current Practice
Plants are everywhere in Oregon. In this state alone, forests cover 30.5 million acres, or almost half the state. With how important plants are in our day-to-day lives, these resources below are some of the only ways we can learn about our local flora:

* The botany department currently has a [tree inventory map](https://www.arcgis.com/apps/instant/basic/index.html?appid=097214a28e934a7681e229b41c9e0d29), but it is specific to trees and is simply an inventory system.
* The website Pl@ntNet has a [global plant map](https://identify.plantnet.org/), but it only shows broad regional areas of where plants grow.
* The website OregonFlora has a [Oregon plant map](https://oregonflora.org/checklists/dynamicmap.php?interface=key), but it can be hard to search through and is unhelpful to non-botanists.

It’s because of this that we want to be able to create something that is both in-depth and local to what we live with here at OSU. An application like this can increase awareness and education about local flora while keeping it open for anyone to use regardless of their background in botany.

## Novelty
The novelty of this project is that it will be a social media plant identification app specifically for the Oregon State University campus. Making our app restricted to the OSU campus will allow us to make the plant map more "zoomed in" on an area. This is novel because most maps of plants that are out there are catalogs of plants in a region, which don't allow users to find more specific locations of plants. Our app will be a user driven plant identification system that will allow users to identify and map plants on campus themselves, as well as drive social interaction based around the plants. 

## Effects
The target audience of Plant Map will be botany students and other such interested parties at OSU. With this software they will be able to easily look up and find plants around the OSU campus. This will save them time looking around to identify a plant and it will also help them study various plant types at OSU. Additionally, this software will help entertain visitors and regular students of OSU by giving them a tool to find cool plants around campus that they may not have otherwise known existed.

## Technical Approach
The idea is to use a SQL database that holds each plant identified by the users. The website will display a map and overlay each plant's location using the Google Maps API and querying the database through code. We are still deciding on how exactly we will build the website.

## Risks
One of the largests risks with developing OSU Plant Map software is in making sure the system is scalable. We, as a 7 person team, will not be able to map out all the plants spanning the whole OSU campus. Our solution to this will be allowing users of OSU Plant Map to upload pictures and information to the database.  

With the large amount of plants and people we will need to make sure our software can be scaled up to allow for more information. This will be difficult as we will have to think ahead and design our system carefully. To mitigate this risk, our team will research early on how to make our system scalable so that we always code with the expectation of scalability.

## Major Features
* Movable map interface that displays plant locations
* Seasonal layers on the map
* Plant descriptions and details
* Social media features such as commenting and liking plants

## Stretch Goals
* User profiles and leaderboards
* Plant identification AI integration

# Requirements
## Functional Requirements
### Searching for a Plant - Adison
Actors: A OSU Student  
Goal: To search for a plant  
Triggers: The user can recognize the plant based on the image displayed after filtering the results.  
Preconditions: the user searches for the plant by sorting through media results.  
Step: The user sorts the media by taxonomic classification.  
Postconditions: The plant they are looking for will be displayed with a detailed description of what it is.  
Extensions: The user is unable to find the plant they are looking for, but is able to change that by registering it into the software.  
Exceptions: The plant does not show up because it has yet to be catalogued.  

### Adding a Known Plant to the Database - Kathryn
Actors: A OSU student or faculty member.  
Goal: To add a plant instance to the database. The plant type is already in the database.  
Trigger: The user fills out all plant information and clicks the “submit” button.  
Preconditions: the user searches for the plant by sorting through media results.  
Steps:
* The user begins to add the plant, through clicking on an “Add plant” button.
* The user inputs the common name and scientific name of the plant.
* The user is prompted to take a picture of the plant.
* The user is asked to give a location on a map where this plant was found.

Postconditions: The plant instance is added to the database with a label of “unverified” or a similar marking to avoid mislabeling plants. The map is updated to add the plant instance.  
Extensions: The user could decline to take a picture of the plant, which could still go though as a successfully added plant instance. The user might also stop in the middle of adding a plant, in which case the software would either save the progress or discard it.  
Exceptions: The user may not find the plant they’re looking for, in which case they would be directed to a form requesting the addition of a new plant.

### Commenting on a Post - Luke
Actors: A OSU Student  
Triggers: The user fills out a comment box with text (maybe with images?) and clicks submit.  
Preconditions: The user is logged in to the website and on the map page. At least one post has been made.  
Steps: 
* The user clicks on the desired plant post on the map
* The system displays the plant details page
* The user clicks on the comment button
* The user enters text into the comment box
* The user clicks the submit button
* The system refreshes the page and displays the comment at the end of the comment chain for all users.

Postconditions: The comment is now displayed for all users on the post.  
Extensions: 
* The user can cancel their comment by clicking on the cancel button or by navigating away from the page.
* The user times out
* The user saves the comment as a draft
* The user is an administrator and pins the comment

Exceptions: 
* The text contains invalid characters
* The text contains a spam link
* No text is provided
* An image is the wrong format
* The post is deleted before the comment is posted

### Verifying User-Added Plant Entries - William
Actors: Beaver Botanica moderator  
Trigger: The user clicks on the verify button on a plant post.  
Preconditions: A plant entry with the unverified property is in the database.  
Steps:
* The user logs in using their moderator account.
* The user clicks on one of the plants on the map.
* The user can scroll through the description of the plant to check its attributes.
* If the plant is unverified the user clicks on a verify button to verify it.

Postconditions: The plant entry that had the unverified property gets the verified property.  
Extensions: In the case that a moderator clicks on a plant entry and does not want to verify it, they can remove the plant entry by clicking on the delete post button. This will remove the plant entry from the database and map.</br>
Exceptions: In the event that clicking on a verify button does not add the verified property to a plant, the user will receive a message notifying them that the plant was unsuccessfully verified.
If a plant was already verified then clicking on the verify button will not change the property of the plant, and the user will receive a message notifying them the plant was already verified.

### Editing a Plant’s Details - Anshu
Actors: OSU Student or faculty member. 
Goal: To edit the details of the plant entry in the database.
Trigger: On the plant's detail page, the user selects the "Edit Plant" button.   
Preconditions: The user might be the original submitter and has the authority to change the plant data. 
Steps:
* The user accesses the information page of the plant.
* The user selects the "Edit Plant" button.
* The system shows a form with the current plant information already filled in (e.g., common name, scientific name, description, location, image).
* The user changes the desired fields, like adding a new image or changing the plant's name and description.
* User clicks on the "save change" button to confirm the edits.

Postconditions: New plant details have been added to the data. The plant details page reflects the uploaded information.  
Extensions: By using the "cancel" option, the user can edit, remove the modifications, and return to the plant's information page. If a user uploads an image in a format that isn't supported, the system will prompt them to upload an image in a format that is accepted such as JPEG or PNG. 
Exceptions: When a user leaves a mandatory field empty, the system indicates an error and asks them to fill it up. When the user enters an incorrect value, such as a special character in the plant name, then the system verifies the information and displays an error notification.   

### Navigating to a Plant’s Location - Finlay
Actors: A user of the Beaver Botanica app.  
Goal: The user should be able to find the locations of a certain plant on the OSU campus and get directions to the plant’s location.  
Triggers: The user is viewing a specific plant after searching and then presses the button that opens the map view. The user then selects a location and chooses to get directions to it.  
Preconditions: At least one plant is in the database and that plant has at least one location placed on the map.  
Steps:  
* Selects a plant after entering a search query
* Open the map view for that plant to view all locations of the plant
* Select one location marker and click the “Get Directions” button
* The application will then display directions to reach the selected location  

Postconditions: The application displays a map view with any locations for the plant displayed as markers.  
Extensions: The user might not choose to receive directions to the plant’s location, instead navigating by themselves.   
Exceptions: A plant might not have a location associated with it, in which case the map would not display any locations and the user would not be able to get directions. The mapping service we use might also be down, which would cause no map to be displayed to the user, meaning they couldn’t get directions.

### Filtering the Map - Jake

Actors: An OSU Student  
Goal: To view the locations of all plants in a specific Genus that are in season  
Triggers: The user clicks the filter button  
Preconditions: The user is on the Map page and has a specific Genus in mind they want to see locations for plants that are in season.  
Postconditions: The map shows the locations of all plants that match the given filter.  
Steps:

* The user clicks the filter button
* The system displays the filter sidebar (this will hide the add or Info sidebars)
* The user either selects the desired Genus from the Genus dropdown or starts typing in the dropdown to find it faster (for got what this input type is actually called) 
  * The system should then fill higher level taxonomy filters
* The user checks the box in season
* The System Filters the map based on the set filters

Extensions/variations:

* The user changes their mind and wants to clear the filters this can be done with the clear all button
* The user decides they actually wanted a different genus in the same family
  * Now they just select the genus dropdown and it should only show genus in that family
  * Should also clear all taxonomy filters below genus.
* The user decides they actually wanted to see the whole Family
  * The user clicks the clear button for Genus

Exceptions:
* The user can’t find the desidered genus in the drop down
  * This should mean that there are no plants in that genus in the database.
  * Maybe suggest Advanced Search as the result might be misfiled.
* There is nothing on the map
  * This means that no plants of that genus are in season.
  * Should display a message that no plants are in season for a given filter and recommend turning off the in season filter.


## Non-Functional Requirements
### Dark Mode and High-Contrast Mode
Both modes improve user accessibility by providing alternative color schemes, such as dark mode for low-light environments and high-contrast mode for users with visual impairments or color blindness. They must load without impacting software speed, and may automatically adjust based on the user’s device settings. The user must be able to activate dark or high-contrast mode in no more than four clicks. The colors used in high-contrast mode must be tested to comply with industry standards.

### Expandability
The software should be able to store and display all plants on the OSU campus (2000+) and also allow them to be searched. With the software allowing more plants to be added, it enables the users to add plants that aren't already in the system so they can all be catalogued.

### Incorrect/Malicious Entry Prevention
The software should prevent users from creating incorrect or malicious entries for plants and/or their locations. It should be built in a way that totally prevents these entries being displayed as correct information or removes it from the database and software quickly. 

## External Requirements
### Error-Free
The software needs to be able to prevent errors and crashes from occurring. This can be done by being able to look out for common system errors such as no results popping up when a user searches for something, invalid inputs, and failure to save things. Certain types of input such as images with an unknown format or non-valid characters will be sanitized or fully blocked to prevent errors.

### Installable
The website will be accessible to a range of devices, allowing more users to access the service. A mobile version of the website is absolutely necessary since users will be walking around with it on their phones. The URL will be publicly available.

### Buildable
The software should have up-to-date documentation that allows other developers to set it up, allowing the project to extend to other college campuses or locations. The software should also allow developers to customize their version of the application by doing things like using a different map, different plants, or any other changes to features.

### Scope
This software should be well-designed and have a robust number of bug-free features, as listed in the functional and non-functional section of the Project Proposal document.

# Timeline
## Week 3 - Planning and Foundation
Goals: Finalize requirements, set up basic infrastructure, and assign roles.  
Tasks:
* Finalize the app's functional requirements.
* Break down tasks into use cases.
* Assign roles to team members (e.g., developer, UI/UX designer, documentation).

Backend Team:

* Design a basic database schema to store plant information and user data.
    Measurable Goal: Have a plant table, and user tables.
* Set up the development environment (e.g., version control, frameworks, initial database setup).
    Measurable Goal: Have all things needed installed and folder structure created

Front End Team:

* Begin wireframing the user interface (UI).
    Measurable Goal: Have all pages designed so we can get feedback at the start of next week.

Interaction Team (Front end to Back End Interaction Team):

* Help out the other teams.

Deliverables:
* Project Requirements Elicitation.
* Development environment ready.
* Wireframe drafts for key screens.

## Week 4 - Map and Database
Goals: Develop the interactive map and basic database functionality.  
Tasks:

Backend Team:

* Create the database structure for plant information, including taxonomic classification, images, and locations.

Front End Team:

* Continue refining wireframes based on feedback.  
* Implement a basic campus map.
* Enable users to view plants pinned on the map.

Interaction Team:

* Enable users to view plants pinned on the map.
* Integrate the database with the map to display plant data dynamically.


Deliverables:  
* Project Architecture and Design Specifications.
* Functional campus map with placeholders for plants.
* Database connected to the map.

## Week 5 - Plant Identification and Upload

Goals: Implement plant identification prompts and the information and file upload features.  
Tasks:  


Backend Team:

* Allow for the database to store photos

Front End Team:

* Design the UI for adding plants.
* Allow for a user to upload a photo.
* Allow someone to identify a plant based on the photo.
* Allow a user to add information to an identified plant.
* Add prompts to help users identify plants.

Interaction Team:

* Allow for photos to be uploaded.
* Allow for plant data to be added and deleted.
* Seamless updates to the system when a plant is uploaded, updated, or deleted.

Deliverables:  
* Updated Database. 
* Functional plant upload and identification system.

## Week 6 - User Authentication and Basic Social Features
Goals: Implement social features and user authentication for the software.  
Tasks:  

Backend Team:

* make sure user table works
* add likes table.

Front End Team:

* make sign in form
* make account creation form
* make logged in indicators
* Implement social features such as liking an identification.

Interaction Team:

* Allow a user to sign in and out of the system.
* Handle account creation.

Deliverables:  
* Functional authentication system.
* Functional social features.

## Week 7 - Advanced Map Features and Seasonal Layers
Goals: Add and improve map features and create seasonal layers.  
Tasks: 

Backend Team:

* make sure the database can handle filtering and search.

Front End Team:

* Build Map filter form.
* Build Advanced search page including sorting plants by name, location, or type (e.g. trees, flowers)

Interaction Team:

* Implement Map filters api calls

* Implement advanced search functionality.

Test Team:

* Test the map with fake plant and seasonal data.

Deliverables:

* Project Implementation.
* Map filter functionality
* Search functionality.

## Week 8 - Testing and Refinement
Goals: Make sure all core features work as expected, and refine them based on user feedback.  
Tasks:  

Backend Team:

* Fix bugs and usability issues found from tests.
* Make sure the database can handle edge cases (e.g. duplicate entries, incomplete data?).

Front End Team:

* Fix bugs and usability issues found from tests.
* Improve the UI/UX design based on feedback.

Interaction Team:

* Fix bugs and usability issues found from tests.
* Make sure the database can handle edge cases (e.g. duplicate entries, incomplete data?).

Test Team:

* Conduct user testing with students, faculty, and/or others.

Deliverables:  
* Project Testing and Beta Release.
* Refined app with fewer bugs and a smoother interface.
* Feedback report from user testing.

## Week 9 - Finalizing Additional Features
Goals: Complete non-functional features and continue refining the software.  
Tasks:

Backend Team:

* Implement the non-functional features.

Front End Team:

* Continue to improve the UI/UX based on feedback and integrate the non-functional features.

Interaction Team:

* Implement the non-functional features.

Test Team:

* Test that the non-functional features don't interfere with the core features of the software.


Deliverables:  
* Completed non-functional features in the software.
* Fully-functional app ready for final testing.

## Week 10 - Final Testing and Launch
Goals: Test the app and prepare for the official launch.  
Tasks:  

Backend Team:

* Fix any remaining bugs and performance issues.

Front End Team:

* Fix any remaining bugs and performance issues.

Interaction Team:

* Fix any remaining bugs and performance issues.

Test Team:

Documentation Team:

* Finalize Documentation

All:

* Prepare our final project presentation/demo.
* Deploy the app for public use.

Deliverables:  
* Project Final Release.
* Fully tested and deployed app.
* Final presentation/demo.

# Team Process
## Risk Assessment
Here are the top five risks to the successful completion of our project:

### 1. Scalability
One of the largest risks with developing Beaver Botanica is in making sure the system is scalable. As a seven-person team, we will not be able to map out all the plants spanning the whole OSU campus. Our solution is to allow users of OSU Plant Map to upload pictures and information to the database.

The likelihood of this occurring is high, and the impact if this occurs is also high. We know this from our research into Oregon State University’s existing Department of Horticulture website, landscapeplants.oregonstate.edu. This website documents the over 1800 landscape plant species found across Oregon, which is a feat much larger than the scope of our project. Additionally, OSU’s campus is extensive, which makes it impractical for a small team to catalogue all plant life. Giving users the ability to add plant instances is crucial to the success of our project, but comes with its own unique challenges. User-generated plant findings can provide broad campus coverage, but can introduce issues like data inconsistency and quality control.

The following provides a list of steps we will take to increase the scalability of our project:
* Implement a verification system where plant uploads are reviewed by moderators or verified users before being added to the main database.
* Allow community-driven validation by providing users with the ability to flag plant inaccuracies.
* Conduct initial research to determine the species of common plants on OSU’s campus.

Our plan to detect this problem is to monitor submission frequency and quality using automated scripts and fact-checking. We can implement automated scripts that can detect duplicate submissions, and we may be able to determine if a submission is bad based on user input. For instance, if a user inputs a plant that is known to be under 2 feet tall at full growth, but labels it as 14 feet tall. We can also implement community feedback mechanisms, such as upvoting correct entries.

If this problem of too much unverified plant data occurs, our mitigation plan is to introduce a system that only allows confirmed, trusted users to add plant data to the system. Additionally, we could create a small tutorial to guide users through the correct usage of the website.

Since submitting our Requirements document, we expanded our original paragraph to include reasoning for this problem, as well as a detection and mitigation plan. We also introduced a concrete plan in the case of too much incorrect information.

### 2. Data Accuracy
Ensuring the accuracy of plant data uploaded by users is a significant risk. Incorrect or misleading information could reduce the app's reliability and usefulness. To mitigate this, we will implement a verification process for user-submitted data.

The likelihood of this occurring is high, and the impact if this occurs is also high. We have gathered from experience and research that crowdsourced data collection often introduces inconsistencies, as seen in similar user-generated content platforms. Because our target audience is the student and faculty population at Oregon State University, users may not be familiar with similar species of plants and may misidentify them due to a general lack of botanical knowledge.

The following are steps to improve data accuracy:
* Require users to provide images, location, and detailed descriptions for verification.
* Allow experienced users or moderators to review and approve submissions before they are made public.
* Provide educational resources to help users correctly identify plants.

To detect potential data inaccuracies, we will monitor flagged entries for potential errors, and track submission patterns to identify users with consistently incorrect inputs. Our mitigation plan to safeguard data accuracy is similar to that of ensuring scalability. Should too many incorrect entries occur, we can implement a trust system where known users can input new plants and the general population can view and comment.

This section has been improved since we submitted our Requirements document. We added a mitigation and detection plan, and introduced a verification system for trusted users.

### 3. User Engagement
Another risk is the potential lack of user engagement. If users do not participate in uploading and verifying plant data, the app will not reach its full potential. We will address this by incorporating peer-to-peer interaction elements to encourage use.

We believe that the likelihood of this occurring is medium, while the impact it will have if it occurs is high. Initial feedback from users is mixed, with some claiming that our project “I think you guys have a really good idea moving forward! I think it would be really helpful to have some sort of help for those with not much experience, or providing some sort of "incentive" for people like this to come back and continue to use your app.” Others state, “I feel like your project is too niche, with a potentially large maintenance cost. More specifically, I can rarely think of anyone who may be interested in researching flora and trees around.” Some users are enthusiastic about learning more about OSU’s campus botany, while others are not.

To reduce this impact, we have proposed several steps:
* Implement a rewards system, such as badges or points for verified contributions.
* Enable social features, such as user profile viewing and leaderboards.
* Introduce periodic challenges or community events to maintain interest.

To detect a problem with user engagement, we will conduct surveys and user feedback sessions to identify barriers to engagement. We can also monitor the rate of new user signups and repeated usage. If this occurs, our plan to mitigate it is to increase promotional efforts through campus partnerships. This may include posters with a link to the website on university-approved billboards, adding a post in the campus newsletter, and submitting our website to the Department of Horticulture. We may also simplify the contribution process if it is a challenge listed in the reasons why users are not engaged with our website.

This section has been altered from the Requirements document. We improved the detection plan, and added additional details to mitigate user disengagement.

### 4. Technical Challenges
Developing this application involves overcoming various challenges such as integrating the Google Maps API, ensuring cross-platform compatibility, and maintaining a responsive design. To mitigate this, we will allocate time for testing and debugging and seek assistance if needed.

The likelihood of this challenge affecting us is high, and the impact it has is also high. Based on our initial research, integrating third-party APIs like Google Maps often introduces unforeseen complexity, and tends to introduce compatibility and performance issues. Ensuring our app works both in a mobile and website environment requires extensive testing, which will be difficult to conduct in a small time frame.

The following are steps we will take to minimize technical challenges:
* Conduct thorough research and prototyping before fully integrating the API.
* Schedule regular debugging sessions and maintain clear documentation.

To detect an issue with integrating the API, we can use logging and error-tracking tools. We can also conduct usability testing on various devices to ensure compatibility across platforms. If we have issues with integration, we can allocate additional time and resources for debugging and adjustments. We can also seek assistance from OSU faculty or online developer communities if problems persist.

We have added to this section extensively since  our last submission of the Requirements document. We initially acknowledged technical risks but have now outlined specific detection and mitigation strategies. We also added a focus on automated performance testing to improve early issue detection.

### 5. Data Security and Privacy
Because users will be submitting plant data, including images and descriptions, we must make sure their data is secure and private. This is a major risk because mishandling user data could lead to privacy concerns, loss of trust, and potential violations of OSU’s data policies. Additionally, if user-uploaded images or location data are exposed without proper security measures, there’s a risk of unauthorized access or misuse. 

The likelihood of a true data breach is medium, while the impact it has is high. From our research, we’ve found that many crowdsourced platforms have experienced data breaches. This is especially true when the data is not encrypted or secured in some way. We also know from experience that storing images and geolocation data is considered pseudo-sensitive information, and introduces potential vulnerabilities that can be exploited. While we do not encourage our users to post personally-relevant information, there is a chance they might.

In order to reduce the likelihood of a data breach occurring, we can follow these steps:
* Implement secure authentication to prevent unauthorized access.
* Store only necessary data and avoid collecting personally identifiable information.
* Use HTTPS for all connections to protect data transmission.
* Regularly review and update security protocols based on OSU’s data security guidelines.

In order to detect unauthorized access, we can monitor access logs for suspicious activity, such as multiple unauthorized data access attempts. To detect and limit the likelihood of a data breach, we can conduct periodic security checks and vulnerability assessments. We can also ask users to use a different password for our website than they normally do, to ensure that if there is a data breach, users will not have their “regular” passwords compromised. If a vulnerability is detected, we can mitigate it by patching the affected components and updating security measures. In the event of a data breach, we will notify affected users and follow OSU’s data protection response protocols.

This section has been created since the submission of the Requirements document. We previously hadn’t considered that a data breach or security was an issue, but after careful consideration we decided that even though our application will not need sensitive information, data security is an important priority.

## Project Schedule
| **Week** | **Milestone** | **Tasks** | **Dependencies** | **Effort Estimate** |
|---------|--------------|-----------|-----------------|-------------------|
| **Week 3** | Planning and Foundation | Finalize requirements, assign roles, set up infrastructure | None | 1 week |
|  |  | Design database schema | None | 1 week |
|  |  | Set up development environment | None | 1 week |
|  |  | Wireframe UI | None | 1 week |
| **Week 4** | Map and Database | Develop database for plant data | Database schema | 1 week |
|  |  | Refine wireframes | Initial wireframes | 1 week |
|  |  | Implement basic campus map | Wireframes | 1 week |
|  |  | Integrate database with map | Map implementation, Database | 1 week |
| **Week 5** | Plant Identification and Upload | Store plant photos in database | Database setup | 1 week |
|  |  | Create UI for adding plants | Wireframes | 1 week |
|  |  | Implement plant upload & identification | UI, Database | 1 week |
| **Week 6** | User Authentication and Social Features | Implement user authentication | Database setup | 1 week |
|  |  | Create login & account forms | UI, Authentication | 1 week |
|  |  | Implement social features (liking, commenting) | Authentication | 1 week |
| **Week 7** | Advanced Map Features | Enable filtering and search | Database setup | 1 week |
|  |  | Implement advanced search UI | Wireframes | 1 week |
|  |  | Integrate API for filters | Map and Database | 1 week |
| **Week 8** | Testing and Refinement | Conduct user testing | Core features complete | 1 week |
|  |  | Fix bugs and usability issues | Testing feedback | 1 week |
|  |  | Improve UI based on feedback | Testing feedback | 1 week |
| **Week 9** | Finalizing Additional Features | Implement non-functional features | Core features complete | 1 week |
|  |  | Continue UI improvements | User feedback | 1 week |
|  |  | Test non-functional features | Feature completion | 1 week |
| **Week 10** | Final Testing and Launch | Final bug fixes | All prior development | 1 week |
|  |  | Final documentation | Feature completion | 1 week |
|  |  | Final presentation preparation | Feature completion | 1 week |
|  |  | Deploy app | All development & testing complete | 1 week |

## Team Structure
### Adison Daggett - Front End Designer and Developer
The role of the front-end designer has two parts: designing the front end and implementing it. This role allows for consistent design and implementation of an agreed-upon front end for the software.

### Kathryn Butler - Technical Documentation and Developer
Technical documentation is an incredibly important role in software engineering. Our team needs this designated role to clarify the process for adding and verifying plants, detail the system’s database integration, and outline user features such as the search and map functionality. Kathryn is suited for this role due to her strong communication skills developed from her leadership roles in film production and peer tutoring. She also structures documentation effectively, making it easy for others to navigate and use as a reference.

### Luke Scovel - Team Coordinator and Developer
For a team to function, it has to be a collaborative effort with everyone on the same track. To disseminate important information and reiterate what tasks need to be done without multiple voices clamoring over each other, a coordinator is needed. More developers are needed to bounce ideas off of each other and do the grunt work of coding.

### William Brennan - Developer
A developer is someone who designs and writes the code to be implemented in the software. This role is needed for this project because we need someone to design and program the database and logic controller for the software. William Brennan is suited for this role because he is a computer science student and he has taken courses in web development.

### Anshu Avinash - Front-End Designer
By bridging the gap between functionality and user experience, a front-end designer makes sure that the user interface's implementation and design meet the needs of both users and business objectives. Also, it streamlines the handoff between design and coding, improving productivity for the entire team.

### Finlay Curtiss - Developer and Technical Documentation
Multiple developers are needed to ensure that all features are implemented properly and in a reasonable time frame. Finlay has experience with developing and can contribute their knowledge and perspective to the technical implementation of the software. Technical documentation is also necessary, for the development team, users, and any developers who wish to work on this software in the future. Finlay has experience with technical writing from their classes and job. 

### Jake Thompson - Developer
We need many developers due to the timeline of the Project and the scope of what is needed to be implemented. Without developers nothing gets made.
Jake has experience with developing database design and other skills needed for this project.

## Software Toolset

We will be building Beaver Botanica as a web application hosted on OSU's engr server.
We will use the following frontend and backend software to achieve this goal.

Development Tools:
* MS Teams - Communication and file sharing.
* Trello - Task tracking and assignment.
* Git/GitHub - Version control and project management.

Frontend:
* HTML - Will be used for all the text on the website. We need this to have plant names and descriptions.
* CSS - Will be used for styling the website. We need this to make the website have a consistent theme.
* JavaScript - Will be used for making the website interactable. We need this to be able to click on plants to learn more about them.

Backend:
* SQLite or MySQL - Will be used for creating the database. We need this to have a database full of plant names and their properties.
* Node JS - Will be used for managing the database and handling requests. We need this to process plant entries and add them to the database.

## Test Plan & Bugs
### Unit Testing
We plan to use unit testing to verify that individual components are working in isolation. Our scope is backend functions, frontend components, and plant identification and data upload features. We plan on using [Jest](https://jestjs.io/) and the [React testing Library](https://testing-library.com/docs/react-testing-library/intro/) for frontend unit testing. If we decide to create our backend code using Python, we will likely use [Pytest](https://docs.pytest.org/) to conduct backend testing.
### System Testing
Our system testing will verify that each component works together correctly. This includes database interaction with the front end, Google Maps API integration, and user authentication and sessions. We will likely use the free version of [Postman API testing](https://www.postman.com/) to validate our API usage. We will also try out [Cypress](https://www.cypress.io/) to conduct end-to-end testing and frontend-backend interactions. We will also test how the website handles large-scale plant data uploads.
### Usability Testing
We will conduct usability testing to ensure our website is both informative and engaging. This includes UI/UX design, accessibility compliance, and ease of use. An easy way to test if a user enjoys our website is to conduct beta testing with students and faculty at OSU. We also can use Google Lighthouse to test performance and accessibility. From this testing, we can ensure the website works smoothly on desktop and mobile, and identify any confusing UI elements that need to be fixed. For each of these tests, we will use GitHub to log, track, and resolve bugs.

## Documentation Plan
0000 Outline a plan for developing documentation that you plan to deliver with the system, e.g., user guides, admin guides, developer guides, man pages, help menus, wikis, etc.

# Project Architecture and Design
## Software Architecture
### Components
0000 Identify and describe the major software components and their functionality at a conceptual level.

0000 Specify the interfaces between components.

### Data
0000 Describe in detail what data your system stores, and how. If it uses a database, give the high level database schema. If not, describe how you are storing the data and its organization.

### Assumptions
0000 If there are particular assumptions underpinning your chosen architecture, identify and describe them.

### Decision 1: <Name of Decision 1>
0000 For each of two decisions pertaining to your software architecture, identify and briefly describe an alternative. For each of the two alternatives, discuss its pros and cons compared to your choice.

0000 This is a small sentence for the decision we made. This is the basic reasoning why we decided on this decision. This is an alternative to our decision.

* Pros: 0000
* Cons: 0000

0000 This is a concluding sentence analyzing our alternative and why we made the decision we did.

### Decision 2: <Name of Decision 2>
For each of two decisions pertaining to your software architecture, identify and briefly describe an alternative. For each of the two alternatives, discuss its pros and cons compared to your choice.

0000 This is a small sentence for the decision we made. This is the basic reasoning why we decided on this decision. This is an alternative to our decision.

* Pros: 0000
* Cons: 0000

0000 This is a concluding sentence analyzing our alternative and why we made the decision we did.

## Software Design
0000 Provide a detailed definition of each of the software components you identified above.

0000 What packages, classes, or other units of abstraction form these components?

0000 What are the responsibilities of each of those parts of a component?


## Coding Guideline
0000 For each programming language that you will use in the implementation of your project, provide a link to a pre-existing coding style guideline that the members of your project will follow. Do not try to make up your own guidelines. Briefly state why you chose those guidelines and how you plan to enforce them.


# Feedback
We will be getting external feedback in week 6. All of the core features will be done by then so testers will be able to give useful feedback while still leaving us time to refine our product. We have dedicated week 7 to testing and refinement based on feedback. We will get this feedback by giving a fellow student in CS 362 our software. We will later interview them by asking them the following questions.

* What aspects of Beaver Botanica did you like or not like? Why?
* What would you like to see added or removed from Beaver Botanica?
* If there was one change you could make to Beaver Botanica, what would it be?
* Did you find Beaver Botanica useful and will you use Beaver Botanica in the future?
