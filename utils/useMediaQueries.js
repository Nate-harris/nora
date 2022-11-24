import { useMediaQuery } from "react-responsive";

export const useIsSmall = () => {
  return useMediaQuery({
    query: "(max-width: 768px)",
  });
};
