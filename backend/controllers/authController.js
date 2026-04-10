const authService = require("../services/authService");
const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const AUTH = require("../constants/errorMessages/auth");
const { toRegisterInput } = require("../DTOs/authDTO");

// POST /api/v1/auth/register
const register = async (req, res, next) => {
  try {
    const input = toRegisterInput(req.body);
    await authService.register(req.body);
    return res.status(STATUS.CREATED).json({
      code: STATUS.CREATED,
      status: STATUS_TEXT[STATUS.CREATED],
      message: AUTH.REGISTER_SUCCESS,
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: AUTH.LOGIN_SUCCESS,
      //data: [],
      //...result,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/auth/refresh
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: AUTH.REFRESH_TOKEN_REFRESHED,
      //...result,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, refresh };