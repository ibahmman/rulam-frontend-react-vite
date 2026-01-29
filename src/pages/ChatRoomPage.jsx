import InternalHeader from "../components/InternalHeader";
import ChatRoom from "../components/ChatRoom";

export default function ChatRoomPage({ chatRoomId, token }) {
  return (
    <div className="flex flex-col h-full">
      <InternalHeader title="گفتگو" showBack />

      <div className="flex-1 overflow-y-auto">
        <ChatRoom chatRoomId={chatRoomId} token={token} />
      </div>
    </div>
  );
}