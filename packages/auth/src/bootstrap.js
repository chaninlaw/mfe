import React from 'react';
import { render } from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  // defaultHistory for development in isolation
  // give initial state for memory history
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  // listen for navigation and call onNavigate
  if (onNavigate) {
    history.listen(onNavigate);
  }

  render(<App onSignIn={onSignIn} history={history} />, el);

  // return the history object to the container
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in DEV mode and in Isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    // defaultHistory for development in isolation
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container and we should export the mount function
export { mount };
