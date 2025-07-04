"use client";

import React, { useContext, useEffect, useState } from "react";

interface ContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProviderProps {
  children: React.ReactNode;
}

const Context = React.createContext<ContextProps | undefined>(undefined);

const ContextProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fallback: set loading to false after 5 seconds regardless
    const timer = setTimeout(() => {
      // console.log("Timeout: forcing loading to false");
      setLoading(false);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <Context.Provider value={{ loading, setLoading }}>
      {children}
    </Context.Provider>
  );
};

const HomeContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};

export { HomeContext, ContextProvider };
