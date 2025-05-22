# RESEARCH.md

## What is state in React and how does it work under the hood?

State in React is like a box that holds information about a part of the screen. For example, it can hold the number of times a button was clicked. When the state changes, React updates the screen to show the new information. React does this by re-rendering the part of the page that changed. Behind the scenes, React keeps track of the old and new state, and only updates what needs to change. This helps make apps fast and smooth. We use something called `useState` to create state in a component.

## What is "lifting state up" and when should you use it?

"Lifting state up" means moving state to a parent component so that two or more child components can share it. Sometimes, two components need to see or change the same data. Instead of each having their own copy, we put the state higher up and pass it down. This way, both components stay in sync. We use this when one component's changes need to affect another. It's like giving both kids the same toy from the parent, so they both see the same thing. This keeps things simple and organized.
