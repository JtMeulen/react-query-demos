import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { HomePage } from "./pages/Home";
import { SuperHeroesPage } from "./pages/SuperHeroes";
import { RQSuperHeroesPage } from "./pages/RQSuperHeroes";
import { RQSingleHeroPage } from "./pages/RQSingleHeroPage";
import { RQManualSuperHeroesPage } from "./pages/RQManualSuperHeroes";
import { RQTransformedSuperHeroesPage } from "./pages/RQTransformedSuperHeroesPage";
import { RQCustomHookSuperHeroesPage } from "./pages/RQCustomHookSuperHeroesPage";
import { RQParallelQueriesPage } from "./pages/RQParallelQueriesPage";
import { RQDynamicParallelQueriesPage } from "./pages/RQDynamicParallelQueriesPage";
import { RQDependantQueriesPage } from "./pages/RQDependantQueriesPage";
import { RQPaginatedQueriesPage } from "./pages/RQPaginatedQueriesPage";
import { RQInfiniteQueriesPage } from "./pages/RQInfiniteQueriesPage";
import { RQMutationQueryPage } from "./pages/RQMutationQueryPage";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-manual-super-heroes">RQ Manual Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-transformed-super-heroes">
                  RQ Transformed Super Heroes
                </Link>
              </li>
              <li>
                <Link to="/rq-custom-hook-super-heroes">
                  RQ Custom Hook Super Heroes
                </Link>
              </li>
              <li>
                <Link to="/rq-parallel-queries">RQ Parallel Queries</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel-queries">
                  RQ Dynamic Parallel Queries
                </Link>
              </li>
              <li>
                <Link to="/rq-dependant-queries">RQ Dependant Queries</Link>
              </li>
              <li>
                <Link to="/rq-paginated-queries">RQ Paginated Queries</Link>
              </li>
              <li>
                <Link to="/rq-infinite-queries">RQ Infinite Queries</Link>
              </li>
              <li>
                <Link to="/rq-mutation-queries">RQ Mutation Queries</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/rq-super-heroes/:id" element={<RQSingleHeroPage />} />
            <Route
              path="/rq-manual-super-heroes"
              element={<RQManualSuperHeroesPage />}
            />
            <Route
              path="/rq-transformed-super-heroes"
              element={<RQTransformedSuperHeroesPage />}
            />
            <Route
              path="/rq-custom-hook-super-heroes"
              element={<RQCustomHookSuperHeroesPage />}
            />
            <Route
              path="/rq-parallel-queries"
              element={<RQParallelQueriesPage />}
            />
            <Route
              path="/rq-dynamic-parallel-queries"
              element={<RQDynamicParallelQueriesPage heroIds={[1, 3]} />}
            />
            <Route
              path="/rq-dependant-queries"
              element={<RQDependantQueriesPage userId={"1"} />}
            />
            <Route
              path="/rq-paginated-queries"
              element={<RQPaginatedQueriesPage />}
            />
            <Route
              path="/rq-infinite-queries"
              element={<RQInfiniteQueriesPage />}
            />
            <Route
              path="/rq-mutation-queries"
              element={<RQMutationQueryPage />}
            />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
