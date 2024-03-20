const Joi = require('joi');
const sql = require('mssql');

console.log('FindMovie function is starting...');

module.exports = async function (context, req) {
    const schema = Joi.object({
        searchString: Joi.string().allow('').optional()
    });

    const validationResult = schema.validate(req.query);
    if (validationResult.error) {
        context.res = {
            status: 400,
            body: validationResult.error.details[0].message
        };
        return;
    }

    const searchString = req.query.searchString;

    try {
        await sql.connect(process.env.AzureSQLConnectionString);
        let query = `SELECT * FROM Films`;
        if (searchString) {
            query += ` WHERE Title LIKE '%${searchString}%'`;
        }
        const result = await sql.query(query);
        sql.close();
        context.res = {
            status: 200,
            body: result.recordset
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: err.message
        };
    }
};
