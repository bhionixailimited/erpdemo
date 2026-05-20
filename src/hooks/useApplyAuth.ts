import { BASE_URL } from "configs";
import { IRegistration } from "types/registeredUser";
import { getLocalStorageItem, removeFromLocalStorage } from "utils";
import { create } from "zustand";
type AuthState = {
  isUserLoading: boolean;
  user?: Partial<IRegistration>;
  setUser: (user: Partial<IRegistration>) => Promise<void>;
  logOut: () => Promise<void>;
  getUser: (token?: string) => Promise<void>;
  revalidation: () => Promise<void>;
};
const useApplyAuth = create<AuthState>((set, get) => ({
  isUserLoading: true,
  user: {},
  setUser: async (user: Partial<IRegistration>) => {
    set({ user: { ...user } });
  },
  logOut: async () => {
    removeFromLocalStorage("ACCESS_TOKEN");
    set({ user: {} });
    window.location.replace("/apply");
  },
  getUser: async (token?: string) => {
    const accessToken = getLocalStorageItem("ACCESS_TOKEN");
    try {
      const res = await fetch(`${BASE_URL}registration/self`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res?.status === 401) {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        set({ user: {}, isUserLoading: false });
      }
      if (res?.status === 200) {
        const data = await res.json();
        set({ user: { ...data?.data?.data }, isUserLoading: false });
      } else {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        window?.localStorage?.removeItem("ACCESS_TOKEN");
      }
    } catch (error) {
      set({ user: {} });
    }
  },
  revalidation: async () => {
    await get().getUser();
  },
}));

export default useApplyAuth;
