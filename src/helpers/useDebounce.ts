import { useEffect, useState } from 'react';

const useDebounce = (text: string, delay: number) => {
  const [debounceText, setDebounceText] = useState<string>(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceText(text);
    }, delay);

    return () => clearInterval(handler);
  }, [delay, text]);

  return debounceText;
};

export default useDebounce;
