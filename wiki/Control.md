# Control

### Requirement

We want to move the character in the 2D top-down space.
We need a control system to deal with this problem.

### Input

First we need to consider how to get the input signal.
The DOM API provide us some kind of events, such as [Touch](1), [Mouse](2), [Keyboard](3) etc.
We use Keyboard for now.

### Keyboard Event

There are three types of keyboard events: `keydown`, `keypress`, `keyup`.

1. When the key is first pressed, the `keydown` event is sent.
2. If the key is not a modifier key, the `keypress` event is sent.
3. When the user releases the key, the `keyup` event is sent.

And when a key is pressed and held down, it begins to auto-repeat.

### Event Throttling

Because the event's fire rate is higher than frame rate.
We need some logic to sync the input event and frame update.

```ts

```






[1]: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
[2]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
[3]: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
