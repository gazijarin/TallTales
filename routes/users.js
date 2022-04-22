const express = require("express");

const log = console.log;

const router = express.Router();
const { ObjectID } = require("mongodb");

const { User } = require("../models/user.model");

// Adds a User
/*
    {
        "username": <String>,
        "password": <String>,
        "icon": <String>
    }
*/
router.route('/register').post(async (req, res) => {
    // Checks if user exists already
    let curUser = await User.findOne({username: req.body.username});

    if (curUser !== null) {
        res.status(400).send('Username taken already');
        return;
    }

    const newUser = new User(req.body)

    newUser.save()
        .then((user) => {
          const ret = {
            username: user.username,
            icon: user.icon,
            stories: user.stories,
            prompts: user.prompts,
            admin: user.admin,
            _id: user._id,
            __v: user.__v
          }
          res.send(ret)
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
});

// // Login User
// /*
//     {
//         "username": <String>,
//         "password": <String>
//     }
// */
// router.route('/login').post((req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     User.findByUsernamePassword(username, password)
//         .then(user => {
//             // Add the user's id to the session
//             req.session.userid = user._id;
//             req.session.username = user.username;
//             res.send({ currentUser: user.username });
//         })
//         .catch(error => {
//             res.status(400).send(error);
//         })
// })

// router.route('/logout').get((req, res) => {
//     // Remove the session
//     req.session.destroy(error => {
//         if (error) {
//             res.status(500).send(error);
//         } else {
//             res.send();
//         }
//     });
// })


// // A route to check if a user is logged in on the session
// router.route("/check-session").get((req, res) => {
//     if (req.session.userid) {
//         res.send({ currentUser: req.session.username });
//     } else {
//         res.status(401).send();
//     }
// });


// Gets all users
router.route("/").get((req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

// Gets specific User
router.route("/user/:username").get((req, res) => {
  const user = req.params.username;

  User.findOne({ username: user })
    .then(result => {
      if (!result) {
        res.status(404).send("User not found");
        return;
      }
      res.send(result);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

// Delete User
router.route("/user/:username").delete((req, res) => {
  const user = req.params.username;

  User.findOneAndDelete({ username: user })
    .then(result => {
      if (!result) {
        res.status(404).send("User not found");
        return;
      }
      const ret = {
        username: result.username,
        icon: result.icon,
        stories: result.stories,
        prompts: result.prompts,
        admin: result.admin,
        _id: result._id,
        __v: result.__v
      }
      res.send(ret);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

/*
------------------------------------ Updates User
*/

// Makes User admin
router.route("/admin/:username").post(async (req, res) => {
  const user = req.params.username;

  let curUser = await User.findOne({ username: user });

  // Checks to make sure it exists
  if (curUser === null) {
    res.status(404).send("User not found");
    return;
  }

  curUser.admin = true;

  curUser
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

// Make User not Admin
router.route("/admin/:username").delete(async (req, res) => {
  const user = req.params.username;

  let curUser = await User.findOne({ username: user });

  // Checks to make sure it exists
  if (curUser === null) {
    res.status(404).send("User not found");
    return;
  }

  curUser.admin = false;

  curUser
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

// Update username
/*
    {
        "username": <String>
    }
*/
router.route("/edit/username/:username").post(async (req, res) => {
  const user = req.params.username;

  let curUser = await User.findOne({ username: user });

  // Checks to make sure it exists
  if (curUser === null) {
    res.status(404).send("User not found");
    return;
  }

  // Checks username not taken
  let newUser = await User.findOne({ username: req.body.username });

  if (newUser !== null) {
    res.status(400).send("Username already taken");
    return;
  }

  curUser.username = req.body.username;

  curUser
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

// Update password
/*
    {
        "password": <String>
    }
*/
router.route("/edit/password/:username").post(async (req, res) => {
  const user = req.params.username;

  let curUser = await User.findOne({ username: user });

  // Checks to make sure it exists
  if (curUser === null) {
    res.status(404).send("User not found");
    return;
  }

  curUser.password = req.body.password;

  curUser
    .save()
    .then(user => {
      const ret = {
        username: user.username,
        icon: user.icon,
        stories: user.stories,
        prompts: user.prompts,
        admin: user.admin,
        _id: user._id,
        __v: user.__v
      }
      res.send(ret);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

// Update avatar
/*
    {
        "icon": <String>
    }
*/
router.route("/edit/avatar/:username").post(async (req, res) => {
  const user = req.params.username;

  let curUser = await User.findOne({ username: user });

  // Checks to make sure it exists
  if (curUser === null) {
    res.status(404).send("User not found");
    return;
  }

  curUser.icon = req.body.icon;

  curUser
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

/*
--------------------------------------------- Prompts
*/

// Adds start to User
/*
    {
        "start": <String>
    }
    
*/
router.route("/prompts/:username").post(async (req, res) => {
  const user = req.params.username;

  let curUser = await User.findOne({ username: user });

  // Checks to make sure it exists
  if (curUser === null) {
    res.status(404).send("User not found");
    return;
  }

  curUser.prompts.push(req.body.start);

  curUser
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

// Deletes a start from User
/*
    {
        "index": <Number>
    }
*/
router.route("/prompts/:username").delete(async (req, res) => {
  const user = req.params.username;

  let curUser = await User.findOne({ username: user });

  // Checks to make sure it exists
  if (curUser === null) {
    res.status(404).send("User not found");
    return;
  }

  const start = curUser.prompts[req.body.index];

  curUser.prompts.splice(req.body.index, 1);
  curUser
    .save()
    .then(result => {
      res.send({ start, result });
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

/*
--------------------------------------- Stories
*/

// Saves a story to User
/*
    {
        "title": <String>,
        "start": <String>,
        "story": <String>,
        "contributions": [
          {
            "username": <String>,
            "sentence": <String>,
          }
        ],
        "userScores": [
          {
            "username": <String>,
            "score": <Number>,
            "icon", <String>
          }
        ]
    }
*/
router.route("/stories/:username").post(async (req, res) => {
  const user = req.params.username;

  let curUser = await User.findOne({ username: user });

  // Checks to make sure it exists
  if (curUser === null) {
    res.status(404).send("User not found");
    return;
  }

  curUser.stories.push(req.body);

  curUser
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});


// Edits title of story for user
/*
  "title": <String>
*/
router.route("/stories/:username/:story").post(async (req, res) => {
  const user = req.params.username;
  const story = req.params.story;

  let curUser = await User.findOne({ username: user });
  let curStory = null;

  // Checks to make sure it exists
  if (curUser === null) {
    res.status(404).send("User not found");
    return;
  }

  // Finds story
  for (let i = 0; i < curUser.stories.length; i++) {
    if (curUser.stories[i]._id === story) {
      curStory = i;
      break;
    }
  }

  // Checks to make sure story exists
  if (curStory === null) {
    res.status(404).send("Story not found");
    return;
  }

  // Edits title of story
  const newStory = curUser.stories[curStory];
  newStory.title = req.body.title;
  curUser.stories.splice(curStory, 1);
  curUser.stories.push(newStory);

  curUser
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});


// Gets story from User
router.route("/stories/:username/:story").get(async (req, res) => {
  const user = req.params.username;
  const story = req.params.story;

  let curUser = await User.findOne({ username: user });
  let curStory = null;

  // Checks to make sure it exists
  if (curUser === null) {
    res.status(404).send("User not found");
    return;
  }

  // Finds story
  for (let i = 0; i < curUser.stories.length; i++) {
    if (curUser.stories[i]._id === story) {
      curStory = curUser.stories[i];
      break;
    }
  }

  // Checks to make sure story exists
  if (curStory === null) {
    res.status(404).send("Story not found");
    return;
  }

  res.send(curStory);


});

module.exports = router;
