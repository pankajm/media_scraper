# media_scraper

This assignement is to scrap different websites provided in an API and store all media (images and videos) in a SQL database. There is one more API which exposes this data to client. 


## Tech stack and Assumption

The application is written in **Node JS** with **Express** as framework and utilises **NEXT.js** for server side rendering. This application serves data from **MySQL**.

## API details 

you can use below curl to hit the scraping api or you can try it from Rest client ex- postman 

curl -X POST \
  http://localhost:80/api/scrapMedia \
  -H 'authorization: basic abc@gmail.com:1234' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 0e0a8e5a-795a-d5f1-8d53-1267171ffaa6' \
  -d '{
	"urlArray":["https://www.istockphoto.com/search/2/image?family=creative&phrase=nature", "https://www.istockphoto.com/search/2/film?phrase=road+trip"]
}'
  
  
## Running App locally

Follow below commands to run app on local machine

*https://github.com/pankajm/media_scraper.git*

go to project directory and run following command

*npm install*

Install mysql with host = localhost, username = root and password as root_123

The scripts used to create database, tables and prepopulated data for user tables is mentioned in **dbinit/init.sql** file

Finally Run the app

*node index.js*

Open the Rest client and hit api using above payload with following url or simply hit it using above curl.

*http://localhost:80/api/scrapMedia*


The front end code instructions are given in seperate project.

**Done**
  
  
  
 


