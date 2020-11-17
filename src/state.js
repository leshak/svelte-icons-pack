import { writable } from "svelte/store";

export const PAGE = {
  HOME: 1,
  PACK: 2,
  SEARCH: 3,
};

function createAppState() {
  const { subscribe, set, update } = writable({
    page: PAGE.HOME,
    param: null,
  });

  return {
    subscribe,
    clear: () => set([]),
    setPage: (pageId, param = null) =>
      set({
        page: pageId,
        param,
      }),
    __update: (id) =>
      update((state) => {
        return state;
      }),
  };
}

export const appState = createAppState();
