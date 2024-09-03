import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserDao } from '../dao/user.dao.js';
import { userRoles } from '../utils/helper.js';

dotenv.config();

// all secret key
const userSecretKey = process.env.USER_SECRET_KEY;
const inviteSecretKey = process.env.INVITE_SECRET_KEY;
const emailSecretKey = process.env.EMAIL_CHANGE_SECRET_KEY;

/**
 * Generates a JWT token for a user.
 * @param {Object} user - The user object containing user data.
 * @returns {string} - The JWT token.
 */
export const getUserToken = async (user) => {
  try {
    const payload = {
      id: user.dataValues.id,
      email: user.dataValues.email,
      role: user.dataValues.role,
    };
    return jwt.sign(payload, userSecretKey, {
      expiresIn: 1800, // Set the expiration time for the token to 1800 seconds (30 minutes)
    });
  } catch (err) {
    return err?.message;
  }
};

/**
 * Generates a JWT token for an invite.
 * @param {Object} user - The user object containing invite data.
 * @returns {string} - The JWT token.
 */
export const getInviteToken = (user) => {
  try {
    const payload = {
      inviteId: user.inviteId,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      userType: user.userType,
    };
    return jwt.sign(payload, inviteSecretKey, {
      expiresIn: 3600, // Set the expiration time for the token to 3600 seconds (60 minutes or 1 hour)
    });
  } catch (err) {
    return err?.message;
  }
};

export const getEmailUpdateToken = (user) => {
  try {
    const payload = {
      id: user.id,
      oldEmail: user.oldEmail,
      newEmail: user.newEmail,
    };
    return jwt.sign(payload, emailSecretKey, {
      expiresIn: 900, // 15 minutes in seconds
    });
  } catch (err) {
    return err?.message;
  }
};

/**
 * Verifies the invite token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 */
export const verifyInviteToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: 'No token provided.' });
    }

    // Verify and decode the token
    const decoded = await jwt.verify(
      token.split('Bearer ')[1],
      inviteSecretKey
    );

    // Attach the decoded payload to the request object
    req.user = decoded;
    if (decoded) await next();
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Unauthorized' });
  }
};

/**
 * Verifies the invite token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 */
export const verifyEmailUpdateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: 'No token provided.' });
    }

    // Verify and decode the token
    const decoded = await jwt.verify(token.split('Bearer ')[1], emailSecretKey);

    // Attach the decoded payload to the request object
    req.user = decoded;
    if (decoded) await next();
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Unauthorized' });
  }
};
/**
 * Verifies the organization token.
 */
export const verifyOrganizationToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: 'No token provided.' });
    }
    const authen = async () => {
      if (!req.isAuthenticated) {
        const token = req.headers.authorization;
        await jwt.verify(
          token.split('Bearer ')[1],
          userSecretKey,
          async (err, decoded) => {
            if (!err) {
              const user = await UserDao.findByEmail(decoded.email);
              if (
                user &&
                user.dataValues.role === userRoles.organizationAdmin
              ) {
                req.isAuthenticated = true;
                req.user = user;
              }
            }
          }
        );
      }
    };
    await authen();
    await next();
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err?.message,
    });
  }
};

/**
 * Verifies the token for organization employees.
 */
export const verifyOrganizationEmployeeToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: 'No token provided.' });
    }
    const authen = async () => {
      if (!req.isAuthenticated) {
        const token = req.headers.authorization;
        await jwt.verify(
          token.split('Bearer ')[1],
          userSecretKey,
          async (err, decoded) => {
            if (!err) {
              const user = await UserDao.findByEmail(decoded.email);
              if (
                user &&
                user.dataValues.role === userRoles.organizationEmployee
              ) {
                req.isAuthenticated = true;
                req.user = user;
              }
            }
          }
        );
      }
    };
    await authen();
    await next();
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err?.message,
    });
  }
};

/**
 * Verifies the token for company admins.
 */
export const verifyCompanyAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: 'No token provided.' });
    }
    const authen = async () => {
      if (!req.isAuthenticated) {
        const token = req.headers.authorization;
        await jwt.verify(
          token.split('Bearer ')[1],
          userSecretKey,
          async (err, decoded) => {
            if (!err) {
              const user = await UserDao.findByEmail(decoded.email);
              if (user && user.dataValues.role === userRoles.companyAdmin) {
                req.isAuthenticated = true;
                req.user = user;
              }
            }
          }
        );
      }
    };
    await authen();
    await next();
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err?.message,
    });
  }
};

/**
 * Verifies the token for company employees.
 */
export const verifyCompanyEmployeeToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: 'No token provided.' });
    }
    const authen = async () => {
      if (!req.isAuthenticated) {
        const token = req.headers.authorization;
        await jwt.verify(
          token.split('Bearer ')[1],
          userSecretKey,
          async (err, decoded) => {
            if (!err) {
              const user = await UserDao.findByEmail(decoded.email);
              if (user && user.dataValues.role === userRoles.companyEmployee) {
                req.isAuthenticated = true;
                req.user = user;
              }
            }
          }
        );
      }
    };
    await authen();
    await next();
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err?.message,
    });
  }
};

export const verifySuperAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: 'No token provided.' });
    }
    const authen = async () => {
      if (!req.isAuthenticated) {
        const token = req.headers.authorization;
        await jwt.verify(
          token.split('Bearer ')[1],
          userSecretKey,
          async (err, decoded) => {
            if (!err) {
              const user = await UserDao.findByEmail(decoded.email);
              if (user && user.dataValues.role === userRoles.superAdmin) {
                req.isAuthenticated = true;
                req.user = user;
              }
            }
          }
        );
      }
    };
    await authen();
    await next();
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err?.message,
    });
  }
};

/**
 * Middleware to handle invalid token cases.
 */
export const invalidToken = async (req, res, next) => {
  try {
    if (!req.isAuthenticated) {
      return res.status(401).json({
        status: false,
        message: 'unauthorized',
      });
    }
    // take only the session token from the header
    // console.log();
    const user = await UserDao.findByEmail(req.user.email);
    if (
      user &&
      user.dataValues.currentSessionToken !==
        req.headers.authorization.split('Bearer ')[1]
    ) {
      return res.status(401).json({
        status: false,
        message: 'ONLY 1 SESSION ALLOWED',
      });
    }
    await next();
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err?.message,
    });
  }
};

export const userAuthCheck = [
  verifyOrganizationToken,
  verifyCompanyAdminToken,
  verifyCompanyEmployeeToken,
  verifyOrganizationEmployeeToken,
  verifySuperAdminToken,
  invalidToken,
];
export const organizationAuthCheck = [verifyOrganizationToken, invalidToken];
export const organizationEmployeeAuthCheck = [
  verifyOrganizationEmployeeToken,
  invalidToken,
];
export const companyAdminAuthCheck = [verifyCompanyAdminToken, invalidToken];
export const companyEmployeeAuthCheck = [
  verifyCompanyEmployeeToken,
  invalidToken,
];
export const inviteAuthCheck = [
  verifyOrganizationToken,
  verifyCompanyAdminToken,
  verifyOrganizationEmployeeToken,
  invalidToken,
];
export const invitationAuthCheck = [verifyInviteToken];

export const superAdminAuthCheck = [verifySuperAdminToken, invalidToken];

export const companyAdminSuperAdminAuthCheck = [
  verifyCompanyAdminToken,
  verifySuperAdminToken,
  verifyCompanyEmployeeToken,
  invalidToken,
];

export const clientAuthCheck = [
  verifyOrganizationToken,
  verifyOrganizationEmployeeToken,
  invalidToken,
];
