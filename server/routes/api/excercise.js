const router = require('express').Router();
const excerciseControllers = require('../../controllers/exercise');

router.get('/', (req, res) => {
    res.json("excersice microservice");
})
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users)
})

router.post('/users', excerciseControllers.registerExerciseUser);
router.post('/users/:id/exercises', excerciseControllers.addExercise);
router.get('/users/:_id/logs', excerciseControllers.getLogs)


module.exports = router;