import { DefaultUser } from "next-auth";

export type StepType = number;

export interface IUser extends DefaultUser {
  accountType: string;
}
