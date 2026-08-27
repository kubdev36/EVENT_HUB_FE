import React, { useEffect, useMemo, useState } from 'react';
import Layout from './Layout/Layout';
import Login from './Views/Login';

import Daily from './Views/Daily';
import Month from './Views/Month';
import OverView from './Views/OverView';
import Competitors from './Views/Competitors';
import Marketting from './Views/Marketting';
import Sale from './Views/Sale';
import PrivateEvents from './Views/PrivateEvents';
import MediaLibrary from './Views/MediaLibrary';
import Reports from './Views/Reports';
import Setting from './Views/Setting';

const AUTH_KEY = 'event-hub-auth';
const VIEW_KEY = 'event-hub-view';
const VIEW_PATHS = {
  '/overview': 'overview',
  '/month': 'month',
  '/daily': 'daily',
  '/marketing': 'marketing',
  '/sale': 'sale',
  '/competitors': 'competitors',
  '/private-events': 'private-events',
  '/media-library': 'media-library',
  '/reports': 'reports',
  '/setting': 'setting',
};

const VIEW_TO_PATH = Object.fromEntries(
  Object.entries(VIEW_PATHS).map(([path, view]) => [view, path])
);

function getInitialAuth() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

function getViewFromLocation() {
  const path = window.location.pathname;
  return VIEW_PATHS[path] || localStorage.getItem(VIEW_KEY) || 'overview';
}

export default function App() {
  const [isAuthed, setIsAuthed] = useState(getInitialAuth);
  const [currentView, setCurrentView] = useState(getViewFromLocation);

  useEffect(() => {
    const onPopState = () => {
      setCurrentView(getViewFromLocation());
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!isAuthed && window.location.pathname !== '/') {
      window.history.replaceState({}, '', '/');
    }
  }, [isAuthed]);

  const navigate = (view) => {
    const path = VIEW_TO_PATH[view] || '/overview';
    setCurrentView(view);
    localStorage.setItem(VIEW_KEY, view);
    window.history.pushState({}, '', path);
  };

  const handleLogin = () => {
    localStorage.setItem(AUTH_KEY, 'true');
    setIsAuthed(true);
    navigate('overview');
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthed(false);
    setCurrentView('overview');
    localStorage.setItem(VIEW_KEY, 'overview');
    window.history.pushState({}, '', '/');
  };

  const renderView = useMemo(() => {
    switch (currentView) {
      case 'daily':
        return <Daily />;
      case 'month':
        return <Month />;
      case 'overview':
        return <OverView />;
      case 'competitors':
        return <Competitors />;
      case 'marketing':
        return <Marketting />;
      case 'sale':
        return <Sale />;
      case 'private-events':
        return <PrivateEvents />;
      case 'media-library':
        return <MediaLibrary />;
      case 'reports':
        return <Reports />;
      case 'setting':
        return <Setting />;
      default:
        return <OverView />;
    }
  }, [currentView]);

  if (!isAuthed) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout
      currentView={currentView}
      onNavigate={navigate}
      onLogout={handleLogout}
    >
      {renderView}
    </Layout>
  );
}
