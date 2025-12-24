import { MessageCircle } from "lucide-react";

export default function ChooseChat(){

    return (
      <div className="flex flex-col items-center justify-center space-y-6 text-center p-8 h-full w-full">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center">
            <MessageCircle />
          </div>
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold text-foreground">
            Select a chat to view your conversation
          </h2>
          <p className="text-muted-foreground text-sm">
            Choose a conversation from the list or search for an educator to
            start chatting
          </p>
        </div>
      </div>
    );
}