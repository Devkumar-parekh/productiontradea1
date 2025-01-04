// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./slices/userSlice";

// export default configureStore({
//   reducer: {
//     users: userReducer,
//   },
//   devTools: process.env.NODE_ENV !== "production",
// });
// store.js

import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { rootReducer } from "./reducer/rootReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: thunk,
});
const persistor = persistStore(store);
export { store, persistor };
