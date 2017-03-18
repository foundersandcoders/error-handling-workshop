module.exports = (x,y,next) => {

  // @TODO: handle case where y = 0 by calling next with
  // an error as its first argument

	next(null, x/y);
};
