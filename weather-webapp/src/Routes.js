import React, { Suspense } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Empty from './pages/empty';
import { Store } from './store';

const Main = React.lazy(() => import('./pages/main'));
const Detail = React.lazy(() => import('./pages/detail'));

const RoutePage = () => {
  const renderLoading = () => (<Empty />);

  return (
    <Suspense fallback={ renderLoading }>
      <Store>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/detail" component={Detail} />
          </Switch>
        </HashRouter>
      </Store>
    </Suspense>
  )
};

export default RoutePage;
