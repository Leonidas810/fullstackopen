const errorHandler = (err, req, res, next) => {
    if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Malformatted ID' });
    }

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
}


module.exports = errorHandler;