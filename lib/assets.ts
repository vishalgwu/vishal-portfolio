// Static-export assets live under the GitHub Pages base path in production.
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path: string) => `${base}/${path.replace(/^\//, "")}`;
