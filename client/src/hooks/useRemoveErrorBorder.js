import { useEffect, useRef } from 'react';

const useRemoveBorder = (handler) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleRemoveBorder = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener('mousedown', handleRemoveBorder);
        return () => {
            document.removeEventListener('mousedown', handleRemoveBorder);
        };
    }, [handler]);

    return ref;
};

export default useRemoveBorder;