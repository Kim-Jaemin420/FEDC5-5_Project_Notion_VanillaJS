import { getCurrentComponent, setCurrentComponent } from "./currentComponent";
import { ComponentInstance } from "@/types";

function createComponent<T>(component: (props: T) => ComponentInstance, props: T): ComponentInstance;

function createComponent(component: () => ComponentInstance): ComponentInstance;

function createComponent<T>(component: (props?: T) => ComponentInstance, props?: T) {
  const previousComponent = getCurrentComponent();

  const nextComponent = { id: component.name, stateIndex: 0, componentFunction: component, props };

  setCurrentComponent(nextComponent);

  const componentInstance = component(props);

  setCurrentComponent(previousComponent);

  return componentInstance;
}

export { createComponent };
