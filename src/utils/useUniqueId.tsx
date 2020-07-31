import { useRef } from "react";

export const useUniqueId = () => {
  const ids = useRef<string[]>([]);

  const generate = (): string => {
    const id =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now();

    if (ids.current.indexOf(id) !== -1) {
      return generate();
    }

    // Add id to the memory to check uniqueness
    ids.current.push(id);

    return id;
  };

  return { generate };
};
