import { useState, useEffect } from "react";
import { type AppData } from "../types";

interface AppDataState {
  data: AppData | null;
  loading: boolean;
  error: string | null;
}

export const useAppData = (): AppDataState => {
  const [state, setState] = useState<AppDataState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/mock.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData: AppData = await response.json();

        setState({ data: jsonData, loading: false, error: null });
      } catch (err) {
        console.error("Error fetching data:", err);
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    };

    fetchData();
  }, []);

  return state;
};
