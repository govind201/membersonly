exports.handleNotFound = (req, res, next) => {
  const error = new Error("Page Not found");
  error.status = 404;
  next(error);
};

exports.handleError = (err, req, res, next) => {
  res.status(err.status || 500);
  let errorMessage = "Internal Server Error";
  if (err.status == 404) {
    errorMessage = "Page not found";
  }
  res.render("error", { error:err });
};
