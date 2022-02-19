import { useEffect, useRef } from "react";

export const usePrev = (value) => {   // получает предыдущие значение state
        
    const ref = useRef(null);

    useEffect(() => {
        ref.current = value;
    });
    return ref.current
};