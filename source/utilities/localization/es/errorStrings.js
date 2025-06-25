const errorStrings = Object.freeze( {
    authentication_failed: "Autenticación ha fracasado.",
    absence_not_found: "La ausencia no se encontró.",
    classroom_not_found: "El salón no se encontró.",
    dependency_conflict: "Conflicto de dependencias.",
    invalid_access_level: "El nivel de acceso debe ser divisible por 10.",
    invalid_columns: "No se permiten los valores de columna proporcionados.",
    invalid_http_code_error_response: "El código HTTP especificado no tiene una respuesta de error coincidente.",
    invalid_order: "No se permiten los valores de orden proporcionados.",
    invalid_order_by: "No se permiten los valores de 'ordenar por' proporcionados.",
    invalid_user_input: "Entrada de usuario no válida. Por favor revisa los datos enviados.",
    not_found: "No se encontraron registros.",
    password_decryption_failed: "El valor dado no pudo ser parseado.",
    record_already_exists: "El registro ya existe.",
    something_went_wrong: "Algo salió mal. Por favor inténtelo más tarde.",
    subject_code_not_found: "El código de tema no se encontró.",
    task_not_found: "La tarea no se encontró.",
    unauthorized: "No es permitido.",
    user_not_found: "El usuario especificado no se encontró."
} )

module.exports = {
    errorStrings
}