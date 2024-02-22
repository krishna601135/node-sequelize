import { userModel } from "../models/user";

class UserService {
    getUser = async (condition, projection = {}) => {
        try {
            const data = await userModel.findOne(condition, projection);
            return data;
        } catch (err) {
            console.log("Error in getting user data");
            return;
        }
    }

    updateUser = async (condition, data) => {
        try {
            const result = await userModel.updateOne(condition, data);
            return result;
        } catch (err) {
            console.log("Error in getting user data");
            return;
        }
    }
}

export const userService = new UserService();