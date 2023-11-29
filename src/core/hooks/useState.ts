import { getCurrentComponent, render } from "@/core";

interface SetState<T> {
  (value: T | ((previousState: T) => T)): void;
}

const componentsState: Record<string, unknown[]> = {};

function useState<T>(initialValue: T): [T, SetState<T>] {
  const currentComponent = getCurrentComponent();

  if (!currentComponent) {
    throw new Error("useState는 컴포넌트 안에서만 호출될 수 있습니다.");
  }

  const { id, stateIndex, componentFunction, props } = currentComponent;

  if (!componentsState[id]) {
    componentsState[id] = [];
  }

  if (componentsState[id][stateIndex] === undefined) {
    componentsState[id][stateIndex] = initialValue;
  }

  const setState: SetState<T> = (newValue) => {
    const currentState = componentsState[id][stateIndex] as T;

    const updatedState =
      typeof newValue === "function" ? (newValue as (previousValue: T) => T)(currentState) : newValue;

    if (currentState !== updatedState) {
      componentsState[id][stateIndex] = updatedState;
      render(componentFunction, props);
    }
  };

  const stateValue = componentsState[id][stateIndex] as T;

  currentComponent.stateIndex += 1;

  return [stateValue, setState];
}

export default useState;
