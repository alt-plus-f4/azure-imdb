# IMDB using Azure functions
For Azure function app serverless using nodejs

.gitignore
```git
local.settings.json
.env
```
You need .env and local.settings.json to work .env:
```env
AzureSQLConnectionString=connectionstring
```

.local.settings.json: your settings file

Example POST request for createMovie func:
```json
{
    "title": "Test Title",
    "year": 2022,
    "genre": "Test Genre",
    "description": "Test Description",
    "director": "Test Director",
    "actors": "Test Actor"
}
```
Return
```json
{
    "status": 200
}
```
Example GET request for findMovie func\n(if you send blank req it returns all of the entries in the db):
```json
{
    "title": "Test Title",
}
```
Return
```json
{
    "Title": "Test Title",
    "Year": 2022,
    "Genre": "Test Genre",
    "Description": "Test Description",
    "Director": "Test Director",
    "Actors": "Test Actor"
}
```
Example POST request for rateMovie func:
```json
{
    "filmTitle": "The Matrix",
    "opinion": "Great movie!",
    "rating": 9,
    "date": "2022-01-01",
    "author": "John Doe"
}
```
Return
```json
{
    "status" : 200
}
```

# How to deploy
Deploy the code into azure function
Make a database and enter your information in the .env file
Download the dependencies from the console tab in your azure function
```cmd
npm i mssql joi dotenv
```
You are ready to go!