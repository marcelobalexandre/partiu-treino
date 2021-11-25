import { Router } from 'express';
import { findPersonalTrainersHandler } from './FindPersonalTrainersHandler';
import { createPersonalTrainerHandler } from './CreatePersonalTrainerHandler';

type Dependencies = {
  apiRouter: Router;
};

const makePersonalTrainerController = ({ apiRouter }: Dependencies) => {
  const router = Router();

  /**
   * @swagger
   *
   * /personal-trainers:
   *   get:
   *     tags:
   *       - Personal trainers
   *     summary: The list of personal trainers
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: List of personal'
   */
  router.get('/personal-trainers', findPersonalTrainersHandler);

  /**
   * @swagger
   *
   * /personal-trainers:
   *   post:
   *     tags:
   *       - Personal trainers
   *     summary: Creates a new personal trainer
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *         description: Personal trainer's name.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: email
   *         description: Personal trainer's email.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: Personal trainer's password.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Personal trainer created successfully
   *         schema:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *               description: The personal trainer ID.
   */
  router.post('/personal-trainers', createPersonalTrainerHandler);

  apiRouter.use(router);
};

export { makePersonalTrainerController };
