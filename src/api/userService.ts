import type { User } from "../interfaces/User";

export async function getAllUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:8084/api/users/all");
  return res.json();
}

export async function getWorkers(): Promise<User[]> {
  const res = await fetch("http://localhost:8084/api/users/workers");
  return res.json();
}
