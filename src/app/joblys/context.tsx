import { createContext, useContext, ReactNode, useState } from 'react';

type cvContext = {
  cv: string;
  setCv: (content: string) => void;
}

const cvContextDefaultValues: cvContext = {
  cv: '',
  setCv: (content) => {},
};

export function useCv() {
  return useContext(CvContext);
}

type Props = {
    children: ReactNode;
};

const CvContext = createContext<cvContext>(cvContextDefaultValues);

export function CvContextProvider({ children }: Props) {
  const [cvContent, setCvContent] = useState<string>('');

  const value: cvContext = {
    cv: '',
    setCv: (content: string) => setCvContent(content),
  }

  return (
    <>
      <CvContext.Provider value={value}>
        {children}
      </CvContext.Provider>
    </>
  );
}
