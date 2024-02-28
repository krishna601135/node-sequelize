import { Router } from 'express';
import { booksController } from '../controllers/booksControllers';
import { response } from '../utils/response';

class Endpoints {
    public router: Router; 

    constructor() {
        this.router = Router();
    }

    validateAPIKey = (req, res, next) => {
        if (req.headers['x-api-key'] === undefined) {
            return response.error(req, res, 'Required API Key');
        } else {
            if (req.headers['x-api-key'] === process.env.API_KEY)
                next();
            else
                return response.error(req, res, 'Invalid API key');
        }
    }

    configureRoutes(): Router {
        this.router.route('/get/books')
            .get(booksController.books);

        this.router.route('/borrow/book')
            .post(this.validateAPIKey, booksController.borrowBook)

        this.router.route('/return/book')
            .post(this.validateAPIKey, booksController.returnBook)

        this.router.route('/rating/book')
            .post(this.validateAPIKey, booksController.ratingBook)

        return this.router;
    }
}


export const endpoints = new Endpoints().configureRoutes();