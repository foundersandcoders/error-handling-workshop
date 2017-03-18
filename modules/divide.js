// module.exports = (x,y,next) => {
//
//   // @TODO: handle case where y = 0 by calling next with
//   // an error as its first argument
//
// 	next(null, x/y);
// };


module.exports = (x,y,next) => {
	// if error condition?
	if ( y === 0 ) {
		// "throw" the error safely by calling the completion callback
		// with the first argument being the error
		var err = new Error("Can't divide by zero");
		next(err);
	}
	else {
		// no error occured, continue on
		next(null, x/y);
	}
};
