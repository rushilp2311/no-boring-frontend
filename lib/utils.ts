import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function saveUserOnLocalStorage(user: any) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage() {
  const user = window.localStorage.getItem("user");
  if (!user) return {};
  return JSON.parse(user);
}
