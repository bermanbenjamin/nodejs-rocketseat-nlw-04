import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveysUsers";

@EntityRepository(SurveyUser)
class SurveysUsersRepository extends Repository<SurveyUser> {}

export { SurveysUsersRepository };
