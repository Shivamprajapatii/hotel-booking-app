const express = require("express");
const router = express.Router({mergeParams :true});   // Reviews direct save nahi ho pata hai 
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js")


// Reviews POST Route
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);


// Delete Reviev Route

router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteRevie)
);


module.exports = router;