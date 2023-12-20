// src/components/LoadingSpinner/index.tsx
import React from "react";
import { HashLoader } from "react-spinners";
import { useLoading } from "../../contexts/LoadingContext";

const GameSpinner: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) {
    console.log("not Loading");
    return null;
  } else {
    console.log("isLoading i nspinner");
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
      <HashLoader size={100} color={"#F4CA66"} />
    </div>
  );
};

export default GameSpinner;
