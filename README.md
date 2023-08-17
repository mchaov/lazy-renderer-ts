# Lazy Rendering Web UIs with IntersectionObserver API

The repository contains a simple lazy renderer example written in TypeScript.

**More details -> [in this article](https://medium.com/draftkings-engineering/lazy-rendering-web-uis-with-intersectionobserver-api-bc69a4b61325)**

The article linked above dives deep into the innovative design pattern of lazy rendering in web development. By strategically delaying the initialization or rendering of web elements until they're actively needed, this technique optimizes both performance and efficiency.

- **Traditional vs. Lazy Rendering**: While traditional web pages tend to load all elements at once, potentially leading to laggy load times and superfluous data usage, lazy rendering ensures only essential elements load initially. The rest are loaded on-demand, often in response to user actions like scrolling.

- **Introduction to IntersectionObserver API**: A pivotal tool in this journey, the IntersectionObserver API, is adept at observing changes in the intersection of a target element with a viewport. The article offers a hands-on example of its implementation.

- **Best Practices & Considerations**: The journey of implementing lazy rendering isn't without its challenges. The article rounds off with invaluable best practices, potential challenges, and key considerations, emphasizing the delicate balance between performance enhancement and added complexity.

Quick example could be found in this [in this codepen](https://codepen.io/Mchaov/pen/PoxKbPQ).

Sneak peek:

```typescript
import { Renderer } from "./renderer"
 
/**
 * intersectionHandler
 * Function is called each time the viewport detetcts a change
 * @param {IntersectionObserverEntry} entry
 * @void
 */
function intersectionHandler(entry: IntersectionObserverEntry) {    // takes an entry and processes it
    if (entry.isIntersecting) {                                     // do something if content is visible
        entry.target.classList.add("isVisible")
    } else {                                                        // do something if content is not visible
        entry.target.classList.remove("isVisible")
    }
}
 
const observer = new Renderer()                                     // bootstrap an observer
 
const boxes = document.querySelectorAll(".box")                     // get all of the boxes we wish to observe
 
boxes.forEach(x => observer.registerDom(x, intersectionHandler))    // register all of the boxes with the observer
```
