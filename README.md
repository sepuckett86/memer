# memer

# Memer

Write a meme back-end. Your back-end should work for this site:
[https://blissful-galileo-b44cd4.netlify.com](https://blissful-galileo-b44cd4.netlify.com/)

## Model

Create a Meme model with top, image, and bottom fields.

## Routes

* `POST /api/v1/memes` to create a meme
* `GET /api/v1/memes` to get all memes
* `GET /api/v1/memes/:id` to get a meme by id
* `PUT /api/v1/memes/:id` to update a meme
* `DELETE /api/v1/memes/:id` to delete a meme

## Bonus

If you put your URL into [https://blissful-galileo-b44cd4.netlify.com](https://blissful-galileo-b44cd4.netlify.com/)
the site doesn't work (there is an error in the console).
There is something you can do on your back-end to fix this.

## Tedious Bonus

Create other resources. For example, a Toy model and routes, an Animal
model and routes, a Color model and routes, a Car model and routes, a
Movie model and routes, a Game model and routes, etc.

## Rubric

* code style 2 pts
* incremental steps (shown with commit history) 4 pts
* routes 2 pts
* tests 2 pts
* CORS bonus 5 extra points
* extra resources 1 point each