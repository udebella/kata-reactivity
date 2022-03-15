import {
  createEffect,
  createReactiveVariable,
} from "./reactivity/reactivity.js";

const a = createReactiveVariable({ value: 1, otherValue: 4 });
const b = createReactiveVariable({ value: 1 });
const result = createReactiveVariable({ value: 0 });
const otherResult = createReactiveVariable({ value: 0 });

createEffect(() => result.value = a.value + b.value);
createEffect(() => otherResult.value = result.value + 5);
createEffect(() => console.log("a.value", a.value));
createEffect(() => console.log("b.value", b.value));
createEffect(() => console.log("result.value", result.value));
createEffect(() => console.log("otherResult.value", otherResult.value));
createEffect(() => console.log("a.otherValue", a.otherValue));

a.value = 4;
b.value = 3;
a.otherValue = 1;
