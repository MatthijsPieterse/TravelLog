import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Spinner from "#shared/components/ui/Spinner";
import { ScrollToTop } from "#app/ScrollToTop";
import { ROUTES } from "#shared/constants/routes";

const DashboardPage = lazy(
  () => import("#features/dashboard").then((module) => ({ default: module.DashboardPage }))
);
const TravelLogPage = lazy(() => import("#features/travel-log/pages/WorldPage"));
const RegionPage = lazy(() => import("#features/travel-log/pages/RegionPage"));
const NationPage = lazy(() => import("#features/travel-log/pages/NationPage"));
const PlacePage = lazy(() => import("#features/travel-log/pages/PlacePage"));

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path={ROUTES.home} element={<TravelLogPage />} />

          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
          <Route
            path={ROUTES.region}
            element={<RegionPage />}
          />
          <Route
            path={ROUTES.nation}
            element={<NationPage />}
          />
          <Route
            path={ROUTES.place}
            element={<PlacePage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

