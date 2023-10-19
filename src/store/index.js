import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './slices/usersSlices';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/deleteUser';
