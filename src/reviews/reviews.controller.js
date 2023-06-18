const reviewsService = require("./reviews.service");

async function reviewExists(req, res, next) {
    try {
        const review = await reviewsService.read(req.params.reviewId);
        if (review) {
            res.locals.review = review;
            return next();
        }
        next({ status: 404, message: `Review cannot be found.` });
    } 
    catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    const { body } = req;
    let updatedReview = {
        ...res.locals.review,
        ...body,
        review_id: res.locals.review.review_id
    }
    try {
        const updated = await reviewsService.update(updatedReview);
    } 
    catch (error) {
        next(error);
    }

    try {
        const data = await reviewsService.refetch(res.locals.review.review_id);
        res.json(
          {
            data
          }
        );
    } 
    catch (error) {
        next(error);
    }
}

function destroy(req,res,next){
    reviewsService.destroy(res.locals.review.review_id)
        .then(() => res.sendStatus(204))
        .catch(next);
}

module.exports = {
    update: [
        reviewExists,
        update
    ],
    destroy: [
        reviewExists,
        destroy
    ]
};