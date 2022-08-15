/* 
node heroku deploy steps..

---------------------------------
One time for computer
---------------------------------
1- Create an account in heroku
2- install heroku cli
3- cmd line-> heroku login

----------------------------------
One time for each project
----------------------------------
1- cmd line-> heroku create
2- make sure git cmd update(git add. -> git commit -m "" -> git push)
3- git push heroku main
4- go to heroku dashboard -> current project -> Setting -> reveal config vars
5- copy paste config vars from .env file
6- make sure to have whitelisted all ip address access to mongodb (0.0.0.0) 


------------------------------
update server with new changes
------------------------------
1- make changes
2- make sure git cmd update(git add. -> git commit -m "" -> git push)
3- git push heroku main


---------------------------------
connect server with client
---------------------------------
1- replace localhost:5000 with heroku link
2- run npm build
3- firebase deploy

*/