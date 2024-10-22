import React from 'react';
//import '@inside-design/inside-design-core';
import { Header } from './Header';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { TabContainer } from './shared/TabContainer';
import { LiveBlottersTab } from './liveBlottersTab/LiveBlottersTab';
import { CibClass } from '#/cibClass';

export const App: React.FC = () => (
  <BrowserRouter>
    <div className={`${CibClass.cibHScreen} ${CibClass.cibOverflowHidden}`}>
      <Routes>
        <Route
          path="/tradeblotter"
          element={
            <>
              <Header kind="TRADE" />
              <TabContainer>
                <LiveBlottersTab kind="TRADE" />
              </TabContainer>
            </>
          }
        />
        <Route path="*" element={<Navigate to="/tradeblotter" />} />
      </Routes>
      <div className={CibClass.cibFlex}>
        <cib-toast vertical-distance={0.5} placement="center" />
      </div>
    </div>
  </BrowserRouter>
);
