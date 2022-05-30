# Tech-It

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Description
This full stack application utilizes HTML, CSS, Handlebars, JavaScript, MySQL, Node.js, and Node Package Manager (Bcrypt, Connect-Session-Sequelize, Dotenv, Express, Express-Handlebars, Express-Session, Handlebars, MySQL2, Sequelize) to build a CMS-style blog site that enables developers to post and comment about all things tech by following the MVC software design pattern and implementing Object-Relational Mapping, CRUD functionality, template engines, and authentication features.

## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Preview](#preview)
  - [License](#license)
  - [Contribution](#contribution)
  - [Questions](#questions)
  - [Credits](#credits)

## Installation
- Prior to starting up the program, make sure you have [Node.js](https://nodejs.org/en/download/), [MySQL](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide), and [Insomnia](https://insomnia.rest/download) (optional) installed on your local computer for optimal user experience.

- To install this application, clone this repository onto your local computer, open it in your code editor, and run the following command on your terminal: ```npm install```

- Once all dependencies have been installed, create an environment variable file (.env) at the root level of this application with the following content for successful connection to the database:
    - DB_NAME = ecommerce_db
    - DB_USER = <'mysql-username-here'> (If no username is set, default user for SQL is 'root')
    - DB_PW = <'mysql-password-here'> (If no password is set, by default SQL has no password)

## Usage
- Once all packages have been installed, run the mysql shell command ```mysql -u root -p``` and enter your password (if one has been set) before running ```source db/schema.sql```. Once completed, type ```exit```.

- After exiting the mysql shell, run the command ```npm run seed``` to populate data into your tables. Once the command finishes executing, type ```npm start```, ```npm run start``` OR ```node server.js``` on your terminal to turn on your server.

- *Optional: Once the server has been turned on, head over to Insomnia to test API GET, POST, PUT, and DELETE routes in order to create, read, update, and delete data in the database.* 

## Preview
- Visit the deployed Heroku site [HERE](https://tech-it.herokuapp.com/signup)

## License
- This project is licensed under: [MIT](https://opensource.org/licenses/MIT)

## Contribution 
- Forking this repository is always welcomed and encouraged!

> If you encounter a problem with this application, please add an issue or pull request to the GitHub repository. 

## Questions
- Please feel free to use this application at any time and visit my personal [GitHub](https://github.com/denysha-abigail) profile to access other open source projects! 

## Credits
- *[Denysha Guerrios-Armaiz](https://github.com/denysha-abigail), 05/2022*