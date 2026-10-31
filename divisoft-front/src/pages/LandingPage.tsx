import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChartNoAxesColumnIncreasing, Check, CodeXml, FileText, ShieldCheck, X } from 'lucide-react'
import { HeroScene } from '../landing/HeroScene'
import { ProcessScene } from '../landing/ProcessScene'
import { SoftwareScene } from '../landing/SoftwareScene'
import { BarraPublica } from '../landing/BarraPublica'
import { ConsultaForm } from '../features/contacto/ConsultaForm'
import { categorias } from '../catalogo/datos'
import { iconosCategoria } from '../catalogo/iconos'
import '../landing/divisoft.css'
import '../landing/scenes.css'
import '../landing/catalogo.css'

const descripciones: Record<string, string> = {
  'desarrollo-de-software': 'Aplicaciones web, apps y plataformas digitales a medida.',
  'ia-y-automatizacion': 'Integramos inteligencia artificial para optimizar tus procesos.',
  'analisis-de-datos': 'Convierte tus datos en decisiones que generen resultados.',
  'marketing-digital': 'Estrategia y contenido tecnológico para hacer crecer tu marca.',
  'consultoria-tecnologica': 'Te ayudamos a definir e implementar la mejor estrategia tecnológica.',
  'asesoria-legal-digital': 'Acompañamiento legal para tu negocio en el entorno digital.',
  'servicios-complementarios': 'Documentos, presentaciones y encargos cortos, sin abrir un proyecto completo.',
}
const situaciones = [
  { icon: CodeXml, title: 'Necesito una página o un sistema', desc: 'Una landing, una tienda o una plataforma para operar el negocio.', to: '/servicios/desarrollo-de-software' },
  { icon: ChartNoAxesColumnIncreasing, title: 'Necesito ordenar datos o un trámite', desc: 'Un tablero, una hoja que se actualice sola o un flujo entre las herramientas que ya usas.', to: '/servicios/analisis-de-datos' },
  { icon: FileText, title: 'Necesito una pieza o un contrato', desc: 'Diseño, presentaciones o los documentos para publicar y contratar tecnología.', to: '/servicios/marketing-digital' },
]
const metodologia = [
  { titulo: 'El caso', texto: 'Cuentas qué necesitas, para quién y para cuándo. Respondemos con preguntas concretas.' },
  { titulo: 'El alcance', texto: 'Antes de empezar queda escrito qué entra, qué no entra, los entregables y la fecha. El presupuesto se confirma ahí.' },
  { titulo: 'El avance', texto: 'Ves el trabajo mientras avanza. Un encargo corto tiene una entrega y ajustes. Un proyecto avanza por fases.' },
  { titulo: 'La entrega', texto: 'Recibes lo acordado y una nota de cómo usarlo. El encargo cierra con esos entregables.' },
  { titulo: 'Después', texto: 'Soporte, mantenimiento o una fase siguiente solo si se contratan. No quedan abiertos de palabra.' },
]

export function LandingPage() {
  const [contact, setContact] = useState(false)
  const close = () => setContact(false)

  useEffect(() => {
    document.documentElement.classList.add('divisoft')
    return () => document.documentElement.classList.remove('divisoft')
  }, [])

  useEffect(() => {
    if (!contact) return
    const prior = document.activeElement as HTMLElement | null
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContact(false)
      if (e.key === 'Tab') {
        const elements = Array.from(document.querySelectorAll<HTMLElement>('.modal button:not([disabled]),.modal input:not([tabindex="-1"]),.modal textarea'))
        const first = elements[0]
        const last = elements[elements.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', handle)
    document.body.style.overflow = 'hidden'
    document.querySelector<HTMLElement>('.modal input,.modal .close')?.focus()
    return () => {
      document.removeEventListener('keydown', handle)
      document.body.style.overflow = ''
      prior?.focus()
    }
  }, [contact])

  return (
    <main>
      <BarraPublica onHablemos={() => setContact(true)} />
      <section id="inicio" className="hero section">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">DESARROLLO DE SOFTWARE</p>
            <h1>Creamos software<br />que <span>impulsa tu negocio</span></h1>
            <p className="intro">Tomamos un encargo corto, como una página, un tablero o un documento, y también un sistema completo. El mismo equipo cubre software, automatización, datos, marketing y asesoría legal digital.</p>
            <div className="actions">
              <a href="#servicios" className="button">Conoce nuestros servicios <ArrowRight size={18} /></a>
              <button className="button outline" onClick={() => setContact(true)}>Cuéntanos tu proyecto</button>
            </div>
            <div className="trust">
              <div><CodeXml /><span>Soluciones<br />a medida</span></div>
              <div><ChartNoAxesColumnIncreasing /><span>Tecnología para<br />hacer crecer tu negocio</span></div>
              <div><ShieldCheck /><span>Acompañamiento<br />en cada etapa</span></div>
            </div>
          </div>
          <div className="art hero-art" role="img" aria-label="Laptop Divisoft rodeada de soluciones digitales"><HeroScene /></div>
        </div>
      </section>
      <section id="servicios" className="section services">
        <div className="wrap">
          <p className="eyebrow">NUESTROS SERVICIOS</p>
          <div className="section-heading">
            <h2>Soluciones digitales <span>para tu empresa</span></h2>
            <Link to="/servicios">Ver todos los servicios <ArrowRight size={16} /></Link>
          </div>
          <div className="service-grid" id="cards">
            {categorias.map((categoria) => {
              const Icono = iconosCategoria[categoria.slug]
              return (
                <Link className="service" key={categoria.slug} to={`/servicios/${categoria.slug}`}>
                  <Icono className="service-icon" />
                  <h3>{categoria.nombre}</h3>
                  <p>{descripciones[categoria.slug]}</p>
                  <span className="explore">Explorar servicios <ArrowRight size={16} /></span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      <section id="proceso" className="section process">
        <div className="wrap process-grid">
          <div className="process-photo">
            <ProcessScene />
            <ol className="steps">
              {metodologia.map((paso) => (
                <li key={paso.titulo}><Check size={17} />{paso.titulo}</li>
              ))}
            </ol>
          </div>
          <div className="process-copy">
            <p className="eyebrow">NUESTRO PROCESO</p>
            <h2>Cómo trabajamos <span>un encargo</span></h2>
            <p>El orden es el mismo para una pieza corta y para un proyecto. Cambia la profundidad, no los pasos.</p>
            <ol className="metodologia" id="metodologia">
              {metodologia.map((paso, indice) => (
                <li key={paso.titulo}>
                  <strong>{indice + 1}. {paso.titulo}</strong>
                  <span>{paso.texto}</span>
                </li>
              ))}
            </ol>
            <a className="button outline" href="#metodologia">Conoce nuestro proceso <ArrowRight size={18} /></a>
          </div>
          <div className="art process-art" role="img" aria-label="Interfaces de software y soluciones a medida"><SoftwareScene /></div>
        </div>
      </section>
      <section id="soluciones" className="section values">
        <div className="wrap">
          <div className="value-heading">
            <div>
              <p className="eyebrow">NUESTRA PROPUESTA DE VALOR</p>
              <h2>¿Por qué Divisoft?</h2>
            </div>
            <p>Tres situaciones en las que suele empezar un cliente. Eliges la línea y ves los servicios de esa categoría.</p>
          </div>
          <div className="value-grid">
            {situaciones.map((v) => (
              <Link key={v.title} to={v.to}>
                <div className="value-icon"><v.icon /></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section id="contacto" className="section contact">
        <div className="wrap">
          <div className="contact-copy">
            <p className="eyebrow">HABLEMOS</p>
            <h2>¿Tienes un <span>proyecto</span><br />en mente?</h2>
            <p>Deja el caso en el formulario. Te respondemos al correo que escribas. El presupuesto se confirma cuando el alcance queda por escrito.</p>
          </div>
          <div className="contact-panel">
            <ConsultaForm />
          </div>
        </div>
      </section>
      {contact && (
        <div className="modal-backdrop" onClick={close}>
          <section role="dialog" aria-modal="true" aria-label="Cuéntanos tu proyecto" className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={close} aria-label="Cerrar"><X /></button>
            <p className="eyebrow">CONSTRUYAMOS JUNTOS</p>
            <h2>Cuéntanos tu proyecto</h2>
            <p>Cuéntanos tu idea y deja tus datos para que podamos atender tu proyecto.</p>
            <ConsultaForm />
          </section>
        </div>
      )}
    </main>
  )
}
