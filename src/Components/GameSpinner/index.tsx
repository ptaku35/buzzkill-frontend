// src/components/LoadingSpinner/index.tsx
import React from "react";
import { RingLoader } from "react-spinners";
import { useLoading } from "../../contexts/LoadingContext";

const GameSpinner: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  } 

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    >
      <RingLoader size={150} color={"#BC8E2D"} />
    </div>
  );
};

export default GameSpinner;
