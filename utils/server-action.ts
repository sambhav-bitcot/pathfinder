"use server"

import { StreamClient } from "@stream-io/node-sdk";
import { config } from "./config";

export const getToken = async (userId: string, sessionDuration: number) => {
  if(config.STREAM_API_KEY && config.STREAM_API_SECRET) {
    const serverClient = new StreamClient(config.STREAM_API_KEY, config.STREAM_API_SECRET);
    const token = serverClient.generateUserToken({
      user_id: userId,
      validity_in_seconds: typeof sessionDuration === 'number' ? sessionDuration * 60 : 0,
    });
    
    return token;
  }
  return null;
};
