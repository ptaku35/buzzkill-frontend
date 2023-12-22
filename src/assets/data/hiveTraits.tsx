import { HiveTrait } from "../../types/HiveTraits";
import { HiveEnvironments } from "types/HiveEnvironments";

const hives: HiveTrait[] = [
  { id: 1, name: "Ash Hive", environment: HiveEnvironments.Fire },
  { id: 2, name: "Phoenix Hive", environment: HiveEnvironments.Fire },
  { id: 3, name: "Blizzard Hive", environment: HiveEnvironments.Ice },
  { id: 4, name: "Snowdrift Hive", environment: HiveEnvironments.Ice },
  { id: 5, name: "Sunscorch Hive", environment: HiveEnvironments.Sands },
  { id: 6, name: "Dunespire Hive", environment: HiveEnvironments.Sands },
  { id: 7, name: "Mossclad Hive", environment: HiveEnvironments.Forest },
  { id: 8, name: "Emerald Hive", environment: HiveEnvironments.Forest },
  { id: 9, name: "Watercrest Hive", environment: HiveEnvironments.Water },
  { id: 10, name: "Coral Hive", environment: HiveEnvironments.Water },
];

export default hives;
