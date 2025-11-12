import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Common Grounds',
  description: 'Local bartering circles (frontend MVP)'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="row" style={{justifyContent:'space-between'}}>
            <h1>Common Grounds</h1>
            <nav className="row" style={{gap:12}}>
              <a href="/" className="link">Home</a>
              <a href="/groups/create" className="link">Create Group</a>
              <a href="/groups/join" className="link">Join Group</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer style={{marginTop:24}}><small className="muted">Frontend-only MVP. Data stored in your browser.</small></footer>
        </div>
      </body>
    </html>
  );
}
