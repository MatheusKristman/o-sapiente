import { DefaultUser } from "next-auth";

export type StepType = number;

export interface IUser extends DefaultUser {
  accountType: string;
}

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

export interface RequestData {
  id: string;
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userIds: string[];
  firstName: string;
  lastName: string;
  profilePhoto: string;
}
