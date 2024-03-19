import { IUser } from '../features/users/usersSlice';

export const areObjectsDifferent = (obj1: IUser, obj2: IUser) => {
  // Get the keys for the objects
  const keys = Object.keys(obj1);

  // Iterate through keys and compare values. Return true if a value is different
  for (const key of keys) {
    if (obj1[key as keyof IUser] !== obj2[key as keyof IUser]) {
      return true;
    }
  }
  // If all checks pass, the objects are different
  return false;
};
