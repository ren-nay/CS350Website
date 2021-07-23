const { body, validationResult } = require("express-validator");

//Display Genre create form on GET
exports.genre_create_get = function(req, res, next){
    res.render('genre_form', {title: 'Create Genre'});
};

//Handle Genre created on POST
exports.genre_create_post = [
    //Validate and sanitize the name field.
    body('name', 'Genre name required').trim().isLength({min:1}).escape(),

    //Process request after validation and sanitation
    (req, res, next) => {
        //Extract the validation errors from a request
        const errors = validationResult(req);

        //Create a genre object with escaped and trimmed data
        var genre = new Genre(
            {name: req.body.name}
        );
        
        if(!errors.isEmpty()){
            //there are erros. render the formagain with sanitized values/error messages
            res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()});
            return;
        } else {
            //data from form is valid
            //check if Genre with same name already exists
            genre.save(function (err) {
                if(err) {
                    return next(err);
                }
                //Genre saved. redirect to genre detail page
                res.redirect(genre.url);
            });
        }
    }
];
