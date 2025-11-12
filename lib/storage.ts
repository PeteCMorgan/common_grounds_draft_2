export type Group = {
  id: string;
  name: string;
  description?: string;
  center_lat: number;
  center_lng: number;
  radius_km: number;
  members: string[];
};

export type Post = {
  id: string;
  group_id: string;
  type: 'offer' | 'request';
  title: string;
  description?: string;
  created_at: string;
  author: string;
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

function write<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getGroups(): Group[] {
  return read<Group[]>('cg_groups', []);
}
export function saveGroups(groups: Group[]) {
  write('cg_groups', groups);
}
export function getPosts(): Post[] {
  return read<Post[]>('cg_posts', []);
}
export function savePosts(posts: Post[]) {
  write('cg_posts', posts);
}
