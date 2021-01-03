const router = require('express').Router();
const Exercise = require('../models/exercise.model');

router.get('/', (req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username: username,
        description: description,
        duration: duration,
        date: date
    });
    newExercise.save()
        .then(() => res.json('Exercise added successfully!'))
        .catch(err => res.json('Error: ' + err));
});

router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) => {
    const newUsername = req.body.username;
    const newDescription = req.body.description;
    const newDuration = Number(req.body.duration);
    const newDate = Date.parse(req.body.date);
    Exercise.findByIdAndUpdate(req.params.id, {
        username: newUsername,
        description: newDescription,
        duration: newDuration,
        date: newDate
    }, {useFindAndModify: false})
        .then(() => res.json('Exercise Updated successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
