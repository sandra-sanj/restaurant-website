import {body} from 'express-validator';

export const createUsernameChain = () =>
  body('username')
    .trim()
    .isLength({min: 3, max: 20})
    .isAlphanumeric()
    .withMessage('Username must be between 3 and 20 characters long');

export const createEmailChain = () =>
  body('email').trim().isEmail().withMessage('Email must be valid');

export const createPasswordChain = () =>
  body('password')
    .trim()
    .isLength({min: 8})
    .withMessage('Password must be at least 8 characters long');

export const createPhoneChain = () =>
  body('phone')
    .trim()
    .custom(async (phone) => {
      if (!phone) {
        return true;
      }

      if (phone && !phone.startsWith('+358')) {
        throw new Error('Phone number must be Finnish (+358)');
      } else {
        // trim + and change remaining string to numeric format
        const phoneNumber = phone.split('+')[1];

        if (isNaN(phoneNumber)) {
          throw new Error('Phone number must only contain digits');
        } else if (phoneNumber.length < 9) {
          throw new Error('Phone number is too short');
        }
      }
    });

export const createRoleChain = () =>
  body('role')
    .trim()
    .custom((role) => {
      if (role === 'admin') {
        throw new Error('User with admin role cannot be created');
      }
      return true;
    });

export const createIsActiveChain = () =>
  body('is_active').optional().isInt({min: 0, max: 1}).toInt();
