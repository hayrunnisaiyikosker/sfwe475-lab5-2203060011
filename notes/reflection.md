# Lab 5 Reflection

### 4. Why is app/tasks/page.tsx a Server Component but TaskBoard a Client Component?

`app/tasks/page.tsx` is a Server Component because it gets the task data on the server with `fetchTasks()`. TaskBoard is a Client Component because it uses React Hooks like `useState` and handles user actions.

### 5. What did View Source show on /tasks compared with your Lab 4 Vite app, and why?

On the Next.js `/tasks` page, I could see the task titles in the HTML source. In my Lab 4 Vite app, the tasks were loaded later by JavaScript in the browser. This is because Next.js sends the page content from the server as HTML.

### 6. A teammate creates a page at app/Tasks/Project_Plan. Which two URL rules does it break, and what would you rename it to?

It breaks two rules: URLs should use lowercase letters and should not contain underscores. I would rename it to `app/tasks/project-plan/page.tsx`. This creates the URL `/tasks/project-plan`.

## Ethic AI link
https://claude.ai/share/83868d6a-0f89-4999-89ca-3080eee8cdc2