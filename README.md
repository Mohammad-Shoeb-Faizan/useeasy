# 🚀 useEasy  
### Simple, lightweight React hooks for async functions and API requests.

![npm version](https://img.shields.io/npm/v/%40shoebcodes%2Fuseeasy?color=blue&label=npm%20version)
![downloads](https://img.shields.io/npm/dw/%40shoebcodes%2Fuseeasy?color=brightgreen&label=weekly%20downloads)
![license](https://img.shields.io/npm/l/%40shoebcodes%2Fuseeasy?color=yellow&label=license)

`useEasy` is a tiny React utility library that makes async logic effortless.  
No boilerplate. No complicated setups. Just clean and easy code.

---

# 🎥 Demo (GIF Examples)

### 🔄 useEasyFetch — API fetch with auto state handling  
![useEasyFetch Demo](https://raw.githubusercontent.com/Mohammad-Shoeb-Faizan/useeasy/main/demo/useEasyFetch.gif)

### ⚡ useEasyAsync — Run async logic with zero boilerplate  
![useEasyAsync Demo](https://raw.githubusercontent.com/Mohammad-Shoeb-Faizan/useeasy/main/demo/useEasyAsync.gif)

### 🔁 useEasyAutoFetch — Auto refresh API every X seconds  
![useEasyAutoFetch Demo](https://raw.githubusercontent.com/Mohammad-Shoeb-Faizan/useeasy/main/demo/useEasyAutoFetch.gif)

> 💡 Place these `.gif` files in a folder named `demo/` inside your GitHub repo.

---

## ✨ Features
- 🔹 Handle async state (`loading`, `error`, `data`) in one line  
- 🔹 Simplified API fetching  
- 🔹 Auto-refresh APIs on intervals  
- 🔹 Retry logic on failure  
- 🔹 Works with *any* async function  
- 🔹 Zero configuration  
- 🔹 Beginner-friendly  
- 🔹 No dependencies except React  

---

## 📦 Installation
```bash
npm install @shoebcodes/useeasy
```

---

# 🧠 Hooks Included

---

## 1️⃣ useEasyAsync(asyncFn, deps?)
Run **any async function** and automatically manage:
- `loading`  
- `error`  
- `data`  
- `run()`  

### Example
```jsx
import { useEasyAsync } from "@shoebcodes/useeasy";

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
A cleaner wrapper around `fetch()` with automatic state handling.

### Example
```jsx
import { useEasyFetch } from "@shoebcodes/useeasy";

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
```jsx
import { useEasyAutoFetch } from "@shoebcodes/useeasy";

function LiveStats() {
  const { data, loading } = useEasyAutoFetch("/api/stats", {
    refresh: 3000,
    retry: 2,
    deps: []
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
