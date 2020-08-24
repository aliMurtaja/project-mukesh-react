import React, { useState, useEffect, Suspense } from 'react';
import i18n from 'utils/i18n';
import { Switch, Route } from 'react-router-dom';
import PrimaryBar from 'components/primary-bar';
import { AppProvider } from 'contexts/app';
import Loader from 'components/ui-kit/loader';
import Admin from 'components/admin';
import LoginUser from 'components/login';
import RegisterUser from 'components/register';

import Home from 'components/home';
import Services from 'components/services';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserInfo } from 'actions/user';
import { getAuthToken } from 'utils/authToken';
import {
  getSessionIdentifier,
  setSessionIdentifier,
  clearSessionIdentifier,
} from 'utils/sessionIdentifier';
import doSessionManagement from 'utils/sessionManager';

import './styles.scss';

const Root = () => {
  const dispatch = new useDispatch();

  const [language, setLanguage] = useState('en');
  const { loading = {}, currentUser = {} } = useSelector(({ app }) => app);

  const { app: apploading } = loading;

  const [sessionManage, setSessionManage] = useState(true);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      dispatch(loadUserInfo());
    }
  }, [dispatch]);

  useEffect(() => {
    const token = getAuthToken();
    if (getSessionIdentifier()) {
      clearSessionIdentifier();
    }
    if (token && sessionManage && !getSessionIdentifier()) {
      doSessionManagement(token);
      setSessionManage(false);
    }
  });

  return (
    <AppProvider value={{ language, setLanguage }}>
      <main className="swift-pack-app">
        <div className="content">
          {apploading && apploading.status && <Loader text={apploading.text} />}
          <Suspense fallback={<Loader />}>
            <Route
              render={(props) => {
                window.appHistory = props.history;
                return <PrimaryBar currentUser={currentUser} {...props} />;
              }}
            />
            <Switch>
              <Route
                exact
                path="/admin"
                render={(props) => (
                  <Admin currentUser={currentUser} {...props} />
                )}
              />
              <Route exact path="/services" render={() => <Services />} />
              <Route exact path="/login" component={LoginUser} />
              <Route exact path="/register" component={RegisterUser} />
              <Route exact path="/" render={() => <Home />} />
            </Switch>
          </Suspense>
        </div>
      </main>
    </AppProvider>
  );
};

export default Root;
