'use client';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getGroups, saveGroups, getPosts, savePosts, type Group, type Post } from '@/lib/storage';

export default function GroupPage(){
  const pathname = usePathname();
  const id = useMemo(()=> pathname.split('/').pop() || '', [pathname]);
  const [group, setGroup] = useState<Group | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [author, setAuthor] = useState('');
  const [type, setType] = useState<'offer'|'request'>('offer');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(()=>{
    const gs = getGroups();
    setGroup(gs.find(g => g.id === id) || null);
    setPosts(getPosts().filter(p => p.group_id === id));
  }, [id]);

  function addPost(){
    if(!author || !title) return alert('Enter your name and a title');
    const newPost: Post = {
      id: crypto.randomUUID(),
      group_id: id,
      type,
      title,
      description,
      created_at: new Date().toISOString(),
      author
    };
    const all = getPosts();
    savePosts([newPost, ...all]);
    setPosts([newPost, ...posts]);
    setTitle(''); setDescription('');
  }

  function removeMember(name: string){
    const gs = getGroups();
    const idx = gs.findIndex(g => g.id === id);
    if(idx === -1) return;
    gs[idx].members = gs[idx].members.filter(m => m !== name);
    saveGroups(gs);
    setGroup(gs[idx]);
  }

  if(!group) return <div className="card">Group not found.</div>;

  return (
    <div>
      <div className="card">
        <h2>{group.name}</h2>
        {group.description && <p>{group.description}</p>}
        <p><small className="muted">Center: {group.center_lat}, {group.center_lng} — Radius {group.radius_km} km</small></p>
        <h3>Members ({group.members.length})</h3>
        {group.members.length === 0 ? <p>No members yet.</p> : (
          <ul>
            {group.members.map(m => (
              <li key={m} className="row" style={{justifyContent:'space-between'}}>
                <span>{m}</span>
                <button onClick={()=>removeMember(m)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>Add offer/request</h3>
        <div className="row">
          <label>Author</label>
          <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Your name" />
          <label>Type</label>
          <select value={type} onChange={e=>setType(e.target.value as 'offer'|'request')}>
            <option value="offer">Offer</option>
            <option value="request">Request</option>
          </select>
        </div>
        <label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. 1kg tomatoes" />
        <label>Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Optional details" />
        <button onClick={addPost} style={{marginTop:8}}>Add</button>
      </div>

      <div className="card">
        <h3>Posts</h3>
        {posts.length === 0 ? <p>No posts yet.</p> : (
          <ul>
            {posts.map(p => (
              <li key={p.id}>
                <strong>[{p.type}] {p.title}</strong> — by {p.author}
                {p.description ? <div>{p.description}</div> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
