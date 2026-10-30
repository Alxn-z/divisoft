import { FileText, MessageSquare, ShieldCheck } from 'lucide-react';
import { BrandMark, GlassCard, Particles } from './scene-kit';

export function ContactScene() {
  return (
    <div className="scene contact-scene" aria-hidden="true">
      <Particles points={[{ x: 28, y: 22 }, { x: 58, y: 16 }, { x: 78, y: 34 }, { x: 40, y: 72 }, { x: 70, y: 78 }, { x: 18, y: 48 }]} />
      <div className="contact-cluster">
      <div className="phone-anchor">
        <div className="floater">
          <div className="phone-glow" />
          <div className="phone">
            <div className="phone-screen">
              <span className="phone-notch" />
              <div className="screen-copy">
                <div className="phone-chat">
                  <span className="phone-bubble">Hola, cuéntanos tu idea</span>
                  <span className="phone-bubble reply">Te respondemos hoy</span>
                </div>
                <BrandMark size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg className="contact-links" viewBox="0 0 120 220" aria-hidden="true">
        <path d="M2 36 C 40 36, 78 24, 118 22" />
        <path d="M2 110 C 46 110, 78 110, 118 110" />
        <path d="M2 184 C 40 184, 78 196, 118 198" className="extra" />
      </svg>
      <div className="info-stack">
        <GlassCard icon={MessageSquare} label="Una conversación sobre tu proyecto" float="a" />
        <GlassCard icon={FileText} label="Propuesta personalizada" float="c" />
        <GlassCard icon={ShieldCheck} label="Soluciones que impulsan tu negocio" float="e" />
      </div>
      </div>
    </div>
  );
}
