# OSU Plant Map


# Team Info


## Members



* Adison Daggett - Front End Designer
* Kathryn Butler - Technical Documentation
* Luke Scovel - Developer
* William Brennan - Developer
* Anshu Avinash - Front End Designer
* Finlay Curtiss - Developer
* Jake Thompson - Developer


## Repository and Trello

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
* All member must be able to receive and respond to a text message within 4 hours of it being sent.


# Product Description


## Abstract

The campus of OSU is home to a wide diversity of plants contributed by talented botanists over the years. It is hard for new botany students to know where all these plants are. They are left with little option save for asking for help from professors or exploring the campus themselves. Our goal is to help these botany students by providing them an online map that can tell them where plants lie on OSU’s campus. This project is a plant identification app for the Oregon State University campus. Users will take pictures of plants around campus, identify them, and upload them to a website that will show a map of campus with the locations of each identified plant. There will be layers to the map for each season, so users can see what plants are in bloom at any given time. Each plant, when clicked on, will show details of the plant that the user provides.


## Goal

Our goal for this software before the end of the term is to create a map of 10 plants on campus and allow for users to upload pictures and descriptions of plants to OSU Plant Map's database.
Our end goal is to allow any student at OSU the ability to look-up and identify plants around the OSU campus.

## Current Practice

* The botany department currently has a [tree inventory map](https://www.arcgis.com/apps/instant/basic/index.html?appid=097214a28e934a7681e229b41c9e0d29), but it is specific to trees and is simply an inventory system.
* The website Pl@ntNet has a [global plant map](https://identify.plantnet.org/), but it only shows broad regional areas of where plants grow.
* The website OregonFlora has a [Oregon plant map](https://oregonflora.org/checklists/dynamicmap.php?interface=key), but it can be hard to search through and is unhelpful to non-botanists.

## Novelty

The novelty of this project is that it will be a social media plant identification app specifically for the Oregon State University campus. Making our app restricted to the OSU campus will allow us to make the plant map more "zoomed in" on an area. This is novel because most maps of plants that are out there are catalogs of plants in a region, which don't allow users to find more specific locations of plants. Our app will be a user driven plant identification system that will allow users to identify and map plants on campus themselves, as well as drive social interaction based around the plants. 

## Effects

The target audience of Plant Map will be botany students at OSU. With this software they will be able to easily look up and find plants around the OSU campus. This will save them time looking around to identify a plant and it will also help them study various plant types at OSU. Additionally, this software will help entertain visitors and regular students of OSU by giving them a tool to find cool plants around campus that they may not have otherwise known existed.

## Technical Approach

The idea is to use a SQL database that holds each plant identified by the users. The website will display a map and overlay each plants location using google maps API and querying the database through code. We are still deciding on how exactly we will build the website.


## Risks

One of the largests risks with developing OSU Plant Map software is in making sure the system is scalable. We, as a 7 person team, will not be able to map out all the plants spanning the whole OSU campus. Our solution to this will be allowing users of OSU Plant Map to upload pictures and information to the database. With the large amount of plants and people we will need to make sure our software can be scaled up to allow for more information. This will be difficult as we will have to think ahead and design our system carefully. To mitigate this risk, our team will research early on how to make our system scalable so that we always code with the expectation of scalability.

## Major Features

* Movable map interface that displayes plant locations
* Seasonal layers on the map
* Plant descriptions and details
* Social media features such as commenting and liking plants

## Stretch Goals

* User profiles and leaderboards
* Plant identification AI integration
