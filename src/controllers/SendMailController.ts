import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import {resolve} from "path";
import SendMailService from "../services/SendMailService"


class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }

    const survey = await surveyRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      return res.status(400).send({ error: "Survey does not exist" });
    }

    const surveyUser = await surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");


    const variables =  {
      name: user.name
      title: survey.title
      description: survey.description
    },

    await SendMailService.execute(
      email,
      variables, npsPath,
    );

    return res.status(200).send(surveyUser);
  }
}

export { SendMailController };
