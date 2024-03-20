const Joi = require('joi');
const sql = require('mssql');
require('dotenv').config();

console.log('CreateMovie function is starting...');

module.exports = async function (context, req) {
    const schema = Joi.object({
        title: Joi.string().required(),
        year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
        genre: Joi.string().required(),
        description: Joi.string().required(),
        director: Joi.string().required(),
        actors: Joi.string().required()
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        context.res = {
            status: 400,
            body: validationResult.error.details[0].message
        };
        return;
    }

    const filmInfo = req.body;

    try {
        await sql.connect(process.env.AzureSQLConnectionString);
        console.log('Connected!');

        const tableCheck = await sql.query`IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = N'Films') CREATE TABLE Films (Title NVARCHAR(100), Year INT, Genre NVARCHAR(100), Description NVARCHAR(MAX), Director NVARCHAR(100), Actors NVARCHAR(MAX))`;
        console.log('Table check complete.');

        const result = await sql.query`INSERT INTO Films (Title, Year, Genre, Description, Director, Actors) VALUES (${filmInfo.title}, ${filmInfo.year}, ${filmInfo.genre}, ${filmInfo.description}, ${filmInfo.director}, ${filmInfo.actors})`;
        sql.close();
        context.res = {
            status: 200,
            body: "Film information saved successfully."
        };
    } catch (err) {
        console.error('Error: ', err);
        context.res = {
            status: 500,
            body: err.message
        };
    }
};