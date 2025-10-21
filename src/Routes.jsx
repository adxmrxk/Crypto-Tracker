import { createBrowserRouter } from "react-router-dom";
import SettingsPage from './Pages/SettingsPage'
import SkeletonPage from "./Pages/SkeletonPage";
import HomePage from "./Pages/HomePage";
import MarketsPage from "./Pages/MarketsPage";
import PortfolioPage from "./Pages/PortfolioPage";
import NewsPage from "./Pages/NewsPage";
import AccountSettingsPage from "./Pages/NestedSettingsPages/AccountSettingsPage";
import DisplayAndThemePage from "./Pages/NestedSettingsPages/DisplayAndThemePage";
import NotificationsPage from "./Pages/NestedSettingsPages/NotificationsPage";
import PrivacyAndDataPage from "./Pages/NestedSettingsPages/NotificationsPage";
import LandingPage from "./Pages/LandingPage";
import ChatRoomPage from "./Pages/ChatRoomPage";
import AccountSecurityPage from "./Pages/NestedSettingsPages/AccountSecurityPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <SkeletonPage></SkeletonPage>,
    children: [
        { index: true, element: <LandingPage /> },
        
        { 
          path: "/SettingsPage", element: <SettingsPage></SettingsPage>, 
          children: [
            { path: "/SettingsPage/AccountSettings", element: <AccountSettingsPage></AccountSettingsPage>},
            { path: "/SettingsPage/Display", element: <DisplayAndThemePage></DisplayAndThemePage> },
            { path: "/SettingsPage/Notifications", element: <NotificationsPage></NotificationsPage>},
            { path: "/SettingsPage/AccountSecurity", element: <AccountSecurityPage></AccountSecurityPage>}
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