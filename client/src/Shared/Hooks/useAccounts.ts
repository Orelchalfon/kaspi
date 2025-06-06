import { useContext } from "react";
import { AccountContext } from "../Context/AccountContextProvider";

// Create the Context

// Create the Context

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccounts must be used within an AccountsProvider");
  }
  return context;
};
