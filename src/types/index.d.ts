import { SVGProps } from "react";
import type { APIFunction } from "./api";
export type IconType = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>;
declare global {
  interface window {}
}

export { APIFunction };
