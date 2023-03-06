export function LoginForm() {
  return (
    <div
      aria-label="Login Panel"
      className="m-auto max-w-xl border border-slate-900 p-8"
    >
      <h1 className="text-2xl font-medium">Login</h1>
      <form className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="branch-id" className="text-sm">
            Branch id
          </label>
          <input
            id="branch-id"
            name="branch-id"
            className="rounded-md border border-slate-900 px-4 py-2"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            className="rounded-md border border-slate-900 px-4 py-2"
            type="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            id="password"
            name="password"
            className="rounded-md border border-slate-900 px-4 py-2"
            type="password"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 active:bg-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
}
