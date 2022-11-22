import express, { json } from 'express';
import { CategoriesController } from './controllers/categories.controller';
import { conn } from './database/connection';
import { Category } from './models/category';
class App {

    public express: express.Application;

    categoriesController: CategoriesController;

    constructor() {

        this.express = express();
        this.middlewares();
        this.controllers();
        this.db();
        this.routes();
    }

    middlewares() {
        this.express.use(json());
    }

    routes() {
        this.express.use('/api', this.categoriesController.router);
    }

    db() {
        conn
        .sync()
        .then(() => {
            Category.sync();
            console.log(`Database is Connected`);
        })
        .catch((err) => {
            console.log(`Error`, err);
        });
    }

    listen(port: number) {
        this.express.listen(port, 
            () => console.log(`Server run in: http://localhost:${port}`));
    }

    controllers() {
        this.categoriesController = new CategoriesController();
    }

}

export default new App();