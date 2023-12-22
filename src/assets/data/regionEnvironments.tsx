import { HiveEnvironments } from "types/HiveEnvironments";
import { RegionEnvironmentMapping } from "../../types/RegionEnvironmentMapping";

const regionEnvironments: RegionEnvironmentMapping = {
  "Emberglow Caldera": HiveEnvironments.Fire,
  "Frostwing Glacier": HiveEnvironments.Ice,
  "Sunlit Sands": HiveEnvironments.Sands,
  "Verdant Canopy": HiveEnvironments.Forest,
  "Azure Marina": HiveEnvironments.Water,
};

export default regionEnvironments;
