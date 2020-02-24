https://www.youtube.com/watch?v=DAlvbZzrppQ

to run this project 
1- clone 
2- cd to project folder and mkdir data
3- run your mongod using the following command 
# mongod --dbpath /home/st/folder/--project path-- /api/data/ --port 27017
4- create config.js file and add the flolowing line 
 module.exports = {
   dbHost: 'lh',
    dbName: '.....',
    dbCollection: '...',
 }    
5- run 
# npm run devstart
6- REST Client for Visual Studio Code
7- got to route.rest file and make the request and delete 