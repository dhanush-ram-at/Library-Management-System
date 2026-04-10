const bcrypt = require("bcrypt");
const authRepo = require("../repositories/authRepository");

const APP_CONFIG = require("../constants/appConfig");
const { STATUS } = require("../constants/statusCodes");
const AUTH = require("../constants/errorMessages/auth");

const { generateAccessToken, generateRefreshToken, verifyToken } = require("../utils/token");
const { formatUser } = require("../DTOs/authDTO");

const register = async (data) => {
  try {
    const existing = await authRepo.getUserByEmail(data.email);
    if (existing) {
      const error = new Error(AUTH.EMAIL_ALREADY_EXISTS);
      error.statusCode = STATUS.BAD_REQUEST;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(data.password, APP_CONFIG.BCRYPT_ROUNDS);
    const user = await authRepo.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || "MEMBER",
    });

    return user;

  } catch (error) {
    const err = new Error(`${AUTH.REGISTER_FAILED}: ${error.message}`);
    err.statusCode = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

const login = async (data) => {
  try {
    const user = await authRepo.getUserByEmail(data.email);

    if (!user) {
      const error = new Error(AUTH.USER_NOT_FOUND);
      error.statusCode = STATUS.BAD_REQUEST;
      throw error;
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      const error = new Error(AUTH.INVALID_PASSWORD);
      error.statusCode = STATUS.BAD_REQUEST;
      throw error;
    }

    const payload = { id: user.id, role: user.role };

    return {
      user: formatUser(user),
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };

  } catch (error) {
    const err = new Error(`${AUTH.LOGIN_FAILED}: ${error.message}`);
    err.statusCode = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

const refresh = async (refreshToken) => {
  try {
    const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    return {
      accessToken: generateAccessToken({
        id: decoded.id,
        role: decoded.role,
      }),
    };

  } catch (error) {
    const err = new Error(`${AUTH.REFRESH_TOKEN_INVALID}: ${error.message}`);
    err.statusCode = STATUS.BAD_REQUEST;
    throw err;
  }
};

module.exports = { register, login, refresh };




// const bcrypt = require("bcrypt");

// const authRepo = require("../repositories/authRepository");

// const APP_CONFIG = require("../constants/appConfig");
// const { STATUS } = require("../constants/statusCodes");
// const AUTH = require("../constants/errorMessages/auth");

// const { generateAccessToken, generateRefreshToken, verifyToken } = require("../utils/token");
// const { formatUser } = require("../DTOs/authDTO"); 

// // REGISTER — create new user
// const register = async (data) => {
//   try {
//     // Step 1 — check email exists
//     const existing = await authRepo.getUserByEmail(data.email);
//     if (existing) {
//       const error = new Error(AUTH.EMAIL_ALREADY_EXISTS);
//       error.statusCode = STATUS.BAD_REQUEST;
//       throw error;
//     }

//     // Step 2 — hash password
//     const hashedPassword = await bcrypt.hash(
//       data.password,
//       APP_CONFIG.BCRYPT_ROUNDS
//     );

//     // Step 3 — create user
//     const user = await authRepo.createUser({
//       name: data.name,
//       email: data.email,
//       password: hashedPassword,
//       role: data.role || "MEMBER",
//     });

    
//     return user;

//   } catch (error) {
//     throw error;
//   }
// };


// // LOGIN — validate credentials + generate tokens
// const login = async (data) => {
//   try {
//     // Step 1 — find user
//     const user = await authRepo.getUserByEmail(data.email);

//     if (!user) {
//       const error = new Error(AUTH.USER_NOT_FOUND);
//       error.statusCode = STATUS.BAD_REQUEST;
//       throw error;
//     }

//     // Step 2 — check password
//     const isMatch = await bcrypt.compare(data.password, user.password);

//     if (!isMatch) {
//       const error = new Error(AUTH.INVALID_PASSWORD);
//       error.statusCode = STATUS.BAD_REQUEST;
//       throw error;
//     }

//     // Step 3 — create payload
//     const payload = {
//       id: user.id,
//       role: user.role,
//     };

//     // Step 4 — generate tokens
//     return {
//       user: formatUser(user), 
//       accessToken: generateAccessToken(payload),
//       refreshToken: generateRefreshToken(payload),
//     };

//   } catch (error) {
//     const err = new Error(`${AUTH.LOGIN_FAILED}: ${error.message}`);
//     err.statusCode = error.statusCode || STATUS.BAD_REQUEST;
//     throw err;
//   }
// };


// // REFRESH TOKEN — generate new access token
// const refresh = async (refreshToken) => {
//   try {
//     // Step 1 — verify token
//     const decoded = verifyToken(
//       refreshToken,
//       process.env.REFRESH_TOKEN_SECRET
//     );

//     // Step 2 — generate new access token
//     return {
//       accessToken: generateAccessToken({
//         id: decoded.id,
//         role: decoded.role,
//       }),
//     };

//   } catch (error) {
//     const err = new Error(`${AUTH.REFRESH_TOKEN_INVALID}: ${error.message}`);
//     err.statusCode = STATUS.BAD_REQUEST;
//     throw err;
//   }
// };


// module.exports = { register, login, refresh, };