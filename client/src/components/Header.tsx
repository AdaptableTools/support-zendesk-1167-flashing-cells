import { CibClass } from '#/cibClass';
import React from 'react';
import { Link } from 'react-router-dom';
import { GridKind } from '#/business/rpsModel';
import { Aggregations } from './aggregations';
import { BooksFilter } from './booksFilter';

export const Header: React.FC<{ kind: GridKind }> = ({ kind }) => {
  return (
    <cib-header sticky class="header-xs">
      <cib-logo
        slot="logo"
        link="/tradeblotter"
        src="/assets/logoRPSBonds.png"
        context="Site Logo - Redirect to homepage"
      ></cib-logo>

      <Link to="/tradeblotter" slot="links" className={CibClass.cibNavLink14} reloadDocument>
        TRADE BLOTTER
      </Link>
      <Link to="/positionblotter" slot="links" className={CibClass.cibNavLink14} reloadDocument>
        POSITION BLOTTER
      </Link>

      {kind === 'TRADE' ? (
        <div slot="icons">
          <Aggregations />
        </div>
      ) : null}

      <span slot="icons" className={CibClass.cibFlex}>
        <BooksFilter />
      </span>

      <cib-avatar slot="avatar" firstname="Olivier" lastname="Fonte" size="1" connected="true" />
    </cib-header>
  );
};
