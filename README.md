# team19 (Chris, Gazi, Jasper, Jordan)

Deployed Heroku link: https://talltales.herokuapp.com/

GENERAL GAME DESCRIPTION
========================

Tall Tales is a multiplayer collaborative story-telling web app for 3-5 players, inspired by popular party-games such as the Jackbox Party Packs, Code Names, Gartic Phone, and Skribbl.io. The basic gameplay consists of providing the players with creative prompts for writing their own story sentences. Each round, one of the players serves as the Raconteur, who decides which sentence is the funniest or most appropriate to continue the story. There are a total of 10 rounds, divided into several basic story elements: Backstory, Conflict, Resolution. After all rounds are completed, the player with the highest score is crowned as the most valuable contributor. In the leaderboard page, the collaborative story is displayed for all to see, as well as stored for later retrieval via their user profile. In their personal profile page, users have a plethora of customizable options such as sharing their past stories, editing their account information, and reviewing past games. 

What separates Tall Tales from other JavaScript games is its usage of sockets to allow for multi-device gameplay, connecting friends across the internet. Come explore all of the cool features of Tall Tales, including gameplay soundtracks, a virtual game host, and various genres/prompts that spark unique stories with every new game!

REGISTERED USERS
================

We have set up a number of users to demo the app more convincingly. They are listed below in the username:password format. 

	user:user
	user1:user1
	admin:admin
	jordan:jordan
	chris:chris
	jasper:jasper
	gazi:gazi

These are only the pre-existing default accounts; users are also able to create their own accounts! More on that later.

ROUTES OVERVIEW
==================
**_users.js_**

Our users.js file in our Express server provides the routes for all user-related activities. Each of the routes underneath detail the function of a user route, the expected data they receive, and expected return value. Please note that each route will begin with '/users', for example, '/users/register'.
- **router.route('/register').post():** Adds a user, expects a user object with {username, password, icon} attributes, returns a user object with {username, icon, stories, prompts, admin, \_id}.
- **router.route('/login').post():** Logs in a user and populates a session, expects a user object with {username, password} attributes, upon success returns a user object with {currentUser: username} and upon failure returns an error.
- **router.route('/logout').get():** Logs out a user and destroys the session, upon success returns nothing and upon failure returns an error.
- **router.route('/check-session').get():** Checks if a user is logged in on the session, upon success returns a user object with {currentUser: username} and upon failure changes the status to 401.
- **router.route('/user/:username').get():** Gets a specific user, upon sucess returns a user object and upon failure returns an error.
- **router.route('/user/:username').delete():** Deletes a user, upon success returns the deleted user object with {username, icon, stories, prompts, admin, \_id} and upon failure returns an error message.
- **router.route('/admin/:username').post():** Makes a user admin, upon success returns the user object and upon failure returns an error message.
- **router.route('/admin/:username').delete():** Revokes admin status from a user, upon success returns the user object and upon failure returns an error message.
- **router.route('/edit/username/:username').post():** Updates a user's username, expects a user object with {username}, upon success returns user object and upon failure reutrns an error message.
- **router.route('/edit/password/:username').post():** Updates a user's password, expects a user object with {password}, upon success returns user object with {username, icon, stories, prompts, admin, \_id} andupon failure returns an error message.
- **router.route('/edit/avatar/:username').post():** Updates a user's avatar, expects a user object with {icon}, upon success returns user object and upon failure returns an error message.
- **router.route('/prompts/:username').post():** Adds a story start to user, expects a story object with {start}, upon success returns user object and upon failure returns an error message.
- **router.route('/prompts/:username').delete():** Deletes a story start to user, expects a {index} object that represents the index of user's start, upon success returns {start, user} and upon failure returns an error message.
- **router.route('/stories/:username').post():** Saves a story to user, expects a story object with {title, start, story, contributions \[{username, sentence}], userScores \[{username, score, icon}]}, upon success returns user object and upon failure returns an error message.
- **router.route('/stories/:username/:story').post():** Edits the title of a story for user, expects a story object with {title}, upon success returns a user object and upon failure returns an error message.
- **router.route('/stories/:username/:story').get():** Gets a story from user, upon success returns a story object and upon failure returns an error message.

**_rooms.js_**

Our rooms.js file in our Express server provides the routes for all rooms-related activities. Each of the routes underneath detail the function of a room route, the expected data they receive, and expected return value. Please note that each route will begin with '/rooms', for example, '/rooms/create'.
- **router.route('/create').post():** Creates a room, expects a room object with {code, host, users}, upon success returns a room object and upon failure returns an error message.
- **router.route('/delete/:room').delete():** Deletes a room, upon success returns the delete room object and upon failure returns an error message.
- **router.route('/lock/:room').post():** Makes a room private or public, upon success returns the room object and upon failure returns an error message.
- **router.route('/start/:room').post():** Makes a room have in progress status, upon sucess returns the room object and upon failure returns an error message.
- **router.route('/join/:room').post():** Adds a new user to room, upon success returns the room object and upon failure returns an error message.
- **router.route('/genre/:room').post():** Change genre for a room, expects a room object with {genre}, upon success returns the room object and upon failure returns an error message.
- **router.route('/room/:room').get():** Get a room, upon success returns the room object and upon failure returns an error message.

**_stories.js_**

Our stories.js file in our Express server provides the routes for all stories-related activities. Each of the routes underneath detail the function of a stories route, the expected data they receive, and expected return value. Please note that each route will begin with '/stories', for example, '/stories/genre/:genre'.
- **router.route('/genre/:genre').post():** Adds a start prompt to the genre and creates the genre if it has yet to be created, expects a story object with {start}, upon success returns the genre object and upon failure returns an error message.
- **router.route('/genre/:genre/start').post():** Edits the title of a start prompt for the genre, expects a start object with {title}, upon success returns the genre object and upon failure returns an error message.
- **router.route('/').get():** Gets all genres, upon success returns a genres object with all genres and upon failure returns an error message.
- **router.route('/genre/:genre').get():** Gets a specific genre, upon success returns the genre object and upon failure returns an error message.
- **router.route('/genre/:genre/starts').get():** Gets all the start prompts for a genre, upon success returns an object of all the genre's starts and upon failure returns an error message.
- **router.route('/genre/:genre/').delete():** Deletes a genre, upon success returns the deleted genre object and upon failure returns an error message.
- **router.route('/genre/:genre/starts').delete():** Deletes a start prompt from the genre, upon success returns the genre object and upon failure returns an error message.
- **router.route('/prompt/:genre').post():** Adds input prompt to the genre, expects an input prompt object with {backstory, conflict, resolution}, upon success returns the genre object and upon failure returns an error message.
- **router.route('/prompt/:genre').get():** Gets all the input prompts for a genre, upon success returns the genre's input prompts and upon failure returns an error message.
- **router.route('/prompt/:genre/').delete():** Deletes an input prompt for a genre, expects a prompt object with {prompt_id}, upon success returns an object containing {prompt, genre} and upon failure returns an error message.
- **router.route('/story/:story').get():** Gets a story, upon success returns the story object and upon failure returns an error message.
- **router.route('/start').post():** Creates a new story, expects a story object with {title, start, story, contributions \[{username, sentence}], userScores \[{username, score, icon}]}, upon success returns the story object and upon failure returns an error message.
- **router.route('/contribute/:story').post():** Adds a contribution to the story, expects a contribution object with {username, sentence}, upon success returns the story object and upon failure returns an error message.

USAGE NOTES & NEW FEATURES
==================

The general set-up and usage instructions are listed below in the **USAGE INSTRUCTIONS** section. In addition to the general instructions, there are a few special notes to keep in mind when running the TallTales game.
- **Note: Keep Game Tabs in Focus** - TallTales is an interactive game, meaning that it requires your full attention at all times! To get the best experience of all audio cues, image cues, and flow of game, please keep the game tab in focus at all times. Switching to another tab during the game may cause delays of certain cues.
- **Note: Do Not Sign-In to the Same Account** - Like with any game, you want to be on different accounts as those who you are playing with. We've given you many to choose from above, but feel free to create your own accounts.
- **Note: Admin Functionalities** - Admin can reset password and delete users. At the moment, reset username and making other users admin are not fully functionable.
- **Mute Button** - There is a mute button in the lobby and game stages if you would like to mute the background music and certain audio cues, however, we recommend leaving it on! We worked very hard with our talented friends who composed the game music and voiced our spoken audio cues. All credits of the lobby music goes to Nom Tunes.
- **Genres/Prompts** - There are existing story genres (ie. Mystery, Comedy, Adventure) and corresponding starting prompts (ie. The Last Heist, The Bar) that you can navigate through for each game. This helps keep each game exciting and fun for returning players! Feel free to create your own genres/prompts to spark a more personalized story.
- **Leaderboard** - We believe it's important to celebrate your accomplishments. Try hovering/clicking your player scorecard and see all of the contributions that you made to the story! The scoreboard should be enough, but we've also attached a message at the bottom to help identify if you've won or not.
- **Share Story** - TallTales is a game all about community. Try sharing some of your past stories that you're proud of! Clicking the SHARE STORY button underneath your profile past stories will open up a properly formatted story page. Use the clipboard link to share some laughs or wows with your friends.
- **Have Fun!** - This is simple, enjoy our game :)

USAGE INSTRUCTIONS
==================

**_Setup_**
1. Go to the `team19` directory and run 
	
	```npm run setup```
	
2. After the dependencies are all installed after step 1, run 
	
	```npm run start-dev```
	
This should start a production build at the specified `$PORT` in `/team19/client/src/config.js` and `config.env`.
	
3. Navigate to `https://localhost:5010` to display the application. 

==================

**_Usage_**

 0. A Note on Concurrency

	Our TallTales game relies heavily on concurrency. While the game is playable by yourself via opening several different tabs, it is not recommended and may cause unintended interactions. We recommend finding a few friends and gather around with different devices.

 1. Login Page

	Upon loading the page, we are presented with a login screen. We must enter our username/password in the input fields, and click `ENTER TO PLAY` to proceed to the Lobby. The program will check that a valid username and password is provided before allowing access into the game. Incorrect combinations or inputs will prompt alert notifications. Alternatively, new users may click the sign up link below to proceed to the Sign Up Page.
	
	For testing: Login with any of the pre-mentioned login credentials.

 2. Sign Up Page

	Users are asked to enter a new username and password, and click the `CONFIRM REGISTRATION` link. This will add a new user to our database and bring the user back to the Login page, where they must enter their new credential to proceed. Similar to the login page, the program will provide alert notifications if inputs are empty or if the username is already taken.
	
	For testing: Register an account with any credentials you'd like.

 3. Dashboard

	In the dashboard view, we are presented with a few different buttons: HOST NEW GAME, JOIN NEW GAME, PROFILE, and LOG OUT. The HOST NEW GAME and JOIN NEW GAME buttons will bring you to the next game page, allowing you to set-up a game and enter a game lobby. The PROFILE button will bring you to your profile page, which has several features to change your profile and past performances. The LOG OUT button will log you out and bring you back to the LOGIN page. The Dashboard page is tied together with a How-To-Play description at its center.
    
	For testing: Browse through the page, try some of the features out!

 4. Profile

	The profile page provides us with an additional button menu allowing us to view our completed stories, change username, change password, and change avatar. The profile view will change depending on which button you select. 
	
 5. Profile - COMPLETED STORIES
 
 	The completed stories screen shows us all of our past stories that we've played. You can browse through the collection of stories via the arrow keys in the header and view the story that is display. Furthermore, if you click on the SHARE STORY button it will bring you to a brand new formatted page to share with your friends. This page displays all of the stories properties, including title, contributions, scoreboard, and allows you to easily copy the link to your clipboard.

 6. Profile - Change Username (self-explanatory)

	For testing: Try this out and logging back in!
 
 7. Profile - Change Password (self-explanatory)

	For testing: Try this out and logging back in!

 8. Profile - Change Avatar

	We may browse through available avatars by clicking the small arrows to the left and right of it, after which we can click the `CHANGE AVATAR` button to select it as our new avatar.

 9. Lobby

	In the Lobby page, you are greeted with an audio cue from our virtual host. The lobby displays all currently logged in users and there is only one host per game (represented with the crown icon). Here we are prompted to select the story genre (ie. Mystery, Comedy, Adventure) that we want to have our story prompt from. Once that's done, we can click `Start Game` as the game host to proceed to the Gameplay View. Note that there must be a minimum amount of three players to start the game.

10. Gameplay View
	
    10.1. As a Normal Player

	The gameplay view features a score in the top-right corner, which keeps track of the current player's score. In the middle of the screen we have our story thus far. The player is given a prompt, starting with the backstory, and they are prompted to type in their sentence in the input field labeled `OKAY AND THEN...`. Once they've done so, they can click the `SUBMIT` button. After every player has submitted their sentence, the game will select a Raconteur, who will select their favorite submission to be chosen for formal addition to the story. The Raconteur will be identified by the text `USER's turn`, where USER is the current Raconteur. The current user will also see the chosen sentence via interface cues. The winning sentence is then added to the story and the winning player's score is increased. From there, a new round begins. To help move the game along, there is a 60 second time-limit for each input. There are audio cues and visual cues to facilitate this time-limit.
		
    For testing: Type out a sentence when the game prompts you to. Click submit, repeat, and play out the game!

    10.2. As a Raconteur

	When we are selected as a Raconteur, we must first wait for all the users to submit their sentences. Users who are still writing their sentences are indicated by `...` next to their avatars. Once everyone's sentences have been submitted, we can see them all in our view, in the text fields next to each respective user's avatar. We then select our favorite sentence by clicking on it. The selection is reflected at the very bottom of the page, next to the `YOUR CHOICE` interface element. Note that this does not lock in our selection, as we are free to change our mind. Once we've made our decision, we can click the checkmark to mark our formal approval. The new sentence is added to the story, and a new gameplay round begins.
	
    For testing: Select any of the user-generated sentences and confirm it by clicking the checkmark. Make sure you only make one selection and click the checkmark once. The screen will change after a few seconds.

11. Leaderboard View

	Once the game has concluded, we have a final screen displaying each player's score and the finalized story from our game. If you hover over a user's score card, you can see all of their contributions highlighted on the left. If you click on a user's score card then that will lock their contributions as highlighted. We can click the HOME button to indicate that we've finished playing. This takes us back to the dashboard.

THANK YOU FOR CHECKING OUT OUR GAME :)
=======================================
