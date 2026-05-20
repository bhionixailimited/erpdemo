import { BASE_URL } from "configs";
import User from "types/user";
import { getLocalStorageItem, removeFromLocalStorage } from "utils";
import { create } from "zustand";
type AuthState = {
  isUserLoading: boolean;
  user?: Partial<User>;
  setUser: (user: Partial<User>) => Promise<void>;
  logOut: () => Promise<void>;
  getUser: (token?: string) => Promise<Partial<User> | undefined>;
  getUserAllDetails: (userId?: string) => Promise<void>;
  getUserInstitute: (instituteId: string) => Promise<void>;
  instituteData: any;
  switchInstitute: boolean;
  setSwitchInstitute: (isSwitch: boolean) => void;
};
const useAuth = create<AuthState>((set, get) => ({
  isUserLoading: true,
  switchInstitute: false,
  user: {},
  instituteData: {},
  setSwitchInstitute: (isSwitch: boolean) => {
    set({ switchInstitute: isSwitch });
  },
  setUser: async (user: Partial<User>) => {
    set({ user: { ...user } });
  },
  logOut: async () => {
    const accessToken = getLocalStorageItem("ACCESS_TOKEN");
    await fetch(BASE_URL + "auth/logout", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    removeFromLocalStorage("ACCESS_TOKEN");
    set({ user: {} });
    window.location.replace("/login");
  },
  getUser: async (token?: string) => {
    const accessToken = getLocalStorageItem("ACCESS_TOKEN");
    try {
      const res = await fetch(`${BASE_URL}user/account`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res?.status === 401) {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        set({ user: {}, isUserLoading: false });
        return undefined;
      }
      if (res?.status === 200) {
        const data = await res.json();
        const accountUser = { ...data?.data?.data };
        set({ user: accountUser, isUserLoading: false });
        if (accountUser?.instituteId?._id)
          await get().getUserInstitute(accountUser?.instituteId?._id);
        if (
          accountUser?.instituteId?._id &&
          !["SUPER_ADMIN", "MANAGER"]?.includes(String(accountUser?.role))
        )
          localStorage.setItem(
            "instituteId",
            accountUser?.instituteId?._id || accountUser?.instituteId
          );
        return accountUser;
      }
      window?.localStorage?.removeItem("ACCESS_TOKEN");
      set({ user: {}, isUserLoading: false });
      return undefined;
    } catch (error) {
      set({ user: {}, isUserLoading: false });
      return undefined;
    }
  },
  getUserAllDetails: async (userId?: string) => {
    if (!userId) return;
    const accessToken = getLocalStorageItem("ACCESS_TOKEN");
    try {
      const res = await fetch(
        `${BASE_URL}user/details/${userId}?academics=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res?.status === 401) {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        set({ user: {}, isUserLoading: false });
      }
      if (res?.status === 200) {
        const data = await res.json();
        set((state) => {
          return {
            ...state,
            user: {
              ...state.user,
              academicDetails: {
                ...data?.data?.data?.academicDetails,
              },
            },
          };
        });
      } else {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        window?.localStorage?.removeItem("ACCESS_TOKEN");
      }
    } catch (error) {
      set({ user: {} });
    }
  },
  getUserInstitute: async (instituteId?: string) => {
    if (!instituteId) return;
    const accessToken = getLocalStorageItem("ACCESS_TOKEN");
    try {
      const res = await fetch(`${BASE_URL}institute/${instituteId}`, {
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
        set({
          instituteData: data?.data?.data,
        });
      } else {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        window?.localStorage?.removeItem("ACCESS_TOKEN");
      }
    } catch (error) {
      set({ user: {} });
    }
  },
}));

export default useAuth;
