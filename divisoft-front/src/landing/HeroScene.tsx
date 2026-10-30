import { BrainCircuit, ChartNoAxesColumnIncreasing, Cloud, CodeXml, Megaphone, Scale } from 'lucide-react';
import { BrandMark, EnergyField, GlassCard, Laptop, Particles } from './scene-kit';

const paths = [
  { d: 'M150 70 C 220 110, 260 160, 310 230' },
  { d: 'M500 55 C 450 120, 400 170, 350 230' },
  { d: 'M90 190 C 170 210, 230 240, 300 270' },
  { d: 'M560 175 C 480 210, 420 245, 360 275', extra: true },
  { d: 'M140 360 C 210 330, 260 310, 310 300', extra: true },
  { d: 'M520 350 C 450 330, 400 315, 350 305' },
];

const points = [
  { x: 22, y: 16 }, { x: 74, y: 10 }, { x: 48, y: 18 }, { x: 86, y: 38 },
  { x: 18, y: 46 }, { x: 63, y: 28 }, { x: 34, y: 72 }, { x: 80, y: 64 },
];

export function HeroScene() {
  return (
    <div className="scene hero-scene" aria-hidden="true">
      <EnergyField id="hero-energy" paths={paths} />
      <Particles points={points} />
      <div className="slot slot-software"><GlassCard icon={CodeXml} label="Desarrollo de Software" float="a" /></div>
      <div className="slot slot-marketing"><GlassCard icon={Megaphone} label="Marketing Digital" float="b" /></div>
      <div className="slot slot-ai"><GlassCard icon={BrainCircuit} label="IA y Automatización" float="c" /></div>
      <div className="slot slot-consult"><GlassCard icon={Cloud} label="Consultoría Tecnológica" float="d" /></div>
      <div className="slot slot-data"><GlassCard icon={ChartNoAxesColumnIncreasing} label="Análisis de Datos" float="e" /></div>
      <div className="slot slot-legal"><GlassCard icon={Scale} label="Asesoría Legal Digital" float="f" /></div>
      <Laptop>
        <div className="screen-copy">
          <BrandMark />
        </div>
      </Laptop>
    </div>
  );
}
