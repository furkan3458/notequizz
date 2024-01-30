import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { Provider, connect, useSelector } from 'react-redux';
import Router from './router';
import AuthContext, { AuthContextProvider } from './contexts/AuthContext';
import Const from './utils/Const';
import './css/index.css';
import { StateType } from './states/reducers';
import store from './states';
import { NextUIProvider } from '@nextui-org/react';

const App: React.FC = (): JSX.Element => {
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthContextProvider>();
  const [authLocale, setAuthLocale] = useState(Const.GUEST_USER);
  const [loaded, setLoaded] = useState(false);
  const auth = useSelector((state: StateType) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isValidate) {
      setAuthLevel();
      setLoaded(true);
    }
  }, [auth.isValidate]);

  useEffect(() => {
    console.log(auth);
  });

  const setAuthLevel = () => {
    auth.user ? buildAuthenticatedUser(Const.AUTH_USER, auth.user) : buildAuthenticatedUser(Const.GUEST_USER, []);
  }

  const buildAuthenticatedUser = (authType: Const, user: any) => {
    let authUser: AuthContextProvider = {
      authType: authType,
      authenticatedUser: {
        id: 0,
        fullname: "",
        username: "",
        email: "",
        roles: []
      }
    }
    if (authType === Const.AUTH_USER) {
      authUser.authenticatedUser.id = user.id;
      authUser.authenticatedUser.fullname = user.fullname;
      authUser.authenticatedUser.username = user.username;
      authUser.authenticatedUser.email = user.email;
      authUser.authenticatedUser.roles = user.roles;
    }

    setAuthLocale(authType);
    setAuthenticatedUser(authUser);
  }

  return (
    <>
      <HelmetProvider>
        <AuthContext.Provider value={authenticatedUser!}>
          <NextUIProvider navigate={navigate}>
            <Router auth={authLocale} />
          </NextUIProvider>
        </AuthContext.Provider>
      </HelmetProvider>
    </>
  );
}
const mapDispatchToProps = {};
const ConnectedApp = connect(null, mapDispatchToProps)(App);

const AppBuilder = () => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <ConnectedApp />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<AppBuilder />);