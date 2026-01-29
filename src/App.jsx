import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import ChatListPage from "./pages/ChatListPage";

import { useParams } from "react-router-dom";
import InternalLayout from "./layouts/InternalLayout";

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