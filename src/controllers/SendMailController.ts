import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UserRepository";


class SendMailController {

  async execute(request:Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const usersAlreadyExists = await usersRepository.findOne({email});
  
    if(!usersAlreadyExists) {
      return response.status(400).json({
        error: "User does not exist",
      });
    }

    const surveyAlreadyExists = await surveyRepository.findOne({id: survey_id});

    if(!surveyAlreadyExists) {
      return response.status(400).json({
        error: "Survey does not exist!"
      })
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: usersAlreadyExists.id,
      survey_id,
    })
    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { SendMailController };