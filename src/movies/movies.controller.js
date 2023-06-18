const path = require("path");

const movieService = require("./movies.service");

function list(req,res,next){
    const { is_showing } = req.query;
    movieService.list(is_showing)
    .then((list) => {
      if(is_showing){
        return res.json({ data: list.splice(0,15) })
      }
      else{
        return res.json({ data: list })
      }
    })
    .catch(next);
}

function read(req,res,next){
    const { movieId } = req.params;
    movieService.read(movieId)
    .then((data) => {
        if (data) {
            res.json({ data });
        } 
        else {
            return next({
                status: 404,
                message: "Movie cannot be found.",
            });
        }
    })
    .catch(next);
}

function theaters(req,res,next){
    const { movieId } = req.params;
    movieService.theaters(movieId)
    .then((data) => res.json({ data }))
    .catch(next);
}

function review(req,res,next){
    const { movieId } = req.params;
    movieService.review(movieId)
    .then((data) => res.json({ data }))
    .catch(next);
}

function alltheaters(req,res,next){
    movieService.alltheaters()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
    list,
    read,
    theaters,
    review,
    alltheaters
};