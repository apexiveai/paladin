import { api } from "./api";

export type BackendHealth = {

  status: string;

  [key: string]: unknown;

};

export async function getBackendHealth() {

  return api.get<BackendHealth>("/health");

}