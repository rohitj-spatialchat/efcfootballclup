import { createContext, useContext, useState, ReactNode } from "react";

type ViewMode = "admin" | "user";

interface ViewModeContextType {
  viewMode: ViewMode;
  isAdmin: boolean;
  toggleViewMode: () => void;
}

const ViewModeContext = createContext<ViewModeContextType>({
  viewMode: "admin",
  isAdmin: true,
  toggleViewMode: () => {},
});

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("admin");

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "admin" ? "user" : "admin"));
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, isAdmin: viewMode === "admin", toggleViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export const useViewMode = () => useContext(ViewModeContext);
