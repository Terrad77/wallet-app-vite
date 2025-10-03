import { useState, useEffect } from "react";
import { AppData } from "../types/models";
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
        // Загрузка файла из папки public (имитация API-запроса)
        const response = await fetch("/data/mock.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData: AppData = await response.json();

        // В реальном приложении здесь можно провести валидацию данных

        setState({ data: jsonData, loading: false, error: null });
      } catch (err) {
        console.error("Error fetching data:", err);
        setState({
          data: null,
          loading: false,
          error: "Failed to load application data.",
        });
      }
    };

    fetchData();
  }, []);

  return state;
};
