import { useState } from "react";
import useUserStore from "../store/useUserStore";

const useDragAndDrop = () => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const reorderUsers = useUserStore((state) => state.reorderUsers);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    reorderUsers(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return {
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

export default useDragAndDrop;
