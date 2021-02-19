//making middleware

function logit(req, res, next){
  console.log("LOGIT: Requested resource %s, %s", req.method, req.url);
  next();
}
module.exports = logit;
