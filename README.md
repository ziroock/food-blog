# food-blog

## NOTES

- Next.js caches the pages aggressvelty, to make page to page navigation faster and smoother. It even caches more aggressively in production.

- Next.js requires that error pages are rendered as client components. This is because next.js wants to ensure that the error is handled not only on the server, but also on the client.

- To create a **server action** function we need to set 'use server' inside of the function. This will tell next.js to run the function on the server. The function also needs to be async. This does not work in client components that have 'use client' set.

- We can use a **server action** function inside of a client compoent if we abstarct the server action in a separate file responsible for server actions aka using 'use server' and 'async' functions. So blending server actions and client side componensts is possible.
