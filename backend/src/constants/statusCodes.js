const STATUS = {
  OK:           200,
  CREATED:      201,
  BAD_REQUEST:  400,
  UNAUTHORIZED: 401,
  FORBIDDEN:    403,
  NOT_FOUND:    404,
  SERVER_ERROR: 500,
};
 
const STATUS_TEXT = {
  200: "success",
  201: "created",
  400: "bad_request",
  401: "unauthorized",
  403: "forbidden",
  404: "not_found",
  500: "internal_server_error",
};
 
module.exports = { STATUS, STATUS_TEXT };