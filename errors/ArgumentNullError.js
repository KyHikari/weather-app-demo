class ArgumentNullError extends Error {
    constructor(message) {
        super(message);
        this.name = "ArgumentNullError";
    }
}

export default ArgumentNullError; 