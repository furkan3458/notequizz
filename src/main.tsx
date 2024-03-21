import React, { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { Provider, connect, useSelector } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';
import { IAddOptions, Loader, Resource } from 'resource-loader';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import WebFont from 'webfontloader';
import Router from './router';
import AuthContext, { AuthContextProvider } from './contexts/AuthContext';
import store from './states';
import { StateType } from './states/reducers';
import { setAuthLoading, setAuthUserType } from './states/actions/authActions';
import { setFingerprintInitStatus, setVideoLoading, setFontLoading, setVideoContent, setMusicContent, setMusicLoading } from './states/actions/contentActions';
import Const, { ContentList } from './utils/Const';
import Loading from './components/Loading';
import './css/index.css';

interface IMain {
  setAuthLoading: Function
  setAuthUserType: Function
  setVideoLoading: Function
  setFontLoading: Function
  setFingerprintInitStatus: Function
  setVideoContent: Function
  setMusicContent: Function
  setMusicLoading: Function
}

const App: FC<IMain> = ({ ...props }: IMain): JSX.Element => {
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthContextProvider>();
  const [authLocale, setAuthLocale] = useState(Const.GUEST_USER);
  const [componentsInit, setComponentsInit] = useState(false);
  const content = useSelector((state: StateType) => state.content);
  const auth = useSelector((state: StateType) => state.auth);
  const navigate = useNavigate();
  const loader = new Loader();
  let init = false;

  useEffect(() => {
    if (!init) {
      initialize();
    }
  }, []);

  useEffect(() => {
    if (content.isInit && auth.isInit)
      handleLoading();

  }, [content, auth]);

  const initialize = () => {
    console.log("Init");
    initFingerPrint();
    setAuthLevel();
    loadFonts();
    loadVideoContent();
    loadImages();
    loadMusics();
    init = true;
  }

  const handleLoading = () => {
    if (!componentsInit && !content.isLoading && !auth.isLoading) {// Add here authorization flag
      setComponentsInit(true);
      console.log("Components ready");
    }
  }

  const setAuthLevel = () => {
    if (auth.isLoading) {
      console.log("Auth Level");
      props.setAuthUserType(Const.GUEST_USER);
      buildAuthenticatedUser(Const.GUEST_USER, []);
      props.setAuthLoading(false);
    }
  }

  const loadFonts = () => {
    if (!content.isFontLoaded) {
      WebFont.load({
        custom: {
          families: ['Niconne-Regular'],
          urls: ['./css/index.css']
        },
        active: () => {
          props.setFontLoading(true);
        }
      });
    }
  }

  const loadVideoContent = () => {
    if (!content.isVideoLoaded) {
      const options: IAddOptions = {
        url: ContentList.BG_VIDEO_SRC,
        parentResource: new Resource("resource", {
          url: './assets'
        }),
      };
      loader.add(options).load((_loader, resource) => {
        props.setVideoContent(resource[ContentList.BG_VIDEO_SRC]?.data);
        props.setVideoLoading(true);
      });
    }
  }

  const loadImages = () => {
    
  }

  const loadMusics = () => {
    if (!content.isMusicLoaded) {
      const options: IAddOptions = {
        url: ContentList.BG_THEME_MUSIC,
        
        parentResource: new Resource("resource", {
          url: './assets',
        }),
      }

      loader.add(options).load((_loader, resource) => {
        console.log(_loader, resource);
        props.setMusicContent(resource[ContentList.BG_THEME_MUSIC]?.data);
        props.setMusicLoading(true);
      });
    }
  }

  const initFingerPrint = () => {
    if (!content.isFingerPrintInited) {
      const fpPromise = FingerprintJS.load();
      (async () => {
        const fp = await fpPromise;
        const result = await fp.get();
        localStorage.setItem(process.env.VITE_REACT_APP_FINGERPRINT_NAME!, result.visitorId);
      })();
      props.setFingerprintInitStatus(true);
    }
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

  return (!componentsInit ? <><Loading initDegree={0} /></> :
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
const mapDispatchToProps = {
  setAuthLoading,
  setAuthUserType,
  setVideoLoading,
  setFontLoading,
  setFingerprintInitStatus,
  setVideoContent,
  setMusicContent,
  setMusicLoading
};
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