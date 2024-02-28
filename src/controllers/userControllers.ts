
import { userService } from "../services/userService";
import {Request, Response, NextFunction} from 'express';
import { response } from "../utils/response";
import { userInterface } from "../interfaces/interface";

class UserControllers {
    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let payload: userInterface = Object.keys(req.query).length > 0 ? req.query : req.body;
            console.log(req.body, req.query, "erfiuwri")
            console.log(payload, "Payload......")

            if (req.query){
                console.log("ietgsdljklvs")
            }

            if (!payload) {
                return response.error(req, res, {}, "UserId is required");
            }

            const isValidUser = await userService.getUser({_id: payload.userId});
            console.log({jsonObject: isValidUser, description: 'User details'});

            if(!isValidUser) {
                return response.error(req, res, {}, "Sorry! User details not found..");
            }

            req.body.user = isValidUser;
            req.body.user['userId'] = isValidUser._id;
            return next();
        } catch (err) {
            console.log("Catch Block error in getting userdetails" + err);
            return response.error(req, res, {}, "Sorry! Currently service not available..");
        }
    }
}

export const userControllers = new UserControllers();