import { useState } from "react";
import { MessageSquare, Search, Archive, MoreVertical, Send, Package, Gavel, Check, CheckCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockConversations, mockMessages } from "@/data/mockChatNotifications";
import { useMock } from "@/contexts/MockContext";
import { cn } from "@/lib/utils";
import type { MessageStatus } from "@/types";

// Message status icon
function MessageStatusIcon({ status }: { status: MessageStatus }) {
  switch (status) {
    case "sent":
      return <Check className="h-3 w-3 text-muted-foreground" />;
    case "delivered":
      return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
    case "read":
      return <CheckCheck className="h-3 w-3 text-info" />;
    default:
      return null;
  }
}

// Context badge for conversation
function ContextBadge({ listingId, dealId }: { listingId?: string; dealId?: string }) {
  if (dealId) {
    return (
      <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
        <Gavel className="h-3 w-3 mr-1" />
        Deal
      </Badge>
    );
  }
  if (listingId) {
    return (
      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
        <Package className="h-3 w-3 mr-1" />
        Listing
      </Badge>
    );
  }
  return null;
}

export default function ChatPage() {
  const { currentUser } = useMock();
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]?.id);
  const [messageInput, setMessageInput] = useState("");

  // Get active conversations (not archived)
  const activeConversations = mockConversations.filter((c) => !c.isArchived);
  const archivedConversations = mockConversations.filter((c) => c.isArchived);

  // Get messages for selected conversation
  const messages = selectedConversation ? mockMessages[selectedConversation] || [] : [];

  // Get other participant in conversation
  const getOtherParticipant = (conversationId: string) => {
    const conversation = mockConversations.find((c) => c.id === conversationId);
    if (!conversation) return null;
    return conversation.participants.find((p) => p.id !== currentUser?.id);
  };

  const selectedParticipant = selectedConversation ? getOtherParticipant(selectedConversation) : null;
  const selectedConversationData = mockConversations.find((c) => c.id === selectedConversation);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Chat</h1>
        <p className="text-muted-foreground mt-1">
          Messages are linked to specific listings or deals.
        </p>
      </div>

      {/* Chat Interface */}
      <div className="grid gap-4 lg:grid-cols-3 h-[calc(100vh-220px)] min-h-[500px]">
        {/* Conversation List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100%-60px)]">
              {activeConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-medium">No conversations</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start a conversation from a listing or deal.
                  </p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {activeConversations.map((conversation) => {
                    const otherParticipant = conversation.participants.find(
                      (p) => p.id !== currentUser?.id
                    );
                    const isSelected = selectedConversation === conversation.id;

                    return (
                      <button
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={cn(
                          "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                          isSelected ? "bg-muted" : "hover:bg-muted/50"
                        )}
                      >
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarFallback>
                            {otherParticipant?.firstName?.[0]}
                            {otherParticipant?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium truncate">
                              {otherParticipant?.companyName}
                            </span>
                            {conversation.unreadCount > 0 && (
                              <Badge className="h-5 min-w-5 rounded-full bg-accent text-accent-foreground text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <ContextBadge
                              listingId={conversation.linkedListingId}
                              dealId={conversation.linkedDealId}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {archivedConversations.length > 0 && (
                    <>
                      <Separator className="my-2" />
                      <div className="px-3 py-2">
                        <span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                          <Archive className="h-3 w-3" />
                          Archived ({archivedConversations.length})
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConversation && selectedParticipant ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {selectedParticipant.firstName?.[0]}
                        {selectedParticipant.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {selectedParticipant.companyName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedParticipant.firstName} {selectedParticipant.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ContextBadge
                      listingId={selectedConversationData?.linkedListingId}
                      dealId={selectedConversationData?.linkedDealId}
                    />
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const isOwn = message.senderId === currentUser?.id;
                      return (
                        <div
                          key={message.id}
                          className={cn(
                            "flex",
                            isOwn ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[70%] rounded-lg px-4 py-2",
                              isOwn
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div
                              className={cn(
                                "flex items-center gap-1 mt-1",
                                isOwn ? "justify-end" : "justify-start"
                              )}
                            >
                              <span
                                className={cn(
                                  "text-xs",
                                  isOwn
                                    ? "text-primary-foreground/70"
                                    : "text-muted-foreground"
                                )}
                              >
                                {new Date(message.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                              {isOwn && <MessageStatusIcon status={message.status} />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        // Handle send (mock mode, just clear)
                        setMessageInput("");
                      }
                    }}
                  />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <MessageSquare className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="font-medium text-lg">Select a conversation</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Choose a conversation from the list to view messages.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
