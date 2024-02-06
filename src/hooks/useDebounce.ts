import { useState, useEffect } from "react";


function useDebounce(value: string, delay = 300) {
  const [debouncedVal, setDebouncedVal] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedVal(value), delay);
    return () => {
      clearTimeout(timer);
    }  
  }, [value, delay]);

  return debouncedVal;
}


export default useDebounce;