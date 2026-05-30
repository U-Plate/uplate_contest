
import { Contest } from "./constants";
import { contestsApi } from "./contests";
import React, { createContext, useContext,  type ReactNode } from 'react';



interface ContestsContextType {
  
  getContestById: (id: string) => Promise<Contest | undefined>;
  joinContest: (id: string, email: string) => Promise<void>;
}

const ContestsContext = createContext<ContestsContextType | undefined>(undefined);


const ApiContestsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const getContestById = async (id: string) => {
    const contest = await contestsApi.getById(id);
    return contest;
  };

  const joinContest = async (id: string, email: string) => {
    await contestsApi.joinContest(id, email);
  }

  


  return (
    <ContestsContext.Provider
      value={{
       
        getContestById,
        joinContest,
      }}
    >
      {children}
    </ContestsContext.Provider>
  );
};

export const ContestsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ApiContestsProvider>{children}</ApiContestsProvider>
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContests = (): ContestsContextType => {
  const context = useContext(ContestsContext);
  if (!context) {
    throw new Error('useContests must be used within a ContestsProvider');
  }
  return context;
};
