import { useEffect, useMemo, useState } from "react";
import type { FlipperType } from "../types";

export default function useFlippers(flippersPages: FlipperType[][]) {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const currentFlippersPage = useMemo(() => {
    return flippersPages[currentPage];
  }, [flippersPages, currentPage]);

  useEffect(() => {
    setFlipped([]);
    setMatched([]);
    setDisabled(false);
  }, [currentFlippersPage]);

  const handleClick = (index: number) => {
    if (disabled) return;
    if (flipped.includes(index)) return;
    if (matched.includes(index)) return;

    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      const a = currentFlippersPage[next[0]];
      const b = currentFlippersPage[next[1]];

      if (a && b && a.entry_id === b.entry_id) {
        setMatched((m) => [...m, next[0], next[1]]);
        setFlipped([]);
      } else {
        setDisabled(true);
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const handleNextFlippersPage = () => {
    if (currentPage >= flippersPages.length - 1) {
      setCurrentPage(0);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // const resetFlippers = () => {
  //   setFlipped([]);
  //   setMatched([]);
  //   setDisabled(false);
  // };

  useEffect(() => {
    if (matched.length > 0 && matched.length === currentFlippersPage.length) {
      const timeout = setTimeout(() => {
        if (flippersPages.length > 1) {
          handleNextFlippersPage();
        }
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [matched, currentFlippersPage, flippersPages.length]);

  return {
    flippersPage: currentFlippersPage,
    flipped,
    matched,
    disabled,
    handleClick,
    handleNextFlippersPage,
  };
}
