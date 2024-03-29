import React, {
  createContext,
  useState,
  FunctionComponent,
  ReactNode,
} from "react";

type RoleContextType = {
  role: string;
  setRole: (role: string) => void;
};

// Setting initial value for context
const initialContext: RoleContextType = {
  role: "user",
  setRole: () => {},
};

export const RoleContext = createContext<RoleContextType>(initialContext);

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: FunctionComponent<RoleProviderProps> = ({
  children,
}) => {
  const [role, setRole] = useState<string>("user"); // Default role

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
