import { Renderer } from "../shared/shared.js";

/**
 * Setup globals for the demo's purposes
 */
const isVisibleClassName = "isVisible"
const template = `<div class="box"></div>`
const content = `<div class="box-contents">Box to lazy render</div>`

/**
 * intersectionHandler
 * Function is called each time the viewport detetcts a change
 * @param {IntersectionObserverEntry} entry 
 * @void
 */
function intersectionHandler(entry: IntersectionObserverEntry) {
    if (entry.isIntersecting) {                             // if the placeholder became visible, show it and render the content
        entry.target.classList.add(isVisibleClassName)
        entry.target.innerHTML = content
    } else {                                                // else, hide it and drop its contents
        entry.target.classList.remove(isVisibleClassName)
        entry.target.innerHTML = ""
    }
}

/**
 * main
 * Function that bootstraps the demo
 * @param {number} childrenCount how many elements to render on the page 
 * @void
 */
export function main(childrenCount: number) {

    const viewport = document.getElementById("viewport")                // get our viewport element
    if (viewport) {                                                     // check if it exists
        viewport.innerHTML = template.repeat(childrenCount)             // render placeholders
    }

    const observer = new Renderer()                                     // bootstrap a observer

    const boxes = document.querySelectorAll(".box")                     // get all of the rendered placeholders

    boxes.forEach(x => observer.registerDom(x, intersectionHandler))    // register all of the placeholders with the observer
}