# [Musee](https://monocle.github.io/musee/#/)

(_Work in progress_...)

![Landing Page](/images/Musee-landing.png)

Inspired by a journey into the world of fine art, [Musee](https://monocle.github.io/musee/) is a front-end portfolio web app designed for art novices. Leveraging the [Art Institute of Chicago](https://www.artic.edu/) API, Musee provides a streamlined platform for users to explore a portion of the art pieces from the vast AIC collection.

The key features of Musee include:

* A gallery showcasing twenty public domain paintings with the ability to view 200 of the AIC's paintings.

![Gallery Page](/images/Musee-gallery.png)

* A detailed view for each painting, providing more information about the artwork including links to the AIC page for the painting.

![Painting Page](/images/Musee-painting.png)

* The ability to "favorite" paintings, allowing users to create their own personalized collections.

![Favorites Page](/images/Musee-favorites.png)

By simplifying the art browsing experience, Musee offers an accessible entry point for those new to art history, removing the potential overwhelm of more information-heavy platforms.

This project serves as a demonstration of React proficiency, and the ability to learn and implement new libraries and APIs effectively. By focusing on core frontend development skills, working with APIs, and creating a user-friendly UI, I hope to showcase my solid fundamentals as a developer.

## Technical Highlights

Developing Musee entailed overcoming several technical challenges:

1. Routing and Testing: TanStack Router, being in its beta phase with incomplete documentation, required additional investigation to set up testing effectively.

1. Data Source Transition: The project started with the Harvard Art Museums API, then transitioned to the Art Institute of Chicago API due to data storage constraints. This necessitated understanding and adapting to two distinct API interfaces.

1. REST API Development: Leveraged Mock Service Worker to establish Musee's own REST API, essential for interfacing with a potential backend API server.

1. State Persistence: State persistence was implemented via local storage and URLs, enhancing the user browsing experience.
    
1. DevOps: Setting up continuous integration and deployment using GitHub workflows and resolving routing issues with GitHub pages formed a significant part of the project's DevOps challenges.
    
1. UI/UX: Proficiency with Tailwind CSS was deepened through several iterations of the user interface and user experience, ensuring an intuitive and engaging application.
    
1. Data Caching: TanStack Query's built-in caching features were effectively utilized, improving the application's performance.

1. Code Organization: The project offered an opportunity to delve into the nuances of code organization, enhancing the structure and readability of the codebase.

These hurdles have not only been surmounted but also served as valuable learning opportunities, contributing towards the development of Musee and the growth of technical expertise.

## Technical Details

This is a TypeScript React app that is built with Vite. Supporting libraries include:

* [Axios](https://axios-http.com/docs/intro)
* [TanStack Query](https://tanstack.com/query/latest)
* [TanStack Router](https://tanstack.com/router/v1)
* [Tailwind CSS](https://tailwindcss.com/)
* [daisyUI](https://daisyui.com/)
* [Fort Awesome Icons](https://fortawesome.com/)

### Mock Server

The frontend is built so that it could be interfaced with a backend API server which is mocked with [Mock Service Worker](https://mswjs.io/).

### Data

Python scripts are used to obtain data from the [Art Institute of Chicago's API](https://api.artic.edu/docs/). These are served as static Github pages files.

### Testing

Testing is performed using:

* [Vitest](https://vitest.dev/)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)


### DevOps

Separate Docker containers are used for the TypeScript frontend and the Python scripts. A Makefile is used to provide convenience Docker commands.

A CI/CD Github workflow is used to ensure code style checks (Prettier, ESLint) and passing tests prior to merge into the main project branch. When merged, another Github workflow is used to build the demo app and deploy it to Github pages.

## Contact

Email: monocle.github@gmail.com
