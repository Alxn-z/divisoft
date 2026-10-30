'use client';
import {useRef,useState, type FormEvent} from 'react';
import {ArrowRight} from 'lucide-react';

export function ContactForm(){
  const [state,setState]=useState<'idle'|'sending'|'success'|'error'>('idle');
  const [message,setMessage]=useState('');
  const pending=useRef(false);
  const submissionId=useRef<string|null>(null);
  const apiUrl=(process.env.NEXT_PUBLIC_API_URL||'http://localhost:3001').replace(/\/$/,'');

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(pending.current)return;
    const form=event.currentTarget;
    const fields=new FormData(form);
    if(fields.get('website'))return;
    const name=String(fields.get('name')||'').trim();
    const email=String(fields.get('email')||'').trim().toLowerCase();
    const project=String(fields.get('project')||'').trim();
    if(name.length<2||project.length<10){setState('error');setMessage('Escribe tu nombre y al menos 10 caracteres sobre tu proyecto.');return}
    pending.current=true;setState('sending');setMessage('');
    submissionId.current??=crypto.randomUUID();
    try{
      const response=await fetch(apiUrl+'/api/v1/consultas',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({id:submissionId.current,nombre:name,correo:email,telefono:String(fields.get('phone')||'').trim()||undefined,empresa:String(fields.get('company')||'').trim()||undefined,proyecto:project,consentimiento:fields.get('consent')==='on'}),
        signal:AbortSignal.timeout(15000)
      });
      const payload=await response.json().catch(()=>null);
      if(!response.ok&&payload?.code!=='DUPLICATE')throw new Error('submission_failed');
      setState('success');setMessage('Tu consulta quedó registrada. Gracias por contarnos tu proyecto.');form.reset();
    }catch{setState('error');setMessage('No pudimos confirmar el registro. Revisa tu conexión e inténtalo de nuevo; tus datos siguen en el formulario.')}
    finally{pending.current=false}
  }
  if(state==='success')return <div role="status" className="contact-feedback"><p>{message}</p><button className="button outline" onClick={()=>{submissionId.current=null;setState('idle');setMessage('')}}>Enviar otra consulta</button></div>;
  return <form onSubmit={submit}>
    <label>Tu nombre<input name="name" autoComplete="name" minLength={2} maxLength={120} required autoFocus/></label>
    <label>Correo electrónico<input name="email" type="email" autoComplete="email" maxLength={254} required/></label>
    <label>Teléfono / WhatsApp (opcional)<input name="phone" type="tel" autoComplete="tel" maxLength={30}/></label>
    <label>Empresa (opcional)<input name="company" autoComplete="organization" maxLength={160}/></label>
    <label>¿Qué quieres crear?<textarea name="project" rows={4} minLength={10} maxLength={5000} required/></label>
    <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label className="contact-consent"><input name="consent" type="checkbox" required/><span>Autorizo a Divisoft a guardar estos datos y contactarme para atender esta consulta.</span></label>
    <p className="form-note">Usaremos tus datos para atender tu solicitud. No incluyas contraseñas ni información sensible.</p>
    {state==='error'&&<p role="alert" className="contact-error">{message}</p>}
    <button className="button" disabled={state==='sending'}>{state==='sending'?'Guardando consulta…':'Enviar consulta'}<ArrowRight size={18}/></button>
  </form>
}

