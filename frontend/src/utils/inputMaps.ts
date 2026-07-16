import { buttonHeightMap } from "./buttonMaps";

export const inputSizeMap: Record<string, string> = {
  small: `px-base-sm text-sm ${buttonHeightMap["small"]}`,
  medium: `px-base text-md ${buttonHeightMap["medium"]}`,
  large: `px-base-lg text-lg ${buttonHeightMap["large"]}`,
};
