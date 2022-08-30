# Passwrap (Full Stack Web App): <a target="_blank" href="https://passwrap-ui.netlify.app/">Visit Here</a>
<p align="center">
  • 
  <a href="#about">About</a> •
  <a href="#technology-stack">Technology Stack</a> •
  <a href="#lesson-learned">Lesson Learned</a> •
  <a href="#setup">Setup</a> •
  <a href="#additional-notes">Additional Notes</a> •
</p>

## About
This is the backend of the web app version of a previous project I did of [Passwrap](https://passwrap.netlify.app/). From a password generator to a password manager built with the MERN stack, it helps you to stay organized and securely store your passwords and notes.

The frontend of this web app can be found in the repo, https://github.com/fn-r/mern-passwrap-ui

<a target="_blank" href="https://passwrap-ui.netlify.app/">
    <img src="https://github.com/fn-r/portfolio/raw/main/images/gif/mern-passwrap.gif" width="100%" alt="MERN Passwrap"/>
</a>

## Technology Stack
![MONGODB BADGE](https://custom-icon-badges.herokuapp.com/badge/-mongodb-A5FFCE?style=for-the-badge&logo=mongodb&logoColor=A5FFCE&labelColor=000000)
![EXPRESSJS BADGE](https://custom-icon-badges.herokuapp.com/badge/-express-A5FFCE?style=for-the-badge&logo=express&logoColor=A5FFCE&labelColor=000000) 
![NODEJS BADGE](https://custom-icon-badges.herokuapp.com/badge/-nodejs-A5FFCE?style=for-the-badge&logo=nodedotjs&logoColor=A5FFCE&labelColor=000000)
![JAVASCRIPT BADGE](https://custom-icon-badges.herokuapp.com/badge/-javascript-A5FFCE?style=for-the-badge&logo=javascript&logoColor=A5FFCE&labelColor=000000)

## Optimizations
I would further improve this project to allow the creation of multiple users. This would require generating a secure random access token for each user.

## Lesson Learned
Encryption:
    Sensitive data such as email and password are first encrypted from plain data before it is save into MongoDB.

## Setup
1. Edit the following values in the `.env` file
    ```
    CIPHER_KEY = "Your cipher key"
    JWT_TOKEN = "Your token"
    CONNECTION_URL = "Your database connection URL"
    ```
1. Install dependencies (BACKEND)
    ```bash
    npm install pkg.json --save
    ```
1. Run (BACKEND)
    ```
    npm run dev
    ```

## Additional Notes
It is a common practice to not push `.env` file to your repo. The data stored in this repo is a sample format of each key-value pairs.