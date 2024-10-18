import React, { useEffect } from 'react';
// import { connectionsManager } from '#/connectionManager';
import { CibClass } from '#/cibClass';
import { PositionGrid, TradeGrid } from './grid';
import '@ag-grid-community/styles/ag-grid.min.css';
import '@ag-grid-community/styles/ag-theme-alpine.min.css';
import '@adaptabletools/adaptable/index.css';
import { GridKind } from '#/business/rpsModel';
import { bootstrap } from '#/bootstrap';

export const LiveBlottersTab: React.FC<{ kind: GridKind }> = ({ kind }) => {
  useEffect(() => {
    bootstrap(kind);
    // connectionsManager.startRpsBondHubConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (kind === 'POSITION') {
    return (
      <div className={CibClass.cibColSpanFull}>
        <PositionGrid />
      </div>
    );
  }

  return (
    <div className={CibClass.cibColSpanFull}>
      <TradeGrid />
    </div>
  );
};
