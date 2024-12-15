const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner,validateLiting } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudeConfig.js");
const upload = multer({ storage });



// Index Route // Create Route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        wrapAsync(listingController.createListing), 
);


// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show Route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
    isLoggedIn,
    isOwner, 
    upload.single("listing[image]"),
    validateLiting, 
    wrapAsync(listingController.updateListing)
)
    .delete(
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.deleteListing)
);


// Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);


module.exports = router;