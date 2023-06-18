const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

const addCritic = reduceProperties("review_id",{
    critic_id: ["critic","critic_id"],
    preferred_name: ["critic","preferred_name"],
    surname: ["critic","surname"],
    organization_name: ["critic","organization_name"],
    created_at: ["critic","created_at"],
    updated_at: ["critic","updated_at"]
});

const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    created_at: ["movies", null, "created_at"],
    updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies", null, "is_showing"],
});


function list(is_showing) {
    if(is_showing){
        return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .select("m.*","mt.*")
            .where({is_showing: true})
    }
    return knex("movies").select("*");
}

function read(movie_id) {
    return knex("movies")
        .select("*")
        .where({movie_id})
        .first();
}

function theaters(movie_id){
    return knex("theaters as t")
            .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
            .select("t.*","mt.*")
            .where({"mt.movie_id": movie_id});
}

function review(movie_id){
    return knex("reviews as r")
            .join("critics as c", "r.critic_id", "c.critic_id")
            .select("r.*","c.*")
            .where({"r.movie_id": movie_id})
            .then(addCritic)
}

function alltheaters(){
    return knex("theaters as t")
            .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
            .join("movies as m", "mt.movie_id", "m.movie_id")
            .select("t.*","m.*","mt.*")
            .then(reduceMovies)
}

module.exports = {
  list,
  read,
  theaters,
  review,
  alltheaters
};