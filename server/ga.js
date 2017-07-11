import ua from "universal-analytics";

var ga = {
  pageview: function(title) {
    return function(req, res, next) {
      var udata = {
        dp: req.path,
        dt: title,
        dh: "https://localhost",
        uip: req.ip,
        ua: req.headers["user-agent"]
      };
      if (req.visitor) {
        req.visitor.pageview(udata).send();
      }
      next();
    };
  }
};
module.exports = ga;
