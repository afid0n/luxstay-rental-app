import type { Apartment } from "@/types/apartments";
import instance from "../axios-instance";
import { endpoints } from "../constants";

export async function getApartments(): Promise<Apartment[]> {
  const response = await instance.get<{ message: string; data: Apartment[] }>(endpoints.apartments);
  return response.data.data;
}

export async function getApartmentById(id: string): Promise<Apartment | null> {
    const response = await instance.get(`${endpoints.apartments}/${id}`);
  return response.data;

}

export async function deleteApartmentById(id:string):  Promise<{ message: string }>{
   const response = await instance.delete<{ message: string }>(`${endpoints.apartments}/${id}`);
  return response.data;
}

export async function getHostApartments(entrepreneurId: string | undefined): Promise<Apartment[]> {
  const response = await instance.get<{ message: string; data: Apartment[] }>(
    `${endpoints.apartments}?entrepreneurId=${entrepreneurId}`
  );
  return response.data.data;
}

export async function addApartment(data: Partial<Apartment>): Promise<{ message: string }> {
  const response = await instance.post(endpoints.apartments, data);
  return response.data;
}

export async function toggleWishlist(
  apartmentId: string,
  userId: string
): Promise<{ message: string; wishlistedBy: { id: string }[] }> {
  const response = await instance.patch(`${endpoints.apartments}/${apartmentId}`, {
    toggleWishlist: true,
    userId,
  });
  return response.data;
}


export async function updateApartment(
  id: string,
  data: Partial<Omit<Apartment, "id">>
): Promise<{ message: string }> {
  const response = await instance.put(`${endpoints.apartments}/${id}`, data);
  return response.data;
}