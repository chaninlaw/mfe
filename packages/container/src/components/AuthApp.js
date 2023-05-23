import { mount as AuthMount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  // Component Did Mount > Call when component run first time
  useEffect(() => {
    const { onParentNavigate } = AuthMount(ref.current, {
      // Passing initialPath to tell AuthApp what path to load on first run
      initialPath: history.location.pathname,
      // Passing onNavigate to tell AuthApp to listen to history changes
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        // Check to prevent infinite loop of communication between Container and Sub-apps
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn,
    });

    // Listen to history changes
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref}></div>;
};
