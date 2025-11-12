'use client';
import { useState } from 'react';
import { getGroups, saveGroups } from '@/lib/storage';
import { kmBetween } from '@/lib/haversine';

export default function JoinGroupPage(){
  const [lat, setLat] = useState<number | ''>('');
  const [lng, setLng] = useState<number | ''>('');
  const [name, setName] = useState('');

  function useMyLocation(){
    if(!navigator.geolocation) return alert('Geolocation not supported');
    navigator.geolocation.getCurrentPosition((pos)=>{
      setLat(Number(pos.coords.latitude.toFixed(6)));
      setLng(Number(pos.coords.longitude.toFixed(6)));
    }, (e)=> alert(e.message));
  }

  function nearbyGroups(){
    const gs = getGroups();
    if(lat === '' || lng === '') return [];
    return gs.filter(g => kmBetween({lat: Number(lat), lng: Number(lng)}, {lat: g.center_lat, lng: g.center_lng}) <= g.radius_km);
  }

  function join(groupId: string){
    if(!name) return alert('Enter a display name');
    const gs = getGroups();
    const idx = gs.findIndex(g => g.id === groupId);
    if(idx === -1) return;
    if(!gs[idx].members.includes(name)) gs[idx].members.unshift(name);
    saveGroups(gs);
    alert(`Joined ${gs[idx].name}`);
    window.location.href = `/groups/${groupId}`;
  }

  const results = nearbyGroups();

  return (
    <div>
      <h2>Join a nearby group</h2>
      <label>Your display name</label>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g., Pete" />

      <div className="row">
        <div>
          <label>Latitude</label>
          <input value={lat} onChange={e=>setLat(e.target.value ? Number(e.target.value) : '')} placeholder="-33.86" />
        </div>
        <div>
          <label>Longitude</label>
          <input value={lng} onChange={e=>setLng(e.target.value ? Number(e.target.value) : '')} placeholder="151.21" />
        </div>
        <button onClick={useMyLocation}>Use my location</button>
      </div>

      <div className="card">
        <h3>Groups within radius</h3>
        {results.length === 0 ? <p>No groups within radius yet.</p> : (
          <ul>
            {results.map(g => (
              <li key={g.id} className="row" style={{justifyContent:'space-between'}}>
                <span><a className="link" href={`/groups/${g.id}`}>{g.name}</a> — radius {g.radius_km} km</span>
                <button onClick={()=>join(g.id)}>Join</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
