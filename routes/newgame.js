const random = require('../helpers/random');
const initGoofData = require('../helpers/initGoofDatabase');
const express = require('express');
const router  = express.Router();

let playersReady = {};

module.exports = () => {

  router.get('/', (req, res) => {
    if (req.cookies['username']) {
      let templateVars = {
        username: req.cookies.username
      };
      res.render('newgame', templateVars);
    } else {
      res.redirect('/login');
    }
  });

  router.post('/goofspiel', (req, res) => {
    if (!playersReady.goofspiel) {
      playersReady.goofspiel = {
        player1: req.cookies.username,
        player2: null,
        url: random(),
      };

      console.log("player1 is ready", playersReady);
      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`);

    } else if (playersReady.goofspiel.player1 === req.cookies.username) {
      console.log("you are already player1")
      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`);
      return;

    } else {
      playersReady.goofspiel.player2 = req.cookies.username;
      console.log("who is player2?", playersReady);
      //connect to api endpoint to create in memory object
      initGoofData(playersReady.goofspiel.url, playersReady.goofspiel.player1, playersReady.goofspiel.player2);

      //add playersReady to gamesession and redirect to /game/goofspiel/:url
      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`)
      playersReady.goofspiel = null;
    }
  });

  router.post('/blackjack', (req, res) => {
    if (!playersReady.blackjack) {
      playersReady.blackjack = {
        player1: req.cookies.username,
        player2: null,
        url: random(),
      };

      console.log("player1 is ready", playersReady);
      res.redirect(`/game/blackjack/${playersReady.blackjack.url}`);

    } else if (playersReady.blackjack.player1 === req.cookies.username) {
      console.log("you are already player1")
      res.redirect(`/game/blackjack/${playersReady.blackjack.url}`);
      return;

    } else {
      playersReady.blackjack.player2 = req.cookies.username;
      console.log("who is player2?", playersReady);
      //connect to api endpoint to create in memory object
      initJackData(playersReady.blackjack.url, playersReady.blackjack.player1, playersReady.blackjack.player2);

      //add playersReady to gamesession and redirect to /game/blackjack/:url
      res.redirect(`/game/blackjack/${playersReady.blackjack.url}`)
      playersReady.blackjack = null;
    }
  });

  return router;
};
