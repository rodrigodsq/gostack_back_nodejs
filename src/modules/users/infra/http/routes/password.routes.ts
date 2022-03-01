import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot',
    celebrate({
        [Segments.BODY ]: {
            email: Joi.string().email().required()
        }
    }),
    forgotPasswordController.create
);

passwordRouter.post('/reset',
    celebrate({
        [Segments.BODY ]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string().required().valid( Joi.ref('password'))
        }
    }),
    resetPasswordController.create
);

export default passwordRouter;

//valid faz com que o valor seja igual com o do campo passado por parametro, no caso igual ao do campo password;