import type { ReactNode } from 'react'

function Marco({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 520 340" className="lamina-svg" aria-hidden="true">
      <rect className="lamina-panel" x="28" y="24" width="464" height="292" rx="28" />
      <rect className="lamina-shine" x="48" y="44" width="180" height="10" rx="5" />
      {children}
    </svg>
  )
}

const vistas: Record<string, string> = {
  'desarrollo-de-software|Comercio Electrónico': 'tienda',
  'desarrollo-de-software|Software Empresarial': 'paneles',
  'desarrollo-de-software|Aplicaciones Móviles': 'telefono',
  'desarrollo-de-software|Servicios Freelance de Programación': 'codigo',
  'ia-y-automatizacion|Inteligencia Artificial': 'nodos',
  'ia-y-automatizacion|Automatización Empresarial': 'flujo',
  'ia-y-automatizacion|Herramientas de Automatización': 'flujo',
  'ia-y-automatizacion|Servicios Freelance': 'codigo',
  'analisis-de-datos|Business Intelligence': 'tablero',
  'analisis-de-datos|Análisis de Datos': 'tablero',
  'analisis-de-datos|Herramientas': 'hoja',
  'analisis-de-datos|Servicios Freelance': 'hoja',
  'marketing-digital|Marketing Digital': 'piezas',
  'marketing-digital|Diseño Gráfico': 'formas',
  'marketing-digital|Producción Multimedia': 'video',
  'marketing-digital|Diseño Digital': 'paneles',
  'marketing-digital|Servicios Freelance': 'formas',
  'consultoria-tecnologica|Consultoría TI': 'escudo',
  'consultoria-tecnologica|Ciberseguridad': 'escudo',
  'consultoria-tecnologica|Auditoría y Gobierno': 'documento',
  'consultoria-tecnologica|Infraestructura y Soporte': 'paneles',
  'consultoria-tecnologica|Servicios Freelance': 'hoja',
  'asesoria-legal-digital|Derecho Digital': 'documento',
  'asesoria-legal-digital|Contratación Tecnológica': 'documento',
  'asesoria-legal-digital|Cumplimiento': 'escudo',
  'asesoria-legal-digital|Servicios Freelance': 'documento',
  'servicios-complementarios|Servicios de Oficina': 'papeles',
  'servicios-complementarios|Asistencia Digital': 'hoja',
  'servicios-complementarios|Servicios Creativos': 'formas',
}

function Escena({ vista }: { vista: string }) {
  if (vista === 'telefono') {
    return (
      <Marco>
        <rect className="lamina-muted" x="190" y="62" width="140" height="230" rx="24" />
        <rect className="lamina-soft" x="206" y="88" width="108" height="150" rx="10" />
        <circle className="lamina-block" cx="260" cy="262" r="8" />
      </Marco>
    )
  }
  if (vista === 'tienda') {
    return (
      <Marco>
        <rect className="lamina-muted" x="90" y="90" width="150" height="150" rx="18" />
        <rect className="lamina-block" x="112" y="112" width="106" height="70" rx="10" />
        <rect className="lamina-muted" x="270" y="90" width="150" height="150" rx="18" />
        <rect className="lamina-soft" x="292" y="112" width="106" height="70" rx="10" />
        <rect className="lamina-bar" x="120" y="250" width="270" height="28" rx="14" />
      </Marco>
    )
  }
  if (vista === 'hoja') {
    return (
      <Marco>
        <rect className="lamina-muted" x="78" y="78" width="360" height="190" rx="16" />
        <rect className="lamina-block" x="78" y="78" width="360" height="32" rx="16" />
        <rect className="lamina-line-fill" x="100" y="132" width="70" height="12" rx="4" />
        <rect className="lamina-line-fill" x="190" y="132" width="90" height="12" rx="4" />
        <rect className="lamina-line-fill" x="300" y="132" width="110" height="12" rx="4" />
        <rect className="lamina-soft" x="100" y="164" width="70" height="12" rx="4" />
        <rect className="lamina-soft" x="190" y="164" width="90" height="12" rx="4" />
        <rect className="lamina-soft" x="300" y="164" width="110" height="12" rx="4" />
        <rect className="lamina-line-fill" x="100" y="196" width="70" height="12" rx="4" />
        <rect className="lamina-line-fill" x="190" y="196" width="90" height="12" rx="4" />
        <rect className="lamina-line-fill" x="300" y="196" width="110" height="12" rx="4" />
      </Marco>
    )
  }
  if (vista === 'video') {
    return (
      <Marco>
        <rect className="lamina-muted" x="70" y="84" width="380" height="190" rx="20" />
        <circle className="lamina-soft" cx="260" cy="178" r="36" />
        <path className="lamina-paper" d="M248 160 L248 196 L280 178 Z" />
      </Marco>
    )
  }
  if (vista === 'formas') {
    return (
      <Marco>
        <circle className="lamina-block" cx="160" cy="160" r="54" />
        <rect className="lamina-soft" x="250" y="100" width="120" height="120" rx="18" />
        <path className="lamina-line" d="M150 250 L250 230 L230 280 Z" />
      </Marco>
    )
  }
  if (vista === 'codigo') {
    return (
      <Marco>
        <rect className="lamina-muted" x="80" y="80" width="360" height="190" rx="16" />
        <rect className="lamina-block" x="108" y="112" width="120" height="12" rx="6" />
        <rect className="lamina-soft" x="140" y="140" width="180" height="12" rx="6" />
        <rect className="lamina-line-fill" x="140" y="168" width="140" height="12" rx="6" />
        <rect className="lamina-block" x="108" y="196" width="90" height="12" rx="6" />
      </Marco>
    )
  }
  if (vista === 'flujo') {
    return (
      <Marco>
        <rect className="lamina-block" x="70" y="140" width="90" height="56" rx="14" />
        <rect className="lamina-soft" x="214" y="120" width="90" height="56" rx="14" />
        <rect className="lamina-block" x="214" y="200" width="90" height="56" rx="14" />
        <rect className="lamina-soft" x="358" y="140" width="90" height="56" rx="14" />
        <path className="lamina-line" d="M160 168 H214" />
        <path className="lamina-line" d="M304 148 H358" />
        <path className="lamina-line" d="M304 228 H340 V168 H358" />
      </Marco>
    )
  }
  if (vista === 'paneles') {
    return (
      <Marco>
        <rect className="lamina-muted" x="64" y="78" width="120" height="190" rx="16" />
        <rect className="lamina-block" x="84" y="100" width="80" height="14" rx="7" />
        <rect className="lamina-line-fill" x="84" y="130" width="80" height="10" rx="5" />
        <rect className="lamina-line-fill" x="84" y="152" width="80" height="10" rx="5" />
        <rect className="lamina-muted" x="204" y="78" width="250" height="88" rx="16" />
        <rect className="lamina-soft" x="224" y="100" width="140" height="14" rx="7" />
        <rect className="lamina-muted" x="204" y="180" width="250" height="88" rx="16" />
        <rect className="lamina-block" x="224" y="202" width="100" height="14" rx="7" />
      </Marco>
    )
  }
  if (vista === 'nodos') {
    return (
      <Marco>
        <circle className="lamina-soft" cx="260" cy="176" r="36" />
        <circle className="lamina-block" cx="120" cy="110" r="22" />
        <circle className="lamina-block" cx="400" cy="118" r="22" />
        <circle className="lamina-block" cx="150" cy="250" r="18" />
        <circle className="lamina-block" cx="378" cy="246" r="18" />
        <path className="lamina-line" d="M142 118 C 180 140, 210 156, 228 168" />
        <path className="lamina-line" d="M378 126 C 340 146, 310 158, 292 170" />
        <path className="lamina-line" d="M166 240 C 196 214, 214 198, 232 186" />
        <path className="lamina-line" d="M362 236 C 332 212, 310 196, 288 184" />
      </Marco>
    )
  }
  if (vista === 'tablero') {
    return (
      <Marco>
        <rect className="lamina-muted" x="70" y="86" width="250" height="180" rx="16" />
        <rect className="lamina-block" x="96" y="196" width="28" height="42" rx="6" />
        <rect className="lamina-soft" x="136" y="164" width="28" height="74" rx="6" />
        <rect className="lamina-block" x="176" y="132" width="28" height="106" rx="6" />
        <rect className="lamina-soft" x="216" y="150" width="28" height="88" rx="6" />
        <rect className="lamina-muted" x="340" y="86" width="120" height="78" rx="16" />
        <rect className="lamina-block" x="358" y="112" width="84" height="10" rx="5" />
        <rect className="lamina-soft" x="358" y="130" width="52" height="10" rx="5" />
        <rect className="lamina-muted" x="340" y="180" width="120" height="86" rx="16" />
        <path className="lamina-line" d="M358 236 L 386 214 L 414 224 L 442 198" />
      </Marco>
    )
  }
  if (vista === 'piezas') {
    return (
      <Marco>
        <rect className="lamina-muted" x="78" y="78" width="200" height="210" rx="24" />
        <rect className="lamina-soft" x="98" y="98" width="160" height="92" rx="14" />
        <rect className="lamina-block" x="98" y="206" width="120" height="10" rx="5" />
        <rect className="lamina-line-fill" x="98" y="226" width="86" height="8" rx="4" />
        <rect className="lamina-muted" x="310" y="96" width="150" height="92" rx="18" />
        <circle className="lamina-block" cx="346" cy="142" r="18" />
        <rect className="lamina-soft" x="376" y="128" width="64" height="8" rx="4" />
        <rect className="lamina-line-fill" x="376" y="146" width="48" height="8" rx="4" />
        <rect className="lamina-muted" x="310" y="206" width="150" height="72" rx="18" />
        <rect className="lamina-block" x="330" y="230" width="110" height="10" rx="5" />
      </Marco>
    )
  }
  if (vista === 'escudo') {
    return (
      <Marco>
        <path className="lamina-soft" d="M260 78 L 338 108 V 176 C 338 230, 304 268, 260 286 C 216 268, 182 230, 182 176 V 108 Z" />
        <path className="lamina-block" d="M260 108 L 308 128 V 174 C 308 210, 286 236, 260 248 C 234 236, 212 210, 212 174 V 128 Z" />
        <rect className="lamina-muted" x="78" y="150" width="70" height="110" rx="12" />
        <rect className="lamina-line-fill" x="94" y="168" width="38" height="8" rx="4" />
        <rect className="lamina-line-fill" x="94" y="186" width="38" height="8" rx="4" />
        <rect className="lamina-muted" x="372" y="150" width="70" height="110" rx="12" />
        <rect className="lamina-line-fill" x="388" y="168" width="38" height="8" rx="4" />
        <rect className="lamina-line-fill" x="388" y="186" width="38" height="8" rx="4" />
      </Marco>
    )
  }
  if (vista === 'documento') {
    return (
      <Marco>
        <rect className="lamina-muted" x="150" y="70" width="220" height="230" rx="16" />
        <rect className="lamina-line-fill" x="176" y="102" width="140" height="10" rx="5" />
        <rect className="lamina-line-fill" x="176" y="126" width="168" height="8" rx="4" />
        <rect className="lamina-line-fill" x="176" y="146" width="150" height="8" rx="4" />
        <rect className="lamina-line-fill" x="176" y="166" width="160" height="8" rx="4" />
        <circle className="lamina-soft" cx="286" cy="230" r="34" />
        <path className="lamina-check" d="M270 230 L 282 242 L 306 214" />
      </Marco>
    )
  }
  if (vista === 'papeles') {
    return (
      <Marco>
        <rect className="lamina-muted" x="150" y="118" width="210" height="150" rx="16" />
        <rect className="lamina-soft" x="176" y="86" width="210" height="150" rx="16" />
        <rect className="lamina-block" x="202" y="58" width="210" height="150" rx="16" />
        <rect className="lamina-paper" x="226" y="86" width="120" height="10" rx="5" />
        <rect className="lamina-paper" x="226" y="108" width="150" height="8" rx="4" />
        <rect className="lamina-paper" x="226" y="126" width="96" height="8" rx="4" />
      </Marco>
    )
  }
  return (
    <Marco>
      <rect className="lamina-muted" x="64" y="78" width="392" height="200" rx="18" />
      <rect className="lamina-bar" x="64" y="78" width="392" height="28" rx="18" />
      <circle className="lamina-dot" cx="86" cy="92" r="5" />
      <circle className="lamina-dot" cx="104" cy="92" r="5" />
      <circle className="lamina-dot" cx="122" cy="92" r="5" />
      <rect className="lamina-block" x="88" y="128" width="120" height="72" rx="12" />
      <rect className="lamina-soft" x="224" y="128" width="200" height="14" rx="7" />
      <rect className="lamina-line-fill" x="224" y="154" width="160" height="10" rx="5" />
      <rect className="lamina-line-fill" x="224" y="176" width="120" height="10" rx="5" />
      <rect className="lamina-soft" x="88" y="216" width="336" height="36" rx="10" />
    </Marco>
  )
}

export function LaminaServicio({ categoria, subcategoria, nombre }: { categoria: string; subcategoria: string; nombre: string }) {
  const vista = vistas[`${categoria}|${subcategoria}`] ?? 'navegador'
  return (
    <figure className="lamina">
      <Escena vista={vista} />
      <figcaption>{nombre}</figcaption>
    </figure>
  )
}
