import { DefaultUser } from "next-auth";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import {
  AccountRole,
  Conversation,
  Offer,
  Request,
  User,
  Message,
} from "@prisma/client";

export type StepType = number;

export type stateOptionsType = {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
};

export type cityOptionsType = {
  id: number;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: {
      id: number;
      nome: string;
      UF: {
        id: number;
        sigla: string;
        nome: string;
        regiao: {
          id: number;
          sigla: string;
          nome: string;
        };
      };
    };
  };
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type MessagesWithUser = Message & {
  sender: User;
};

export type RequestWithUsersAndOffers = Request & {
  users: User[];
  offers: OfferWithUser[];
};

export type UserFromRequest = {
  firstName: string;
  lastName: string;
  email: string;
  themes: string[];
  accountType: AccountRole;
  profilePhoto: string | null;
  requestIds: string[];
  seenMessageIds: string[];
};

export type OfferWithUser = Offer & {
  user: User;
};

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
  request: Request[];
};
