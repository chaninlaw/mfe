import { mount as DashboardMount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    DashboardMount(ref.current);
  }, []);

  return <div ref={ref}></div>;
};
