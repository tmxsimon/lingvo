import { useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { currentIndex, setCurrentIndex, isOpen, openModal, closeModal };
}
