'use client';
import { useState } from 'react';
import { getGroups, saveGroups, type Group } from '@/lib/storage';

export default function CreateGroupPage(){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [radius, setRadius] = useState(5);
  const [lat, setLat] = useState<number | ''>('');
  const [lng, setLng] = useState<number | ''>('');

  function useMyLocation(){
    if(!navigator.geolocation) return alert('Geolocation not supported');
    navigator.geolocation.getCurrentPosition((pos)=>{
      setLat(Number(pos.coords.latitude.toFixed(6)));
      setLng(Number(pos.coords.longitude.toFixed(6)));
    }, (e)=> alert(e.message));
  }

  function create(){
    if(!name || lat === '' || lng === '') return alert('Please set name and location');
    const groups = getGroups();
    const id = crypto.randomUUID();
    const g: Group = {
      id,
      name,
      description,
      center_lat: Number(lat),
      center_lng: Number(lng),
      radius_km: radius,
      members: []
    };
    saveGroups([g, ...groups]);
    alert('Group created');
    window.location.href = `/groups/${id}`;
  }

  return (
    <div>
      <h2>Create group</h2>
      <label>Group name</label>
      <input value={name} onChange={e=>setName(e.target.value)} />

      <label>Description (optional)</label>
      <textarea value={description} onChange={e=>setDescription(e.target.value)} />

      <label>Radius (km): {radius}</label>
      <input type="range" min={1} max={25} step={1} value={radius} onChange={e=>setRadius(parseInt(e.target.value))} />

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

      <div style={{marginTop:8}}>
        <button onClick={create}>Create</button>
      </div>
    </div>
  );
}
