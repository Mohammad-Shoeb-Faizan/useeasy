# 🚀 useEasy
### Simple, lightweight React hooks for async functions and API requests.

`useEasy` is a tiny React utility library that makes async logic effortless.  
No boilerplate. No complicated setups. Just clean and easy code.

---

## ✨ Features
- 🔹 Handle async state (loading, error, data) in one line  
- 🔹 Simplified API fetching  
- 🔹 Auto-refresh APIs on intervals  
- 🔹 Retry logic on failure  
- 🔹 Works with *any* async function  
- 🔹 Zero configuration  
- 🔹 Beginner-friendly  
- 🔹 No dependencies except React  

---

## 📦 Installation
(After publishing to npm)

```bash
npm install @shoebcodes/useeasy
```

---

# 🧠 Hooks Included

---

## 1️⃣ useEasyAsync(asyncFn, deps?)
Run **any async function** and automatically manage:
- loading  
- error  
- data  
- run()

### Example
```js
import { useEasyAsync } from "useeasy";

function Component() {
  const { data, loading, error, run } = useEasyAsync(() =>
    fetch("/api/users").then(res => res.json())
  );

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <button onClick={run}>Reload</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
```

---

## 2️⃣ useEasyFetch(url, options?)
A cleaner wrapper around fetch() with automatic state handling.

### Example
```js
import { useEasyFetch } from "useeasy";

function Users() {
  const { data, loading, error, refetch } = useEasyFetch("/api/users");

  return (
    <>
      <button onClick={refetch}>Refresh</button>
      {loading && "Loading..."}
      {error && error.message}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
```

### Options
```js
useEasyFetch("/api/login", {
  method: "POST",
  body: { email: "a@a.com", password: "1234" },
  headers: { Authorization: "Bearer token" }
});
```

---

## 3️⃣ useEasyAutoFetch(url, { refresh, deps, retry })
Automatically refetch APIs on intervals or when dependencies change.

### Example
```js
import { useEasyAutoFetch } from "useeasy";

function LiveStats() {
  const { data, loading } = useEasyAutoFetch("/api/stats", {
    refresh: 3000, // auto refetch every 3 seconds
    retry: 2,      // retry twice on failure
    deps: []       // optional dependency-based refetch
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

---

# ⚙ API Options

| Option     | Type     | Default | Description |
|------------|----------|---------|-------------|
| deps       | array    | []      | Re-run when dependencies change |
| refresh    | number   | null    | Auto-refetch interval (ms) |
| retry      | number   | 0       | Retry count on failure |
| method     | string   | "GET"   | HTTP method (fetch hooks) |
| body       | any      | null    | JSON request body |
| headers    | object   | {}      | Custom request headers |

---

# 🧩 Why useEasy?
React async code often looks like this:

```js
useState...
useEffect...
try/catch...
loading...
error...
json()...
```

With `useEasy`, it becomes:

```js
const { data, loading } = useEasyFetch("/api/users");
```

Clean. Minimal. Easy.

---

# 🛠 Contributing
PRs welcome after stable release.

---

# 📄 License
MIT License — free for personal and commercial use.
