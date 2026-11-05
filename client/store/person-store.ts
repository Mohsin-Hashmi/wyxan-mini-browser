import { create } from "zustand";

interface PersonState {
  personId: string;
  setPersonId: (personId: string) => void;
}

export const usePersonStore = create<PersonState>((set) => ({
  personId: "",
  setPersonId: (personId) => set({ personId }),
}));
