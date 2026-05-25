import { useDashboardStats } from "#features/dashboard/hooks/useDashboardStats";
import { WorldClock } from "#features/clock";
import { Map as MapComponent } from "#features/map";
import Block from "#shared/components/ui/Block";
import Card from "#shared/components/ui/Card";
import Spinner from "#shared/components/ui/Spinner";
import { ROUTES } from "#shared/constants/routes";
import { MapPin } from "lucide-react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

import type { StatCard } from "#features/dashboard/mapping/statCardsMapping";

import {
  mainStatsMapping,
  geoStatsMapping,
  transportationMapping,
  flightMapping,
  culturalMapping,
  tripRecordsMapping,
  personalFavoritesMapping,
} from "#features/dashboard/mapping/statCardsMapping";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error loading dashboard: {error.message}
      </div>
    );
  if (!stats) return <Spinner />;

  const renderCards = (config: StatCard[]) =>
    config.map((card, i) => {
      const value = card.getValue(stats);
      return (
        <Card
          key={i}
          color={card.color}
          darkTheme={card.darkTheme}
          icon={card.icon}
          title={card.title}
          value={value}
          subText={
            typeof card.subtext === "function"
              ? String(card.subtext(stats))
              : card.subtext
          }
          unit={card.unit}
        />
      );
    });

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed z-100 top-0 left-0 h-full w-64 bg-sidebarStart p-4 flex flex-col space-y-4 transform 
                    transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex overflow-y-auto`}
      >
        <div className="rounded-full bg-gradient-to-br from-emerald-700 to-emerald-800 p-3 shadow-inner">
          <div className="fixed top-0 left-0 w-full text-3xl">
            <button
              className={`lg:hidden ${sidebarOpen ? "" : "hidden"} p-2`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
          </div>
          <WorldClock />
        </div>
        {renderCards(mainStatsMapping)}
        <Link
          to={ROUTES.home}
          className="mx-6 flex items-center justify-center gap-2
             border border-orange-400
             bg-orange-700 text-white
             px-6 py-4
             rounded-sm
             shadow-sm
             hover:bg-orange-800
             active:scale-[0.99]
             transition"
        >
          <BookOpen size={18} />
          <span className="text-sm tracking-wide">Travel Log</span>
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 text-3xl bg-page p-4 pl-10">
          <div className="fixed top-0 left-0">
            <button
              className="lg:hidden p-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
          </div>
          Travel Dashboard
        </header>

        {/* Content Area */}
        <main className="flex-1 bg-mainPage p-8 space-y-8 overflow-y-auto">
          {/* Map Block */}
          <div className="flex justify-center">
            <section className="rounded-lg overflow-hidden shadow-[0_0px_8px_rgba(0,0,0,0.30)] w-full xl:w-9/10 2xl:w-8/10 h-80 md:h-120 lg:h-160">
              <MapComponent defaultCenter={[20, 10]} defaultZoom={2} />
            </section>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Geography & Extremes */}
            <Block
              title="Geography & Extremes"
              columns="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              width="md:col-span-2"
            >
              {renderCards(geoStatsMapping)}
            </Block>

            {/* Recent Trips */}
            <Block title="Recent Trips" columns="grid-cols-1">
              <Card
                color="violet"
                icon={MapPin}
                title="Trip to Paris"
                value="5 days"
              />
              <Card
                color="violet"
                icon={MapPin}
                title="Trip to Tokyo"
                value="7 days"
              />
              <Card
                color="violet"
                icon={MapPin}
                title="Trip to New York"
                value="3 days"
              />
            </Block>
          </div>

          {/* Transportation Stats */}
          <div className="grid grid-cols-1 gap-8">
            <Block
              title="Transportation Stats"
              columns="sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
            >
              {renderCards(transportationMapping)}
            </Block>
          </div>

          {/* Flight Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <Block
              title="Flight Stats"
              columns="sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2"
              width="md:col-span-2"
            >
              {renderCards(flightMapping)}
            </Block>

            {/* Cultural Stats */}
            <Block
              title="Cultural Stats"
              columns="sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              width="md:col-span-3"
            >
              {renderCards(culturalMapping)}
            </Block>
          </div>

          {/* Trip Records & Personal Favorites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Block title="Trip Records" columns="sm:grid-cols-2">
              {renderCards(tripRecordsMapping)}
            </Block>

            <Block title="Personal Favorites" columns="lg:grid-cols-2">
              {renderCards(personalFavoritesMapping)}
            </Block>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
