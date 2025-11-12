'use client';
import { useEffect, useState } from 'react';
import type { Group, Post } from '@/lib/storage';
import { getGroups, getPosts } from '@/lib/storage';

export default function HomePage(){
  const [groups, setGroups] = useState<Group[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(()=>{
    setGroups(getGroups());
    setPosts(getPosts());
  },[]);

  return (
    <div>
      <div className="card">
        <h2>Welcome</h2>
        <p>Create a local bartering group, or join an existing one within a radius (km). This MVP stores data in your browser only.</p>
        <ul>
          <li><a className="link" href="/groups/create">Create a group</a></li>
          <li><a className="link" href="/groups/join">Join a group</a></li>
        </ul>
      </div>

      <div className="card">
        <h3>Existing groups</h3>
        {groups.length === 0 ? <p>No groups yet.</p> : (
          <ul>
            {groups.map(g => (
              <li key={g.id}>
                <a className="link" href={`/groups/${g.id}`}>{g.name}</a> — radius {g.radius_km} km
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>Recent posts</h3>
        {posts.length === 0 ? <p>No posts yet.</p> : (
          <ul>
            {posts.slice(0,5).map(p => (
              <li key={p.id}>
                <a className="link" href={`/groups/${p.group_id}`}>[{p.type}] {p.title}</a> — by {p.author}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
