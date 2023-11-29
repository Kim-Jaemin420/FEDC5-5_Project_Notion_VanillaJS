import { ComponentInstance } from "@/types";

interface CurrentComponent<TProps = unknown> {
  id: string;
  stateIndex: number;
  componentFunction: ((props: TProps) => ComponentInstance) | (() => ComponentInstance);
  props: TProps;
}

let currentComponent: CurrentComponent | null = null;

export const getCurrentComponent = () => {
  return currentComponent;
};

export const setCurrentComponent = (component: CurrentComponent | null) => {
  currentComponent = component;
};
