import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import InternalLayout from "./layouts/InternalLayout";
import AppLayout from "./layouts/AppLayout";
import SearchLayout from "./layouts/SearchLayout";

import ChatListPage from "./pages/ChatListPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import RelPlayPage from "./pages/RelPlayPage";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import ChatRoomPage from "./pages/ChatRoomPage";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ChatListPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="relplay" element={<RelPlayPage />} />
          <Route path="menu" element={<MenuPage />} />
          
        </Route>


        <Route 
          path="search/*"
          element={
            <ProtectedRoute>
              <SearchLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SearchPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <InternalLayout />
            </ProtectedRoute>
          }
        >
          <Route path="chat/:chatRoomId" element={<ChatRoomPageWrapper />} />
          
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

function ChatRoomPageWrapper() {
  const { chatRoomId } = useParams();
  const token = localStorage.getItem("access_token");
  return <ChatRoomPage chatRoomId={chatRoomId} token={token} />;
}