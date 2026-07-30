import express from "express";
import { userController } from "../controllers/index.js";
import { authenticateToken } from "../middleware/index.js";

const usersRouter = express.Router();

// usersRouter.get('/', async (req, res) => {
//   console.log('GET: /users');
//   try {
//     const [result] = await db.query("SELECT * FROM users");
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error"});
//     console.error(error);
//     throw("Error at GET: /users");
//   }
// });

usersRouter.use(authenticateToken)

usersRouter.get('/:user_id', userController.getProfile);

usersRouter.get('/:user_id/times', userController.getTimes);
usersRouter.post('/:user_id/times', userController.postTimes);
usersRouter.patch('/:user_id/times', userController.patchTimes);
usersRouter.delete('/:user_id/times', userController.deleteTimes);


usersRouter.get('/:user_id/grades', userController.getGrades);
usersRouter.post('/:user_id/grades', userController.upsertGrades);
usersRouter.patch('/:user_id/grades', userController.upsertGrades);

usersRouter.get('/:user_id/algorithms', userController.getAlgorithms);
usersRouter.post('/:user_id/algorithms', userController.postAlgorithms);
usersRouter.patch('/:user_id/algorithms', userController.patchAlgorithms)
usersRouter.delete('/:user_id/algorithms', userController.deleteAlgorithms)

// usersRouter.get('/:user_id/times', async (req, res) => {
//   console.log('GET: /times');
//   console.log('query.type: ', req.query.type);
//   try {
//     const [result] = await db.query(`SELECT elapsed_ms FROM times WHERE user_id = ${req.params.user_id}`);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({error: "Internal Server Error"});
//     console.error(error);
//     throw(`Error at GET: /users/${req.params.user_id}/times`);
//   }
// })

export default usersRouter;