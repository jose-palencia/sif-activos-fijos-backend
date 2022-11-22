import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Router, Request, Response } from "express";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { UpdateCategoryDto } from "../dtos/update-category.dto";
import categoriesService from "../services/categories.service";

export class CategoriesController {

    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/categories', this.getList);
        this.router.get('/categories/:id', this.getOne);
        this.router.post('/categories', this.create);
        this.router.patch('/categories/:id', this.update);
        this.router.delete('/categories/:id', this.delete);
    }

    async getList(req: Request, res: Response): Promise<Response> { 
        const responseDto = await categoriesService.getList();
        return res.status(responseDto.code).json(responseDto);
    }

    async getOne(req: Request, res: Response): Promise<Response> { 
        const { id } = req.params;
        const responseDto = await categoriesService.getOne(+id);
        return res.status(responseDto.code).json({
            message: responseDto.message,
            data: responseDto.data
        }); 
    }
    
    async create(req: Request, res: Response): Promise<Response> { 

        const payload = req.body;

        let createCategoryDto = plainToClass(CreateCategoryDto, payload);

        const errors = await validate(createCategoryDto);
        
        if(errors.length > 0 ) {
            console.log(errors);

            return res.status(400).json({
                "Validation-errors" : errors
            });
        }

        const responseDto = await categoriesService.create(createCategoryDto);

        return res.status(responseDto.code).json(
            responseDto
        ); 
    }
    
    async update(req: Request, res: Response): Promise<Response> { 
        const { id } = req.params;
        const payload = req.body;

        let updateCategoryDto = plainToClass(UpdateCategoryDto, payload);
        const errors = await validate(updateCategoryDto);

        if(errors.length > 0 ) {
            console.log(errors);

            return res.status(400).json({
                "Validation-errors" : errors
            });
        }

        let category = await categoriesService.update(payload, +id);

        console.log(category);

        return res.json(category); 
    }
    
    async delete(req: Request, res: Response): Promise<Response> { 
        const { id } = req.params;

        await categoriesService.delete(+id);

        return res.status(204).json(); 
    }


}