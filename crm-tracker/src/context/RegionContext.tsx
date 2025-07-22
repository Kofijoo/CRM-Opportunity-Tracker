import { createContext, useContext, useState, ReactNode } from 'react';

type Region = 'Oslo' | 'Bergen';

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<Region>('Oslo');

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) throw new Error('useRegion must be used inside RegionProvider');
  return context;
}
