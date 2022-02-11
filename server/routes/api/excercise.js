const router = require('express').Router();
const excerciseControllers = require('../../controllers/exercise');

router.get('/api', (req, res) => {
    res.json("excersice microservice");
})
router.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.send(users)
})

router.post('/api/users', excerciseControllers.registerExerciseUser);
router.post('/api/users/:id/exercises', excerciseControllers.addExercise);
router.get('/api/users/:_id/logs', excerciseControllers.getLogs)


module.exports = router;