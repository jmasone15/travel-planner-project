const router = require("express").Router();
const Travel = require("../models/travelModel");
const auth = require("../middleware/auth");

router.post("/new", auth, async (req, res) => {
    try {
        const newTravel = new Travel({
            tripName: req.body.tripName,
            budget: req.body.budget,
            startLocation: req.body.startLocation,
            destination: req.body.destination,
            dates: req.body.dates,
            userId: req.body.userId
        });

        const saveTravel = await newTravel.save();
        res.json(saveTravel);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const travels = await Travel.find({ userId: req.params.id });
        res.json(travels);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;