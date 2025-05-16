# Knight Travails

As part of the [The Odin Project](https://www.theodinproject.com/lessons/javascript-knights-travails), this is my implementation of the Knight Travails challenge. The goal is to find the shortest path a knight can take on a standard 8×8 chessboard from a given starting square to a target square, using its unique L-shaped movement.

## Preview

![preview](/src/asset/preview1.png)

👉[Live Demo](https://solid-000.github.io/project-knightTravails/)

## What I learned from this project:

- I gained a solid understanding of **Graphs**, including how to define **Vertices** and **Edges**, and how to construct them effectively.
- My knowledge of the **Breadth-First Search (BFS)** algorithm improved significantly.
- I became more comfortable using data structures like `Map` and `Set`.
- I deepened my understanding of how queuing works in BFS. Initially, I tried using recursion to empty the queue, which caused a lot of issues. Switching to iteration made the logic for finding the shortest path much clearer and finally allowed me to complete it.
- I also learned how to use the **Drag and Drop API**.

## Biggest Hurdle

One of the most frustrating challenges I faced was implementing recursion and correctly storing the queue and path the knight takes. I spent several days stuck in infinite loops and tangled logic involving paths and queues. Eventually, I decided to shift my approach from recursion to iteration—and that changed everything. The solution became much clearer and easier to manage. The thing that helped me the most to overcome this project was [this video](https://www.youtube.com/watch?v=cWNEl4HE2OE) by Fireship.
