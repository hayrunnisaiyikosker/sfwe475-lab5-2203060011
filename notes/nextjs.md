## which URL will a file at app/tasks/page.tsx answer, and what will you see if you visit /task (singular)?
  i think /task file. it will show us 404 error because there is no any route defined as a /task.

## Is it in the browser console or in the terminal where npm run dev is running? say where you found it, and what its type was for /tasks/1. Why do you think it appeared there?
  npm run dev was running on terminal not in the browser console.
  The type of `id` was `string`, and its value was "1".
  The page is a Server Component, so it runs on the server. Therefore, the console.log output showed in the terminal instead of the browser console.

## why that attribute matters for screen readers
  Yes. The navigation menu appears on both the Home page and the Tasks page because it is defined in the root layout.
  The lang attribute identifies the language of the page. Screen readers use this information to pronounce the content correctly and improve accessibility.

## What happened when I used a normal HTML anchor?
  When I used the `<a>` tag, the browser performed a full page navigation. A new document request appeared in the Network tab.

## What happened when I used Next.js Link?**
  When I used the Next.js `<Link>` component, navigation happened on the client side without a full page reload. No new document request appeared in the Network tab.

## What is the main difference?
  The HTML anchor performs a traditional page navigation, while Next.js Link supports client-side navigation and provides a smoother user experience.

## What status code did the page return? A friendly page that returns 200 would be a “soft 404”. Is yours a real 404?
  it returnd 404 not 200. and it is not soft 404. it sends the correct status code with my friendly page.

## say how many layouts wrap /tasks/1 and which one stays in place when you go from /tasks to /tasks/1.
  There are two layouts on `/tasks/1`: the root layout (`app/layout.tsx`) and the tasks layout (`app/tasks/layout.tsx`). When I go from `/tasks` to `/tasks/1`, both layouts stay the same. Only the page content changes because both pages are inside the `/tasks` folder.