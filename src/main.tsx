import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom'
import { Provider, connect, useSelector } from 'react-redux';
import Router from './router';
import AuthContext, { AuthContextProvider } from './contexts/AuthContext';
import Const from './utils/Const';
import './css/index.css'
import { StateType } from './states/reducers';
import store from './states';

const App: React.FC = (): JSX.Element => {
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthContextProvider>();
  const [authLocale, setAuthLocale] = useState(Const.GUEST_USER);
  const [loaded, setLoaded] = useState(false);
  const auth = useSelector((state: StateType) => state.auth);

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
      <BrowserRouter>
        <HelmetProvider>
          <AuthContext.Provider value={authenticatedUser!}>
            <Router auth={authLocale} />
          </AuthContext.Provider>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
}
const mapDispatchToProps = { };
const ConnectedApp = connect(null, mapDispatchToProps)(App);

const AppBuilder = () => {
  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<AppBuilder />);