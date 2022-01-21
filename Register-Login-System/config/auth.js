module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','Please Login To View the Resource');
        res.redirect("/users/login");
    }
}