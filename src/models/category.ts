import * as Sequelize from 'sequelize-typescript';
import { conn } from "../database/connection";
import { Asset } from './asset';

export interface CategoryAddModel {
    id: number;
    name: string;
    description: string;
}

export interface CategoryModel extends Sequelize.Model<CategoryModel, CategoryAddModel> {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export const Category = conn.define<CategoryModel, CategoryAddModel>('categories', {
    id: {
        type: Sequelize.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.DataType.STRING(50),
        unique: true,
    },
    description: {
        type: Sequelize.DataType.STRING(250)
    }
});

Category.hasMany(Asset, {
    sourceKey: 'id',
    foreignKey: 'category_id',
    as: 'categories',
});