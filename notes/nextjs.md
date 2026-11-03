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

## what will happen, Deliberate Server/Client Component Error
  i expected to show that an error because TaskBoard uses React hooks such as useState and useEffect, but it does not have the "use client" directive. Next.js treats it as a Server Component by default.

# Actual Error 
  You're importing a module that depends on `useEffect` into a React Server Component module. This API is only available in Client Components. 
  TaskBoard uses React Hooks such as useState and useEffect. However, Next.js treats it as a Server Component by default. React Hooks that require client-side interaction are only available in Client Components.

## Fixing the Client Component Error
  I added the "use client" directive at the top of TaskBoard.tsx. After this change, the error disappeared and the Tasks page loaded successfully. TaskBoard uses React Hooks and manages interactive elements, so it needs to be a Client Component.

## Did the console.log from TasksPage appear in the browser console or in the terminal? What was typeof window?
  The console.log message appeared in the terminal, not in the browser console. The value of typeof window was undefined. This shows that TasksPage runs on the server because the window object is only available in the browser.

## Are the task titles in the raw HTML? Now compare with your Lab 4 Vite app: view its source too. Write down the difference and why it exists.
  I opened the page source using Ctrl + U and searched for the task titles. I found the task titles in the HTML source. In my previous Lab project with Vite, the tasks were loaded in the browser using JavaScript. In Next.js, the tasks are fetched on the server and included in the initial HTML. This makes the content available in the page source before client-side JavaScript runs.

## Table
| File | Server or Client? | Reason |
|---|---|---|
| app/layout.tsx | Server | It does not use React Hooks or browser features. |
| app/tasks/page.tsx | Server | It fetches tasks on the server using `fetchTasks()`. |
| TaskBoard.tsx | Client | It uses `useState` to manage tasks and filters, and has `"use client"` written at the top. |
| TaskList.tsx and TaskCard.tsx | Client | They are imported by `TaskBoard` (and `TaskCard` by `TaskList`), so they are part of the client component tree; `TaskCard` also handles checkbox interactions. |
| FilterBar.tsx and NewTaskForm.tsx | Client | They are imported by `TaskBoard`; `FilterBar` handles filter interactions, and `NewTaskForm` uses `useState` and handles form interactions. |

**Which files needed "use client" written in them?**
Only `TaskBoard.tsx`. It is the boundary: it uses `useState` and is imported by the server page.

**Which are client code only because a parent imports them?**
`TaskList.tsx`, `TaskCard.tsx`, `FilterBar.tsx` and `NewTaskForm.tsx`. They have no `"use client"` line, but everything imported by a Client Component becomes part of the client bundle.

## What appears while the server waits?
  While the server waits for data, Next.js shows loading.tsx right away. In Lab 4, the loading state was in the browser, so it appeared only after JavaScript loaded. Here, the server sends the loading UI first, and it changes automatically when the data is ready.

##  explain why an error file must be a Client Component.
  An error file must be a Client Component because it needs to work in the browser. The "Try again" button uses onClick to call reset(). This needs browser interaction, which Server Components cannot do.

## Your /tasks route may be listed as static even though it fetches data. If it is, explain in two sentences why that would be a problem if the tasks changed every minute. 
  In my build output, the `/tasks` route is listed as Partial Prerender, not fully static. If the route were fully static and tasks changed every minute, users might see outdated task data because the page would not automatically reflect those changes.

    Route (app)
    ┌ ○ /
    ├ ○ /_not-found
    ├ ◐ /tasks
    └   /tasks/[id]
    └ ◐ /tasks/[id]


    ○  (Static)             prerendered as static content
    ◐  (Partial Prerender)  prerendered as static HTML with dynamic server-streamed content

## Choosing the Rendering Strategy

1. **A public page for one shared task: Server Component**
   - Search engines can see the content.
   - It does not need much interaction.

2. **A drag-and-drop planning board: Client Component**
   - Users interact with it a lot.
   - Drag-and-drop needs JavaScript in the browser.

3. **An About page: Static Generation**
   - The content does not change often.
   - It can be created before and served as static HTML.

## what each attribute tells a search engine
  - `rel="sponsored"` identifies a sponsored or paid link.
  - `rel="ugc"` identifies a link included in user-generated content.

##  rebuild, and compare the route table with the one you saved. If your version rejects it, search the Next.js docs for “dynamic rendering
  **Before:** `/tasks` was Static (○). It was created at build time, so the data stayed the same until the next build.
  **After adding `force-dynamic`:** `/tasks` becomes Dynamic (ƒ). The server creates the page for every request, so the data is always fresh. But this requires more server work each time.

## Stretch 3.7
  `generateMetadata` runs on the server and can use the route params. First, I used a simple title (`Task ${id} | Task Board`). Then, I used `getTask` to get the real task title. If the ID is invalid or the task does not exist, it uses a default title.

## Challange 3.8
  For a public page, I would choose the server-rendered `/tasks`. Its task titles are already in the HTML, so search engines can read them without JavaScript. The `/tasks-csr` page first shows only "Loading tasks..." and needs JavaScript to load the content.
  In my Lighthouse tests, `/tasks` scored 76 in Performance and 100 in SEO. `/tasks-csr` scored 100 in both. The CSR page has a higher Performance score because it shows a simple loading screen first. Both pages got 100 in SEO because they have the required metadata.
  CSR is better for private pages with lots of user interaction that do not need to appear in search engines.