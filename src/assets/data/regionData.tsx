import {
  sapConfig,
  nectarConfig,
  pollenConfig,
} from "Components/ResourcePin/ResourcePinConfigs";

export const regionData = {
  "emberglow-caldera": {
    title: "Emberglow Caldera",
    videoSrc: "/Animations/emberglow-caldera.mp4",
    resourcePins: [
      // Example configuration for resource pins
      { top: "50%", left: "50%", config: sapConfig },
      // Add more pins as needed
    ],
    mapTriangles: [
      // Example configuration for map triangles
      {
        top: "30%",
        left: "40%",
        label: "Ash Hive",
        destination: "/play/zones/emberglow-caldera/ash-hive",
      },
      // Add more triangles as needed
    ],
  },
  // Add other regions similarly
};
