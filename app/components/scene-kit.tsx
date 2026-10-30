import type { ComponentType, ReactNode } from 'react';

type Icon = ComponentType<{ size?: number }>;
type Float = 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

export function BrandMark({ size = 'md' }: { size?: 'md' | 'sm' }) {
  return (
    <>
      <img className={`scene-logo scene-logo-${size} logo-dark`} src="/logo.jpg" alt="" />
      <img className={`scene-logo scene-logo-${size} logo-light`} src="/logo-light.jpg" alt="" />
    </>
  );
}

export function EnergyField({ id, paths }: { id: string; paths: { d: string; extra?: boolean }[] }) {
  return (
    <svg className="energy" viewBox="0 0 640 480" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2837ff" />
          <stop offset="100%" stopColor="#a261ff" />
        </linearGradient>
      </defs>
      {paths.map((path) => (
        <g key={path.d} className={path.extra ? 'extra' : undefined}>
          <path d={path.d} className="energy-glow" />
          <path d={path.d} className="energy-line" stroke={`url(#${id})`} />
        </g>
      ))}
    </svg>
  );
}

export function Particles({ points }: { points: { x: number; y: number }[] }) {
  return (
    <div className="particles">
      {points.map((point, index) => (
        <span key={`${point.x}-${point.y}`} className="particle" style={{ left: `${point.x}%`, top: `${point.y}%`, animationDelay: `${-index * 0.8}s` }} />
      ))}
    </div>
  );
}

export function GlassCard({ icon: Icon, label, float = 'a' }: { icon: Icon; label: string; float?: Float }) {
  return (
    <div className={`glass-card float-${float}`}>
      <span className="card-icon"><Icon size={15} /></span>
      <span>{label}</span>
    </div>
  );
}

export function Laptop({ children, float = 'd', tone = 'brand' }: { children: ReactNode; float?: Float; tone?: 'brand' | 'code' }) {
  return (
    <div className="laptop-anchor">
      <div className={`floater float-${float}`}>
        <div className="laptop-glow" />
        <div className="laptop">
          <div className="laptop-lid">
            <div className={`laptop-screen ${tone === 'code' ? 'screen-code' : ''}`}>{children}</div>
          </div>
          <div className="laptop-deck" />
        </div>
      </div>
    </div>
  );
}

export function ActivityDot() {
  return <span className="activity-dot" />;
}
