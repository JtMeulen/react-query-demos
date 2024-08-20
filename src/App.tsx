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
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
