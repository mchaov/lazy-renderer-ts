
/**
 * IntersectionObserverInit
 * Setup some reasonable defaults to make initialization straight forward
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#constructor
 */
const defaultsOptions: IntersectionObserverInit = {
    // root: null,      // null === document's viewport
    rootMargin: "0px",  // assume the box doesn't need margins
    threshold: .01      // assume the box should show as soon as the first pixels should become visible
};

/**
 * VisibilityChangeCb
 * Export a type that will make it easier for implementers to work with callbacks
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry
 */
export type VisibilityChangeCb = (e: IntersectionObserverEntry) => void

/**
 * Renderer
 * This class should be instantiated for every viewport that we would like to control.
 */
export class Renderer {

    private observer: IntersectionObserver                              // observer instance
    private animationFrameID: number = -1                               // animation frame id for cleaning
    private callBacks: Map<Element, VisibilityChangeCb> = new Map()     // store all callbacks

    /**
     * Constructor
     * @param {IntersectionObserverInit} props default options for the IntersectionObserver constructor 
     */
    constructor(props: IntersectionObserverInit = {}) {

        this.observer = new IntersectionObserver(
            this.scheduleUpdate,
            {
                ...defaultsOptions, ...props                            // merge defaults with user provided options
            }
        );

    }

    /**
     * registerDom
     * Start observing the specified element and store its callback for later use
     * @param {HTMLElement} element reference to HTML element
     * @param {VisibilityChangeCb} callback function that takes IntersectionObserverEntry as parameter
     * @void
     */
    registerDom(element: Element, callback: VisibilityChangeCb) {
        this.callBacks.set(element, callback)
        this.observer.observe(element)
    }

    /**
     * unRegisterDom
     * Remove element from observe list and delete theh reference to its callback
     * @param {HTMLElement} element reference to HTML element
     * @void
     */
    unRegisterDom(element: Element) {
        this.callBacks.delete(element)
        this.observer.unobserve(element)
    }

    /**
     * Schedule render at the next convenient moment
     * @param {IntersectionObserverEntry[]} entries automatically passed by the IntersectionObserver upon invocation
     * @void
     */
    private scheduleUpdate = (entries: IntersectionObserverEntry[]) => {

        window.cancelAnimationFrame(this.animationFrameID)              // drop the previous frame if it was not rendered

        this.animationFrameID = window.requestAnimationFrame(() => {    // setup next animation frame
            this.updateVisibility(entries)                              // execute the callbacks of each registered element
        })

    }

    /**
     * updateVisibility
     * The callback function invoked when the browser schedules an animation frame
     * @param {IntersectionObserverEntry[]} entries all observable entries that were registered
     * @void
     */
    private updateVisibility = (entries: IntersectionObserverEntry[]): void => {
        entries.forEach(e => {
            const callback = this.callBacks.get(e.target)
            if (typeof callback === "function") {
                callback(e)
            }
        })
    }
}