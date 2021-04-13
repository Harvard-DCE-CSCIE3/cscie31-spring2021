
// auth for express/HTML or API routes with session
const auth = {
  sessionCheck : function (api, req, res, next){
    if (req.user && req.user.email ){
      return next();
    }else{
      if (api){
        console.log("sending 401");
        return res.sendStatus(401);
      } else {
        res.redirect('/users/login');
      }
    }
  },
  required: function (req, res, next){
    auth.sessionCheck(false, req, res, next);
  },
  apiRequired : function(req, res, next){
    auth.sessionCheck(true, req, res, next);
  },
  optional: function(req, res, next){
    next();
  }
};

module.exports = auth;
