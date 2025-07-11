import { createBrowserRouter } from "react-router-dom";
import SettingsPage from './Pages/SettingsPage'
import Skeleton from "./Pages/Skeleton";
import HomePage from "./Pages/HomePage";
import MarketsPage from "./Pages/MarketsPage";
import PortfolioPage from "./Pages/PortfolioPage";
import NewsPage from "./Pages/NewsPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Skeleton></Skeleton>,
    children: [
        { index: true, element: <HomePage /> },
        { path: "/SettingsPage", element: <SettingsPage></SettingsPage> },
        { path: "/MarketsPage", element: <MarketsPage></MarketsPage>},
        { path: '/PortfolioPage', element: <PortfolioPage></PortfolioPage>},
        { path: '/NewsPage', element: <NewsPage></NewsPage>},
        { path: '/HomePage', element: <HomePage></HomePage>}
    ]
  }
]);

export default router;