import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import reducers, { RootState } from './reducers';

const logger = createLogger();

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddlewares = [...getDefaultMiddleware(), ReduxThunk];

    if (process.env.NODE_ENV === 'development') {
      defaultMiddlewares.push(logger);
    }

    return defaultMiddlewares;
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
