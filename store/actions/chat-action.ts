"use client";
import { AppDispatch, store } from "../store";
import * as chatReducer from "../reducers/chatReducer";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase-service/config";
import { FIREBASE_COLLECTION_PATH, FIREBASE_FIELDS_NAME } from "@/utils/constant";
import { Message, Conversation } from "@/types/chatType";
import { serializeValue, enrichChatWithUserDetails } from "../../firebase-service/chat-helpers";

let userChatUnsubscribe: (() => void) | null = null;

export const setUserOnfirebase = (user: any) => async () => {
  try {
    const userRef = doc(db, FIREBASE_COLLECTION_PATH.USERS, user.id);
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      const userObj = {
        name : user?.first_name + " " + user?.last_name,
        email: user?.email,
        avatar: user?.avatar_path,
        role: user?.role,
        uid: user?.id,
        phone: user?.phone,
        active_status: user?.active_status,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
      }
      await setDoc(userRef, userObj);
    }
  } catch (error) {
    console.error("Error in firebaseLogin:", error);
  }
};


export const createNewChat = (secondUserId: string) => async (dispatch: AppDispatch): Promise<Conversation | null> => {
  try {
    const { auth } = store.getState();
    const currentUserId = auth?.user?.id || auth?.user?.uid;
    
    if (!currentUserId || !secondUserId) {
      console.error("User IDs not found");
      return null;
    }

    // Check if chat already exists
    const existingChatQuery = query(
      collection(db, FIREBASE_COLLECTION_PATH.CHATS),
      where(FIREBASE_FIELDS_NAME.MEMBERS_ID, "array-contains", currentUserId)
    );
    
    const existingChatSnapshot = await getDocs(existingChatQuery);
    
    for (const docSnapshot of existingChatSnapshot.docs) {
      const chatData = docSnapshot.data();
      if (chatData.members_ids?.includes(secondUserId)) {
        // Chat already exists, return it
        const raw: any = { ...chatData, chat_id: docSnapshot.id };
        await enrichChatWithUserDetails(raw, currentUserId);
        const data = serializeValue(raw);
        return data as Conversation;
      }
    }


    const chatObj = {
      participants: [
        {
          user_id: currentUserId,
        },
        {
          user_id: secondUserId,
        },
      ],
      members_ids: [currentUserId, secondUserId],
      type: "private",
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    const newDocRef = doc(collection(db, FIREBASE_COLLECTION_PATH.CHATS));
    await setDoc(newDocRef, { ...chatObj, chat_id: newDocRef.id });

    // Fetch the newly created chat with user details
    const newDocSnapshot = await getDoc(newDocRef);
    
    if (newDocSnapshot.exists()) {
      const raw: any = { ...newDocSnapshot.data(), chat_id: newDocRef.id };
      await enrichChatWithUserDetails(raw, currentUserId);
      const data = serializeValue(raw);
      return data as Conversation;
    }

    return null;
  } catch (err: any) {
    console.error("Error creating chat: ", err.message);
    return null;
  }
};
export const getUserMessages = (id: string) => async (dispatch: AppDispatch) => {
  try {
    if (userChatUnsubscribe) {
      userChatUnsubscribe();
      userChatUnsubscribe = null;
    }
    userChatUnsubscribe = onSnapshot(
      query(
        collection(db, FIREBASE_COLLECTION_PATH.CHATS, id, FIREBASE_COLLECTION_PATH.MESSAGES),
        orderBy("sentAt")
        ),
        async (querySnapshot) => {
          const messageArray: Message[] = [];
       querySnapshot.forEach((doc) => {
         messageArray.push(doc.data() as Message);
        });
        dispatch(chatReducer.set_messages(messageArray));
        // dispatch(updateLastView(id));
      }
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
  }
};



export const sendMessage =
  (chatId: string, text: string) => async () => {
    try {
      const { auth } = store.getState();
      const userId = auth?.user?.id;
      if (!userId) {
        console.error("User ID not found");
        return;
      }

      const chatRef = doc(db, FIREBASE_COLLECTION_PATH.CHATS, chatId);
      const now = Timestamp.now();

      // Add new message
      await addDoc(
        collection(db, FIREBASE_COLLECTION_PATH.CHATS, chatId, FIREBASE_COLLECTION_PATH.MESSAGES),
        {
          text,
          sentAt: now,
          senderId: userId,
          chatId
        }
      );

      // Get current chat data and update participants' unread counts
      const chatSnap = await getDoc(chatRef);
      const chatData = chatSnap.data();

      // Defensive: Ensure participants is array
      const participants = Array.isArray(chatData?.participants) ? chatData.participants : [];

      const updatedParticipants = participants.map((member: any) => ({
        ...member,
        unread_count: member?.user_id !== userId
          ? (typeof member?.unread_count === "number" ? member?.unread_count + 1 : 1)
          : 0,
      }));

      // Update chat's recent_message, updated_at, and participants
      await updateDoc(chatRef, {
        participants: updatedParticipants,
        recent_message: {
          messageText: text,
          sentAt: now,
          sentBy: userId,
        },
        updated_at: now,
      });
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error sending message:", error.message);
    }
  };

// Real-time subscription to user chat list
let chatListUnsubscribe: (() => void) | null = null;

export const subscribeToUserChatList = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    // Unsubscribe from previous listener if exists
    if (chatListUnsubscribe) {
      chatListUnsubscribe();
      chatListUnsubscribe = null;
    }

    if (!userId) {
      console.error("User ID not found");
      return;
    }

    const chatQuery = query(
      collection(db, FIREBASE_COLLECTION_PATH.CHATS),
      where(FIREBASE_FIELDS_NAME.MEMBERS_ID, "array-contains", userId)
    );

    chatListUnsubscribe = onSnapshot(
      chatQuery,
      async (querySnapshot) => {
        const list: Conversation[] = [];

        // Process all chat documents
        for (const q of querySnapshot.docs) {
          const raw: any = { ...q.data(), chat_id: q.id };

          // Enrich with user details
          await enrichChatWithUserDetails(raw, userId);

          // Serialize entire doc (handles updated_at, created_at, participants[*].last_seen,
          // recent_message.sent_at and recentMessage.sentAt, etc.)
          const data = serializeValue(raw);
          
          // Ensure avatar is set if not already present

          list.push(data as Conversation);
        }

        // Sort by updated_at (most recent first)
        list.sort((a, b) => {
          const aTime = a.updated_at;
          const bTime = b.updated_at;
          return (bTime as number) - (aTime as number);
        });

        dispatch(chatReducer.setConversations(list));
      },
      (error) => {
        console.error("Error in chat list snapshot: ", error);
      }
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error subscribing to chat list: ", error.message);
  }
};

export const resetUnreadCount = (chatId: string) => async () => {
  try {
    const { auth } = store.getState();
    const userId = auth?.user?.id || auth?.user?.uid;
    if (!userId || !chatId) {
      console.error("User ID or Chat ID not found");
      return;
    }

    const chatRef = doc(db, FIREBASE_COLLECTION_PATH.CHATS, chatId);
    const chatSnap = await getDoc(chatRef);
    
    if (!chatSnap.exists()) {
      console.error("Chat not found");
      return;
    }

    const chatData = chatSnap.data();
    const participants = Array.isArray(chatData?.participants) ? chatData.participants : [];

    // Update unread_count to 0 for the current user
    const updatedParticipants = participants.map((member: any) => ({
      ...member,
      unread_count: member?.user_id === userId ? 0 : member?.unread_count,
    }));

    // Update Firebase
    await updateDoc(chatRef, {
      participants: updatedParticipants,
      updated_at: Timestamp.now(),
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error resetting unread count:", error.message);
  }
};

export const unsubscribeFromUserChatList = () => {
  if (chatListUnsubscribe) {
    chatListUnsubscribe();
    chatListUnsubscribe = null;
  }
  if (userChatUnsubscribe) {
    userChatUnsubscribe();
    userChatUnsubscribe = null;
  }
};