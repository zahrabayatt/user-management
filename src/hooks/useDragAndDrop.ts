import { useState } from "react";
import useUserStore from "../store/useUserStore";
import { User } from "../entities/user";

const useDragAndDrop = () => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [previewUsers, setPreviewUsers] = useState<User[] | null>(null);
  const users = useUserStore((state) => state.users);
  const reorderUsers = useUserStore((state) => state.reorderUsers);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    setPreviewUsers(users);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || !previewUsers) return;

    // Update preview only
    const items = [...previewUsers];
    const draggedItem = items[draggedIndex];
    items.splice(draggedIndex, 1);
    items.splice(index, 0, draggedItem);
    setPreviewUsers(items);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && previewUsers) {
      // Only update the actual store when drop is confirmed
      reorderUsers(users, previewUsers);
    }
    setDraggedIndex(null);
    setPreviewUsers(null);
  };

  return {
    draggedIndex,
    previewUsers,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

export default useDragAndDrop;
