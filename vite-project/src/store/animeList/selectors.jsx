import { STATUSES } from "../../utils/status";

export const selectAnimeList = (state) => state.animeList.data;
export const selectError = (state) => state.animeList.error;
export const selectLoading = (state) => state.animeList.request == STATUSES.REQUEST