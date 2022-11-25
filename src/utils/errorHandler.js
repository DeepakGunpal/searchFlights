//?----------------------------- error handler ----------------------------

const handleErrors = (err) => {
    console.log("message :", err.message, "code :", err.code);
    let errors = {};

    // duplicate email error
    if (err.code === 11000) {
        errors[`${Object.keys(err.keyValue)[0]}`] = `${Object.keys(err.keyValue)[0]} is already registered`;
        return errors;
    }

    if (err.message === 'Invalid departure date') {
        errors['departureDate'] = 'Invalid departure date';
    }

    if (err.message === 'Enter query fields') {
        errors['query'] = 'Enter query fields';
    }

    if (err.message === 'Return date must be after departure date') {
        errors['returnDate'] = 'Return date must be after departure date';
    }

    if (err.message === 'Origin And Destination Cannot be Same') {
        errors['destination'] = 'Origin And Destination Cannot be Same';
    }

    // validation errors
    if (err.message.includes('flight validation failed')) {
        if (Object.values(err.errors).length > 0) {
            Object.values(err.errors).forEach(({ path, message }) => {
                errors[path] = message;
            });
        }
    }

    return errors;
}

module.exports = handleErrors;