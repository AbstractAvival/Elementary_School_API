const errorStrings = Object.freeze( {
    authentication_failed: "Authentication Failed.",
    absence_not_found: "The absence was not found.",
    classroom_not_found: "The classroom was not found.",
    dependency_conflict: "Dependency conflict.",
    invalid_access_level: "Given access level must be divisible by 10.",
    invalid_columns: "Given column values not allowed.",
    invalid_http_code_error_response: "The given HTTP code does not have a matching error response.",
    invalid_order: "Given order value not allowed.",
    invalid_order_by: "Given order by value not allowed.",
    invalid_user_input: "Invalid user input. Please check sent information.",
    not_found: "The requested record was not found.",
    record_already_exists: "Record already exists.",
    something_went_wrong: "Something went wrong. Please try again later.",
    subject_code_not_found: "The given subject code was not found",
    task_not_found: "The given task was not found.",
    unauthorized: "Unauthorized",
    user_not_found: "The given user id was not found."
} )

module.exports = {
    errorStrings
}