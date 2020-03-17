

###### (during the coronavirus, extended Springbreak week)
---
# Abstract
A case study for an interactive, entertainment website.
## Technologies Used
Graphical rendering by: Pixi.js  
Animation and DOM state management by: MobX + MobX React (Lite)  
Web, DOM rendering by: React + React DOM

---
# Introduction
In hindsight-- my original vision for this project, as is with any other project, was _way_ too ambitious. Fortunately, I caught it from the beginning and decided to keep the animations for this project bound to 2D space.

I was provided with a show-poster for a TV series which some people I knew were bringing to life. Along which, I was provided with a video of the show's pilot episode, and asked to make a website featuring the pilot.

Obviously I wanted to split the whole scene into many 3D fragments and render the whole design, in scene, with custom lighting and what-not-- but as I said, I caught my ambition from the beginning and decided to do the next best thing:

## Graphical Rendering: Pixi.js
I split the whole scene into many 2D fragments, and rendered the whole design, on canvas, with custom movement and interactions. I wanted to add bump-mappings and learn GLSL too, but the coronavirus is good for business so I gotta rush this along by the next couple of days. (sic)

I picked Pixi.js for its faster 2D manipulation and as I didn't need any other complicated abstractions. 

Has multiple renderers.
Has stages, filters, loaders, resource types.
No music btw.
Uses tickers and sprite objects (important).

## State Management: MobX + MobX React (Lite)
graphics need state. state needs to change. change can't happen on GPU.
need manager to change state, then rerender animation

## DOM Rendering: React + React DOM
UI/DOM have state too. Why DOM? We're on the web, that's why, DOM. DOM gotta react to state changes, and doing that by hand is hard. Also, easy event binding -- there is a pattern for flow here that can be re-used for state management triggers (aka no RxJS, because React ends-up doing that plus DOM rendering (JSX and components)).
