import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const EXTERNAL_FALLBACK_URL = "https://u-plate.com";

export function useContestIdParam() {
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get("contestId");

  useEffect(() => {
    if (!contestId) {
      window.location.replace(EXTERNAL_FALLBACK_URL);
    }
  }, [contestId]);

  return contestId;
}
