import React, { useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

import Comments from "../components/comments/Comments";
import HighLightedQuote from "../components/quotes/HighlightedQuote";
import { NotFound } from "./NotFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";

export const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { id } = params;

  const {
    sendRequest,
    status,
    data: quote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  if (status === "pending")
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );

  if (error) return <p className="centered">{error}</p>;

  if (!quote.text) {
    return <NotFound />;
  }
  return (
    <>
      <HighLightedQuote text={quote.text} author={quote.author} />

      <Route path={match.path} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`} className="btn--flat">
            See comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};
