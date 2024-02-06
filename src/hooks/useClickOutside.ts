import { useEffect, type RefObject } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, handle: Function) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      console.log(ref.current,event.target)
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handle(event);
    };

    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    }
  });
};

export default useClickOutside;