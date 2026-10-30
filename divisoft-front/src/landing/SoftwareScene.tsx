import { BrainCircuit, CodeXml, LayoutTemplate, ShieldCheck } from 'lucide-react';
import { ActivityDot, GlassCard, Particles } from './scene-kit';

const line = 'M4 58 L34 50 L64 54 L96 32 L126 40 L156 20 L186 26 L214 12';

export function SoftwareScene() {
  return (
    <div className="scene software-scene" aria-hidden="true">
      <Particles points={[{ x: 12, y: 18 }, { x: 78, y: 14 }, { x: 88, y: 70 }, { x: 20, y: 78 }]} />
      <div className="panel-slot back float-b">
        <article className="panel tilt-back">
          <header className="panel-bar"><span className="window-dots"><i /><i /><i /></span><ActivityDot /></header>
          <svg className="line-chart" viewBox="0 0 220 78" aria-hidden="true">
            <path className="area" d={`${line} L214 78 L4 78 Z`} />
            <path className="line" d={line} pathLength={100} />
            <path className="line-runner" d={line} pathLength={100} />
          </svg>
          <div className="chip-row">
            <div className="chip"><BrainCircuit size={14} /><span>Integración de IA</span></div>
            <div className="chip"><ShieldCheck size={14} /><span>Soporte seguro</span></div>
          </div>
        </article>
      </div>
      <div className="panel-slot front float-e">
        <article className="panel tilt-front">
          <header className="panel-bar"><span className="window-dots"><i /><i /><i /></span><ActivityDot /></header>
          <div className="editor-body code-panel">
            {[['a', 'd'], ['b', 'c'], ['a', 'b', 'd'], ['c', 'a'], ['d', 'b']].map((row, index) => (
              <div className="code-row" key={index}>
                <i />
                {row.map((token, tokenIndex) => <span key={tokenIndex} className={`tok tok-${token}`} />)}
              </div>
            ))}
          </div>
          <div className="bars">
            <span /><span /><span /><span /><span /><span />
          </div>
          <div className="chip"><CodeXml size={14} /><span>Código escalable</span></div>
        </article>
      </div>
      <div className="slot slot-design"><GlassCard icon={LayoutTemplate} label="Diseño moderno" float="a" /></div>
    </div>
  );
}
