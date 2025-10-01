class ApiResponse{
    constructor(statusCode, message, error[], ) {
        this.statusCode = statusCode
        this.message = message
        this.success = statusCode < 400
    }
}