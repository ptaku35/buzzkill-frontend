// src/components/LoadingSpinner/index.tsx
import React from "react";
import { BounceLoader } from "react-spinners";
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
      <BounceLoader size={100} color={"#BC8E2D"} />
    </div>
  );
};

export default GameSpinner;
