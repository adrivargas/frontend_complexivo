import { http } from "./http";
    
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Shows = {
  id: number;
  movie_title: string;
  genre: string;
  duration_min: number;
  is_active: boolean;
};

export async function listVehiculosPublicApi() {
  const { data } = await http.get<Paginated<Shows>>("api/vehicle-services/");
  return data; // { ... , results: [] }
}

export async function listVehiculosAdminApi() {
  const { data } = await http.get<Paginated<Shows>>("/api/vehiculos/");
  return data;
}

export async function createVehiculoApi(payload: Omit<Shows, "id">) {
  const { data } = await http.post<Shows>("/api/vehiculos/", payload);
  return data;
}

export async function updateVehiculoApi(id: number, payload: Partial<Shows>) {
  const { data } = await http.put<Shows>(`/api/vehiculos/${id}/`, payload);
  return data;
}

export async function deleteVehiculoApi(id: number) {
  await http.delete(`/api/vehiculos/${id}/`);
}