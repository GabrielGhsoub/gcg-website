import { ROUTES } from "@shared/constants/routes";
import Home from "@pages/Home";
import Invest from "@pages/Invest";
import Careers from "@pages/Careers";
import TutoringServices from "@pages/TutoringServices";
import ResearchDevelopment from "@pages/ResearchDevelopment";

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
