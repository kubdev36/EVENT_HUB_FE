import React, { useState } from 'react';
import Layout from './Layout/Layout';

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

export default function App() {
  const [currentView, setCurrentView] = useState('daily');

  const renderView = () => {
    switch (currentView) {
      case 'daily': return <Daily />;
      case 'month': return <Month />;
      case 'overview': return <OverView />;
      case 'competitors': return <Competitors />;
      case 'marketing': return <Marketting />;
      case 'sale': return <Sale />;
      case 'private-events': return <PrivateEvents />;
      case 'media-library': return <MediaLibrary />;
      case 'reports': return <Reports />;
      case 'setting': return <Setting />;
      default: return <Daily />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
}