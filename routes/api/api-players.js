const express = require('express');
var router = express.Router();
const playerController = require('../../controllers/playerController');
const playerService = playerController.PlayerService;
router.use((req, res, next) => {
   res.set({
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
  // Set content-type for all api requests
    'Content-type':'application/json'
   });
   next(); // Pass control to the next route handler
});

//players -- list
router.get('/', (req, res, next) => {
    playerService.list().then((players) => {
        console.log(`API: Found players: ${players}`);
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(players));
    })
});
//players/playerName - findOne
router.get('/:playerName', (req, res, next) => {
    playerService.find(req.params.playerName).then((player) => {
        console.log(`API: Found player: ${player}`);
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(player));
    })
});
// /players POST create
router.post('/', (req, res, next) => {
    console.log("request body: ", req.body);
    console.log(`API: Creating player: ${req.body.playerName}`);

    playerService.create(req.body).then((player) => {
        console.log(`API: Created player: ${player}`);
        res.status(201);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(player));
    })
});
// /players/:playerName PUT update
router.put('/:playerName', (req, res, next) => {
    console.log(`API: Updating player: ${req.params.playerName}`);
    playerService.update(req.params.playerName, req.body).then((player) => {
        console.log(`API: Updated player: ${player}`);
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(player));
    });
})
// /players/:playerName DELETE - delete
router.delete('/:playerName', (req, res, next) => {
    console.log(`API: Deleting player: ${req.params.playerName}`);
    playerService.delete(req.params.playerName).then((player) => {
        console.log(`API: Deleted player: ${player}`);
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(player));
    });
})
module.exports = router;