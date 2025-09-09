import { createBrowserRouter } from "react-router-dom";
import SettingsPage from './Pages/SettingsPage'
import Skeleton from "./Pages/Skeleton";
import HomePage from "./Pages/HomePage";
import MarketsPage from "./Pages/MarketsPage";
import PortfolioPage from "./Pages/PortfolioPage";
import NewsPage from "./Pages/NewsPage";
import AccountSettingsPage from "./Pages/NestedSettingsPages/AccountSettingsPage";
import DisplayAndThemePage from "./Pages/NestedSettingsPages/DisplayAndThemePage";
import MockInvestingControlsPage from "./Pages/NestedSettingsPages/MockInvestingControlsPage";
import NotificationsPage from "./Pages/NestedSettingsPages/NotificationsPage";
import PrivacyAndDataPage from "./Pages/NestedSettingsPages/PrivacyAndDataPage";
import LandingPage from "./Pages/LandingPage";
import ChatRoomPage from "./Pages/ChatRoomPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Skeleton></Skeleton>,
    children: [
        { index: true, element: <LandingPage /> },
        
        { 
          path: "/SettingsPage", element: <SettingsPage></SettingsPage>, 
          children: [
            { path: "/SettingsPage/AccountSettings", element: <AccountSettingsPage></AccountSettingsPage>},
            { path: "/SettingsPage/Display", element: <DisplayAndThemePage></DisplayAndThemePage> },
            { path: "/SettingsPage/MockInvestingControls", element: <MockInvestingControlsPage></MockInvestingControlsPage>},
            { path: "/SettingsPage/Notifications", element: <NotificationsPage></NotificationsPage>},
            { path: "/SettingsPage/Privacy", element: <PrivacyAndDataPage></PrivacyAndDataPage>}
          ]
        }, 
        
        { path: "/MarketsPage", element: <MarketsPage></MarketsPage>},
        { path: '/PortfolioPage', element: <PortfolioPage></PortfolioPage>},
        { path: '/ChatRoomPage', element: <ChatRoomPage></ChatRoomPage>},
        { path: '/HomePage', element: <HomePage></HomePage>}
    ]
  }, 

  
]);

export default router;