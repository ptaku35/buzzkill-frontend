// types/HiveTraits.ts
import { HiveEnvironments } from "./HiveEnvironments";

export interface HiveTrait {
  id: number;
  name: string;
  environment: HiveEnvironments;
}
