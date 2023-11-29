import { ComponentInstance } from "@/types";

interface CurrentComponent {
  id: string;
  stateIndex: number;
}

export let currentComponent: CurrentComponent | null = null;

function createComponent<T>(component: (props: T) => ComponentInstance, props: T): ComponentInstance;

function createComponent(component: () => ComponentInstance): ComponentInstance;

function createComponent<T>(component: (props?: T) => ComponentInstance, props?: T) {
  const previousComponent = currentComponent;

  currentComponent = { id: component.name, stateIndex: 0 };

  const componentInstance = component(props);

  currentComponent = previousComponent;

  return componentInstance;
}

export { createComponent };
