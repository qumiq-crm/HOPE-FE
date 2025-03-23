import { paths } from "../routes/paths";
import { useLocalStore } from "./useLocalStore";

export const useRootPath = () => {
  const { getData, itemsList } = useLocalStore();

  const data = getData(itemsList.token);
  if (!data) {
    return paths.dashboard.home;
  } else {
    return paths.admin.dashboard;
  }
};
