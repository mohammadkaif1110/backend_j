class ApiErrors extend Erorr {
    constructor(statusCode, message = "something went wrong", error = [] ){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = false
        this.error = this.error
    }
};