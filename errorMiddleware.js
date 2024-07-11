export const errorMiddleware = (err, req, res, next) => {
    console.log("asad")
    try {
        res.status(500).send('Server Error ');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};