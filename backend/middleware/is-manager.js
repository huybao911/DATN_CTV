const { verify } = require("jsonwebtoken");


module.exports = (req, res, next) => {
  const token = req.get("x-manager-auth-token");
  if (!token || token === "") {
    req.isAuth = false;
    return res.status(401).send("Authorization failed..");
  } else {
    let decoded;

    try {
      decoded = verify(token, process.env.JWT_SECRET);
    } catch (error) {
      req.isAuth = false;
      return res.status(401).send("Authorization failed..");
    }

    if (!decoded) {
      req.isAuth = false;
      return res.status(401).send("Authorization failed..");
    }

    if (String(decoded?.getRole?.keyRole) !== 'manager') {
      req.isAuth = false;
      return res.status(401).send("Authorization failed..");
    }

    req.isAuth = true;
    req.manager = decoded.manager;
    return next();
  }
};
