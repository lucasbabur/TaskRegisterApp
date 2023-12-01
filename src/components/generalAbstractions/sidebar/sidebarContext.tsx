import { createContext, useContext } from "react";
import { useSignal, Signal, signal } from "@preact/signals-react";

interface SidebarContextProps {
  activeSidebar: Signal;
}

const SidebarContext = createContext<SidebarContextProps>({
  activeSidebar: signal(""),
});

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar needs to be used in a SidebarProvider");
  }
  return context;
};

interface childrenProps {
  children: React.ReactNode;
  standardValue: string;
}

export const SidebarProvider: React.FC<childrenProps> = ({
  children,
  standardValue,
}) => {
  const sidebarSignal = useSignal(standardValue);

  const value = {
    activeSidebar: sidebarSignal,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
