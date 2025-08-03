import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface HeaderHeightContextType {
    headerHeight: number;
    headerRef: React.RefObject<HTMLElement | null>;
}

const HeaderHeightContext = createContext<HeaderHeightContextType | undefined>(undefined);

interface HeaderHeightProviderProps {
    children: ReactNode;
}

export const HeaderHeightProvider: React.FC<HeaderHeightProviderProps> = ({ children }) => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const headerElement = headerRef.current;
        if (!headerElement) return;

        const updateHeight = () => {
            setHeaderHeight(headerElement.offsetHeight);
        };

        // 初始設置
        updateHeight();

        // 監聽尺寸變化
        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(headerElement);

        // 也監聽 window resize
        window.addEventListener('resize', updateHeight);

        return () => {
            resizeObserver.unobserve(headerElement);
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    return (
        <HeaderHeightContext.Provider value={{ headerHeight, headerRef }}>
            {children}
        </HeaderHeightContext.Provider>
    );
};

export const useHeaderHeight = (): HeaderHeightContextType => {
    const context = useContext(HeaderHeightContext);
    if (!context) {
        throw new Error('useHeaderHeight must be used within HeaderHeightProvider');
    }
    return context;
};