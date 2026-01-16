// 🔄 Event Loop & Microtask Queue in JavaScript
// JavaScript is single-threaded, meaning it can execute one task at a time. But then…

// ❓ How does it handle asynchronous operations like setTimeout, fetch, and promises?
// 💡 Answer: The Event Loop!

// 1️⃣ JavaScript Execution Model
// When JavaScript runs, it has 3 main components:

// 1️⃣ Call Stack → Executes synchronous code (one function at a time).
// 2️⃣ Web APIs → Handles async operations (setTimeout, fetch, DOM events).
// 3️⃣ Callback Queue & Microtask Queue → Stores async tasks to be executed later.

// When you use setTimeout, fetch, or add event listeners, the browser handles them outside of JavaScript.


// 2️⃣ How Does the Event Loop Work?
// JavaScript runs synchronous code first (using the Call Stack).
// If it encounters an async operation, it hands it off to the Web APIs (like setTimeout).
// Once the async operation is done, its callback is moved to either:
// The Microtask Queue (for Promises, queueMicrotask()).
// The Callback Queue (for setTimeout, setInterval).
// Event Loop constantly checks the Call Stack:
// If it's empty, it pushes the first task from the Microtask Queue.
// If the Microtask Queue is empty, it takes the first task from the Callback Queue.



// console.log("Start");

// setTimeout(() => console.log("Timeout"), 0);

// Promise.resolve().then(() => console.log("Promise resolved"));

// console.log("End");



// Execution Order:
// 1️⃣ "Start" → Logs immediately (synchronous).
// 2️⃣ setTimeout() → Moves to Web API, scheduled to run after 0ms.
// 3️⃣ Promise.resolve().then() → Moves to the Microtask Queue.
// 4️⃣ "End" → Logs immediately (synchronous).
// 5️⃣ Microtask Queue executes first → "Promise resolved".
// 6️⃣ Callback Queue executes next → "Timeout".

// 🟢 Final Output:


// Start
// End
// Promise resolved
// Timeout



// ┌────────────────────────────────────────────┐
// │          CALL STACK                        │
// │      (Synchronous code)                    │
// └────────────────────────────────────────────┘
//                   ↓
// ┌────────────────────────────────────────────┐
// │        MICROTASK QUEUE                     │
// │  - process.nextTick (Node.js)              │
// │  - Promises (.then, .catch)                │
// │  - queueMicrotask()                        │
// │  - MutationObserver                        │
// └────────────────────────────────────────────┘
//                   ↓
// ┌────────────────────────────────────────────┐
// │        MACROTASK QUEUE                     │
// │  - setTimeout                              │
// │  - setInterval                             │
// │  - setImmediate (Node.js)                  │
// │  - I/O operations                          │
// └────────────────────────────────────────────┘

function fetchUserFromAPI() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User data from API");
        }, 1000);
    });
}
// const user = await fetchUserFromAPI();



async function test() {
    console.log('1. Sync');

    setTimeout(() => {
        console.log('2. setTimeout');
    }, 0);

    console.log('3. API Result:', user);

    process.nextTick(() => {
        console.log('4. nextTick');
    });

    Promise.resolve().then(() => console.log("Promise resolved"));

    console.log('5. Sync');
}

test();


// Output (in Node.js):
// ```
// 1. Sync
// 5. Sync
// 4. nextTick     ← process.nextTick runs FIRST
// 3. Promise      ← Then Promises
// 2. setTimeout   ← Then setTimeout
