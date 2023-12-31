const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
});

function read(review_id){
    return knex("reviews")
        .where({ review_id })
        .first()
}

function refetch(review_id){
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .where({ "r.review_id": review_id })
        .first()
        .then(addCritic)
}

function update(updatedReview) {
    if(updatedReview.data){
          updatedReview.content = updatedReview.data.content;
          delete updatedReview.data;
    }
    return knex("reviews")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
}

function destroy(review_id){
    return knex("reviews").where({ review_id }).del();
}

module.exports = {
    read,
    update,
    refetch,
    destroy
};