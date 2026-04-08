import { lazy } from "react";

import { ROUTES } from "@shared/constants/routes";

const Home = lazy(() => import("@pages/Home"));
const Invest = lazy(() => import("@pages/Invest"));
const Careers = lazy(() => import("@pages/Careers"));
const TutoringServices = lazy(() => import("@pages/TutoringServices"));
const ResearchDevelopment = lazy(() => import("@pages/ResearchDevelopment"));

interface RouteConfig {
  path: string;
  element: React.ComponentType;
}

export const routes: RouteConfig[] = [
  { path: ROUTES.HOME, element: Home },
  { path: ROUTES.INVEST, element: Invest },
  { path: ROUTES.CAREERS, element: Careers },
  { path: ROUTES.TUTORING, element: TutoringServices },
  { path: ROUTES.RESEARCH, element: ResearchDevelopment },
];
