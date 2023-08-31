const errorMiddleware = (err, req, res, next) => {
    console.log('here is an error middleware');
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({message: err.message, stack: process.env.NODE_ENV === "development" ? err.stack: null})  // The process.env here detects whether youre in development or produciton mode. But basically this line of code makes it so if youre in development mode in .env, then if there is an error, it hides all the code from the user for security. If you're in production mode, all the user will see is "null".
}

module.exports = errorMiddleware;