import './globals.css';
import './components/scenes.css';
export const metadata={title:'Divisoft | Software que impulsa tu negocio',description:'Soluciones digitales a medida para tu empresa.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang='es'><body><script dangerouslySetInnerHTML={{__html:"try{if(localStorage.getItem('divisoft_tema')==='light')document.documentElement.dataset.theme='light'}catch(e){}"}}/>{children}</body></html>}
