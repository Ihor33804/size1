import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { store, persistor } from "./store/configureStore";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./modules/history";
import * as keys from "./routers/keys";
import Home from "./views/Home";
import Identification from "./views/Identification";
import MyHome from "./views/MyHome";
import AuthModal from './containers/AuthModal';
import RestoreEmailModal from './containers/RestoreEmailModal';
import RestorePasswordModal from './containers/RestorePasswordModal';
import { nameSelector, isRegisteredSelector } from './selectors/authSelectors';
import MyAccount from './views/MyAccount';
import IAgreeWithRules from "./views/Friends/IAgreeWithRules";
import CheckEmail from "./views/Friends/CheckEmail";
import Rules from "./views/Friends/Rules";
import RegistrationFriend from "./views/Friends/RegistrationFriend";
import RestorePasswordPage from "./views/Identification/RestorePasswordPage.js";


const PublicRoute = ({ component, ...rest }) => {
  return <Route exact {...rest} component={component} />;
};

const PrivateRoute = ({ component, ...rest }) => {
  const state = store.getState();
  const name = nameSelector(state);
  const isRegistered = isRegisteredSelector(state);
  if(!isRegistered) {
   if(!name) // ||isregistered
      return <Redirect to={keys.IDENTIFICATION} />
  }
  return <Route {...rest} component={component} />;
};

const FriendRoute = ({ component, ...rest }) => {
  return <Route {...rest} component={component} />;
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <div>
            <Switch>
              <FriendRoute exact path={keys.I_AGREE} component={IAgreeWithRules} />
              <FriendRoute exact path={keys.REGISTRATION_FRIEND_EMPLOYEE} component={RegistrationFriend} />
              <FriendRoute exact path={keys.RULES} component={Rules} />
              <FriendRoute exact path={keys.CHECK_EMAIL} component={CheckEmail} />

              <PrivateRoute exact path={keys.MAIN_PAGE} component={Home} />
              <PublicRoute exact path={keys.IDENTIFICATION} component={Identification} />
              <PrivateRoute exact path={keys.MY_ACCOUNT} component={MyAccount} />
              <PublicRoute exact path={keys.RESET_PASSWORD} component={RestorePasswordPage} />
              {/* <PublicRoute exact path={keys.RESTORE_PASSWORD_PAGE} component={RestorePasswordPage} /> */}
             
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;


