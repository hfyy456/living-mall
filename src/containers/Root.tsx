import React from 'react';
import RootRoute from './Route'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Store } from '../store';
type Props = {
  store: Store;
  history: History;
};
const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootRoute />
    </ConnectedRouter>
  </Provider>
);
export default Root