import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import { Quotes } from "./pages/Quotes";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() =>
  import("./pages/NewQuote").then((module) => ({ default: module.NewQuote }))
);

const QuoteDetail = React.lazy(() =>
  import("./pages/QuoteDetail").then((module) => ({
    default: module.QuoteDetail,
  }))
);

const NotFound = React.lazy(() =>
  import("./pages/NotFound").then((module) => ({
    default: module.NotFound,
  }))
);

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route exact path="/">
            <Redirect to="/quotes" />
          </Route>

          <Route exact path="/quotes">
            <Quotes />
          </Route>

          <Route path="/quotes/:id">
            <QuoteDetail></QuoteDetail>
          </Route>

          <Route path="/new-quote">
            <NewQuote></NewQuote>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
