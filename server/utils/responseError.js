class ResponseError extends Error {

    constructor(message, status) {
        super();
        this.message = message;
        this.stauts = status;
    }

}

module.exports = ResponseError;