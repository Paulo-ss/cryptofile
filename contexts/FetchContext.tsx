import { createContext, FC, ReactNode, useState } from "react";

interface FetchContextData {
  isLoading: boolean;
  data: { message?: string; token?: string } | null;
  error: string | null;
  isNotificationOpened: boolean;
  request: (url: string, options?: {}) => Promise<void>;
  resetData: () => void;
}

interface Props {
  children: ReactNode;
}

export const FetchContext = createContext({} as FetchContextData);

const FetchContextProvider: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isNotificationOpened, setIsNotificationOpened] = useState(false);

  const resetData = () => {
    setData(null);
  };

  const request = async (url: string, options?: {}) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(url, options);
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.message);
      }

      setData(json);
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message);
      setData(null);
      setIsLoading(false);
    } finally {
      setIsNotificationOpened(true);

      setTimeout(() => {
        setIsNotificationOpened(false);
      }, 3000);
    }
  };

  return (
    <FetchContext.Provider
      value={{
        isLoading,
        data,
        error,
        isNotificationOpened,
        request,
        resetData,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export default FetchContextProvider;
