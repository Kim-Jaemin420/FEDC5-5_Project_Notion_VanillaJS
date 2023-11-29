import { createComponent, getCurrentComponent, setCurrentComponent } from "@/core";
import { ComponentInstance } from "@/types";

function render<T>(component: (props: T) => ComponentInstance, props: T): void;

function render(component: () => ComponentInstance): void;

function render<T>(component: (props?: T) => ComponentInstance, props?: T): void {
  const backupComponent = getCurrentComponent();

  const newComponent = { id: component.name, stateIndex: 0, componentFunction: component, props };

  setCurrentComponent(newComponent);

  const $currentElement = document.getElementById(newComponent.id || "");

  if (!$currentElement) {
    throw new Error(`컴포넌트 요소를 찾을 수 없습니다: ${newComponent.id}`);
  }

  const componentInstance = createComponent(component, props);

  $currentElement.innerHTML = `${componentInstance.element}`;

  setCurrentComponent(backupComponent);
}

export { render };
