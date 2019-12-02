# Wayvi

[![Wayvi](http://img.youtube.com/vi/_iWYAkf3-EE/0.jpg)](https://www.youtube.com/embed/_iWYAkf3-EE"Websho")


Wayvi is a music streaming service where you can play your favorite songs from top artists and even create your own playlist with an account.

This repository is for the React frontend, visit [here](https://github.com/JahazielGuzman/wayvi) for the backend code base

[Click here for the hosted app.](http://wayvi.jahazielguzman.com) React app was deployed with surge.

Some of the techniques used to create this app:
+ Stored user accounts, songs and playlists in PostgreSQL with Active Record.
+ Retrieved song metadata from Spotify API via the Rspotify gem.
+ Implemented user login with JWT tokens in LocalStorage.

### How to run

#### 1. `npm install`
#### 2. `npm start`

And the app should start at localhost:3000

To deploy run:

#### `npm run build`

Then you can deploy the static files to any static site generator of your choice.


### Built With
* Ruby on Rails
* React.js
* PostgreSQL
* JSON Web Tokens
* ActiveRecord
* RSpotify Gem
