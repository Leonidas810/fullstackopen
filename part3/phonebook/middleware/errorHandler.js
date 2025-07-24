//Express recognizes an error-handling middleware only if it has four parameters
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    console.log(err);

    if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Malformatted ID' });
    }

    if (err.code === 11000) {
        return res.status(406).json({ error: "Name must be unique" });
    }

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
};

module.exports = errorHandler;
