"use client";
import { DatosEmpresa, TrabajosRealizados } from "@/lib/configuracion";
import React, { useState, useEffect } from 'react';
import { Shield, Bell, Camera, Wifi, Satellite, Star, MessageSquare, ChevronRight, ChevronLeft, Settings, Quote, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MarcasCarrusel from "@/components/MarcasCarrusel";

export default function LandingPage() {
  // --- ESTADOS ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);// para whatsapp
  const [selectedService, setSelectedService] = useState("");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false); // para mail 
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isPausedServices, setIsPausedServices] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [formData, setFormData] = React.useState({ nombre: "", email: "", mensaje: "" });
  const [enviando, setEnviando] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "75f8745e-b941-4725-b123-c937d8e7fb96",
          name: formData.nombre,
          email: formData.email,
          message: formData.mensaje,
        }),
      });

      const result = await res.json();

      if (result.success) {
        alert("¡Mensaje enviado! Nos contactaremos pronto.");
        setFormData({ nombre: '', email: '', mensaje: '' });
      } else {
        alert("Error al enviar. Intentá de nuevo.");
      }
    } catch (err) {
      alert("Error de conexión.");
    } finally {
      setEnviando(false);
    }
  };


  // --- LISTA DE SERVICIOS ---
  const servicios = [
    { 
      title: "CCTV & Videovigilancia", 
      desc: "Instalamos sistemas de cámaras de seguridad de última tecnología. Configuración de monitoreo remoto para que puedas ver todo en tiempo real desde tu celular, tablet o PC. Soluciones para hogares, comercios y grandes predios.", 
      icon: <Camera />, 
      img: "/cctv.png" 
    },
    { 
      title: "Antenas DirecTV", 
      desc: "Especialistas en la instalación y orientación de antenas DirecTV. Realizamos el cableado estético y funcional para extender la señal a distintas habitaciones, garantizando la mejor calidad de imagen.", 
      icon: <Satellite />, 
      img: "/antena.png" 
    },
    { 
      title: "Redes & Enlaces Wi-Fi", 
      desc: "Llevamos internet a donde lo necesites. Realizamos enlaces inalámbricos punto a punto para conectar galpones o sectores alejados. Extendemos la cobertura Wi-Fi en predios grandes.", 
      icon: <Wifi />, 
      img: "/redes.png" 
    },
    { 
      title: "Sistemas de Alarma", 
      desc: "Protección integral con alarmas inteligentes. Instalamos sensores de apertura, detectores de movimiento y sirenas vinculadas a tu teléfono para recibir alertas instantáneas.", 
      icon: <Bell />, 
      img: "/alarma.png" 
    },
    { 
      title: "Antenas Starlink", 
      desc: "Instalamos antenas Starlink para conectividad de alta velocidad en zonas rurales o con cobertura limitada. Soluciones rápidas y eficientes para hogares y empresas.", 
      icon: <Satellite />, 
      img: "/starlink.jpg" 
    }
  ];

  // Lógica del carrusel: se mueve cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPausedServices) {
        setCurrentSlide((prev) => (prev === servicios.length - 1 ? 0 : prev + 1));
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [servicios.length, isPausedServices]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f7ff] via-[#f5f9ff] to-[#f8fafc] font-sans text-slate-900">
      {/* Navbar con estilo de tu captura */}
      <nav className="bg-[#0052cc] text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-[#0052cc] to-[#ff6b00] p-1 rounded-lg relative flex items-center justify-center">
              <Shield className="text-white" size={24} />
              <span className="absolute text-white font-bold text-sm" style={{ fontSize: '14px', fontWeight: 'bold' }}>D</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#ff6b00]">DigitalTech</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#quienes-somos" className="hover:opacity-80">Quiénes Somos</a>
            <a href="#servicios" className="hover:opacity-80">Servicios</a>
            <a href="#testimonios" className="hover:opacity-80">Testimonios</a>
            <a href="#contacto" className="hover:opacity-80">Contacto</a>
          </div>
          <Button 
            onClick={() => setIsQuoteModalOpen(true)}
            className="bg-[#ff6b00] hover:bg-[#e66000] rounded-full px-6 text-white border-none"
          >
            Pedir Presupuesto
          </Button>
        </div>
      </nav>

{/* SECCIÓN HERO CON IMAGEN DE FONDO */}
<section className="relative h-[85vh] flex items-center overflow-hidden">
  {/* Fondo: Aquí es donde llamamos a tu archivo hero-bg.jpg */}
  <div className="absolute inset-0 z-0">
<img 
  src="/trabajos/pertada2.jpeg"  // <-- Agregamos /trabajos/ adelante
  alt="Fondo DigitalTech" 
  className="w-full h-full object-cover"
/>
    {/* Filtro oscuro para que las letras se lean bien */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#00204a]/85 to-transparent"></div>
  </div>

  {/* Contenido: Texto y botones reales encima de la foto */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
    <div className="max-w-2xl">
      <h1 className="text-5xl md:text-7xl font-bold leading-tight">
        Protegemos lo que <span className="text-[#ff6b00]">más te importa</span>
      </h1>
      <p className="mt-6 text-xl text-slate-200 leading-relaxed">
        Soluciones profesionales en seguridad, vigilancia y conectividad para tu hogar o negocio en El Bolsón.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => setIsQuoteModalOpen(true)}
          className="bg-[#ff6b00] hover:bg-[#e66000] text-white px-8 py-7 rounded-full text-lg font-bold border-none"
        >
          Solicitar Presupuesto Gratis
        </Button>
        <Button 
          variant="outline"
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-7 rounded-full text-lg backdrop-blur-md"
          onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Ver Servicios
        </Button>
      </div>
    </div>
  </div>
</section>

      {/* --- SECCIÓN DE SERVICIOS CON FLECHAS --- */}
      <section 
        id="servicios" 
        className="py-16 max-w-7xl mx-auto px-4 relative group bg-gradient-to-r from-[#e8f3ff]/40 via-[#f0f7ff]/50 to-[#e3ebf8]/40 rounded-3xl my-8"
        onMouseEnter={() => setIsPausedServices(true)}
        onMouseLeave={() => setIsPausedServices(false)}
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-[#00204a]">Nuestros Servicios</h2>
        
        <div className="relative overflow-hidden">
          {/* Flecha Izquierda */}
          <button 
            onClick={() => setCurrentSlide(currentSlide === 0 ? servicios.length - 1 : currentSlide - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-[#0052cc] hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={30} />
          </button>

          {/* Contenedor de las Tarjetas */}
          <div 
            className="flex transition-transform duration-500 ease-out" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
      {servicios.map((s, idx) => (
        <div key={idx} className="min-w-full p-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row h-auto md:h-[450px]">
            {/* Imagen */}
            <div className="md:w-1/2 h-64 md:h-full relative">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 bg-[#0052cc] text-white p-3 rounded-2xl shadow-xl">
                {s.icon}
              </div>
            </div>

            {/* Contenido (Aquí escribís lo que quieras de cada imagen) */}
            <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <h3 className="text-3xl font-extrabold mb-4 text-[#00204a]">{s.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {s.desc}
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <CheckCircle size={18} className="text-green-500" /> Instalación en el día
                </li>
                <li className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <CheckCircle size={18} className="text-green-500" /> Soporte técnico 24/7
                </li>
              </ul>
              <Button 
                onClick={() => {
                  setSelectedService(s.title);
                  setIsModalOpen(true);
                }}
                className="bg-[#ff6b00] hover:bg-[#e66000] w-fit px-8 py-6 rounded-xl text-lg shadow-lg"
              >
                Me interesa este servicio
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>

          {/* Flecha Derecha */}
          <button 
            onClick={() => setCurrentSlide(currentSlide === servicios.length - 1 ? 0 : currentSlide + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-[#0052cc] hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      </section>



      {/* Formulario de Presupuesto */}
      <section id="contacto" className="py-20 max-w-4xl mx-auto px-4 bg-gradient-to-r from-[#fff5eb]/60 via-[#fffbf5]/50 to-[#fff8f0]/60 rounded-3xl my-8">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-[#0052cc] p-10 text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">¿Quieres ser nuestro próximo cliente?</h3>
            <p className="text-white/80 text-sm italic">Solicitá tu presupuesto ahora y recibí asesoramiento profesional.</p>
          </div>
          <form onSubmit={handleSubmit} className="p-10 space-y-4 flex-1">
  <div className="grid md:grid-cols-2 gap-4">
    <input 
      type="text" 
      placeholder="Tu Nombre" 
      required
      value={formData.nombre}
      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
      className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 ring-[#ff6b00]" 
    />
    <input 
      type="email" 
      placeholder="Correo Electrónico" 
      required
      value={formData.email}
      onChange={(e) => setFormData({...formData, email: e.target.value})}
      className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 ring-[#ff6b00]" 
    />
  </div>
  <Textarea 
    placeholder="Contanos tu proyecto..." 
    required
    value={formData.mensaje}
    onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
    className="rounded-xl bg-slate-50 min-h-[150px] outline-none focus:ring-2 ring-[#ff6b00]" 
  />
  <Button 
    type="submit"
    disabled={enviando}
    className="w-full h-14 bg-[#ff6b00] hover:bg-[#e66000] text-white text-lg font-bold rounded-xl shadow-lg transition-all"
  >
    {enviando ? "Enviando..." : "Solicita tu Presupuesto Ahora"}
  </Button>
</form>
        </div>
      </section>

      {/* SECCIÓN SOCIOS OFICIALES - SECURITY24 */}
      <section className="py-16 max-w-6xl mx-auto px-4 my-8">
        <div className="bg-gradient-to-r from-[#1a365d] to-[#2d5a8a] rounded-3xl p-10 md:p-14 shadow-2xl border border-blue-200/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Contenido Izquierdo */}
            <div className="text-white">
              <div className="inline-block bg-[#ff6b00] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                REPRESENTANTE OFICIAL
              </div>
              <h3 className="text-4xl font-bold mb-4">Security24</h3>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                Somos <span className="font-bold text-white">representante oficial de Security24</span>, la empresa líder en monitoreo de alarmas con cobertura las 24 horas del día. 
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#ff6b00]" />
                  <span>Monitoreo profesional 24/7</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#ff6b00]" />
                  <span>Respuesta inmediata ante emergencias</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#ff6b00]" />
                  <span>Integración con sistemas de seguridad inteligente</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#ff6b00]" />
                  <span>Cobertura en toda la región</span>
                </li>
              </ul>
              <Button 
                onClick={() => window.open("https://youtu.be/9zzOQbAOPGg", "_blank")}
                className="bg-[#ff6b00] hover:bg-[#e66000] text-white px-8 py-6 rounded-full text-lg font-bold border-none shadow-lg"
              >
                Conocer Servicios Security24
              </Button>
            </div>

            {/* Contenido Derecho */}
            <div className="bg-white rounded-3xl p-10 text-center shadow-xl">
              <div className="text-6xl font-bold text-[#1a365d] mb-4">S24</div>
              <p className="text-slate-600 text-sm mb-6">
                Con más de 15 años de experiencia en monitoreo de seguridad, Security24 es tu aliado confiable para proteger lo que más importa.
              </p>
              <div className="bg-gradient-to-r from-[#ff6b00]/10 to-[#0052cc]/10 rounded-2xl p-6">
                <p className="text-[#1a365d] font-bold mb-2">Cobertura Nacional</p>
                <p className="text-slate-600 text-sm">Servicio disponible en toda Argentina con centros de monitoreo certificados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: EQUIPAMIENTO PROFESIONAL (REEMPLAZA AL CARRUSEL) */}
<section className="py-16 bg-slate-50 border-b border-slate-200">
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
      
      {/* Banner Izquierdo */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
        <img src="/marcas/ajax.jpg" alt="Ajax" className="h-12 object-contain mb-2 grayscale hover:grayscale-0 transition-all" />
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter text-center">Sistemas de Intrusión</p>
      </div>

      {/* Bloque Central (Ocupa 2 columnas) */}
      <div className="md:col-span-2 bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-8 text-center shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2 uppercase">Equipamiento Certificado</h3>
          <p className="text-blue-100 text-sm italic">
            "Tecnología de punta para la seguridad de hogares y comercios en toda la Comarca Andina".
          </p>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -mr-10 -mt-10"></div>
      </div>

      {/* Banner Derecho */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
        <img src="/marcas/hikvision.jpg" alt="Hikvision" className="h-12 object-contain mb-2 grayscale hover:grayscale-0 transition-all" />
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter text-center">Cámaras Inteligentes</p>
      </div>

    </div>
  </div>
</section>
{/* SECCIÓN: PREGUNTAS FRECUENTES */}
<section className="py-16 px-6 bg-white">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold mb-8 text-center text-[#00204a]">Preguntas Frecuentes</h2>
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#ff6b00]">
        <h3 className="font-semibold text-lg text-[#00204a] mb-2 flex items-center gap-3">
          <span className="text-[#ff6b00]">?</span> ¿Realizan instalaciones fuera de El Bolsón?
        </h3>
        <p className="text-slate-600">Sí, cubrimos toda la Comarca Andina, incluyendo Lago Puelo, El Hoyo, Epuyén y zonas rurales aledañas.</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#0052cc]">
        <h3 className="font-semibold text-lg text-[#00204a] mb-2 flex items-center gap-3">
          <span className="text-[#0052cc]">?</span> ¿Los equipos tienen garantía?
        </h3>
        <p className="text-slate-600">Trabajamos únicamente con marcas oficiales como Hikvision, Dahua y Ajax, todas con garantía de fabricante.</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#25D366]">
        <h3 className="font-semibold text-lg text-[#00204a] mb-2 flex items-center gap-3">
          <span className="text-[#25D366]">?</span> ¿Puedo ver mis cámaras desde el celular?
        </h3>
        <p className="text-slate-600">¡Exacto! Configuramos todos nuestros sistemas de CCTV para que puedas monitorear en tiempo real desde cualquier lugar del mundo.</p>
      </div>
    </div>
  </div>
</section>

      {/* SECCIÓN QUIÉNES SOMOS */}
      <section id="quienes-somos" className="py-20 bg-gradient-to-b from-[#f8fafc] via-[#f0f7ff]/50 to-[#e8f3ff]/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#00204a] mb-4">Quiénes Somos</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Somos un equipo de especialistas dedicados a brindar soluciones integrales en seguridad, vigilancia y conectividad para El Bolsón y alrededores.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Contenido */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#ff6b00]">
                <h3 className="text-xl font-bold text-[#00204a] mb-3 flex items-center gap-3">
                  <span className="text-[#ff6b00]">✓</span> Experiencia
                </h3>
                <p className="text-slate-600">Más de una década trabajando en proyectos de seguridad e instalaciones tecnológicas para hogares y comercios.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#0052cc]">
                <h3 className="text-xl font-bold text-[#00204a] mb-3 flex items-center gap-3">
                  <span className="text-[#0052cc]">✓</span> Profesionalismo
                </h3>
                <p className="text-slate-600">Equipo calificado y certificado en las últimas tecnologías de vigilancia y conectividad.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#25D366]">
                <h3 className="text-xl font-bold text-[#00204a] mb-3 flex items-center gap-3">
                  <span className="text-[#25D366]">✓</span> Atención 24/7
                </h3>
                <p className="text-slate-600">Soporte técnico disponible todos los días para resolver cualquier inconveniente rápidamente.</p>
              </div>
            </div>

            {/* Imagen o contenedor */}
            <div className="bg-gradient-to-br from-[#0052cc] to-[#ff6b00] rounded-3xl p-1 shadow-xl">
              <div className="bg-white rounded-3xl p-8 h-96 flex items-center justify-center text-center">
                <div>
                  <Shield className="w-24 h-24 mx-auto text-[#0052cc] mb-4" />
                  <h3 className="text-2xl font-bold text-[#00204a] mb-2">DigitalTech</h3>
                  <p className="text-slate-600">Tu confianza es nuestro compromiso</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* SECCIÓN: CATÁLOGO DE PRODUCTOS CON GUÍA VISUAL */}
<section id="productos" className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
  <div className="max-w-5xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-4 uppercase tracking-wider text-white">Explorá nuestro Catálogo</h2>
    <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
      Trabajamos con el stock más completo. Seguí estos pasos para ver los modelos disponibles:
    </p>

    {/* GUÍA PASO A PASO - SIN ERRORES */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
      <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
        <div className="text-2xl font-bold text-orange-400 mb-2">01.</div>
        <p className="text-sm text-white">Hacé clic en el botón <strong>"INGRESAR AL CATÁLOGO"</strong>.</p>
      </div>
      <div className="bg-white/10 p-5 rounded-2xl border border-orange-400/50">
        <div className="text-2xl font-bold text-orange-400 mb-2">02.</div>
        <p className="text-sm text-white">Arriba a la derecha, hacé clic en el icono 👤 <strong>"ACCESO COMO INVITADO"</strong>.</p>
      </div>
      <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
        <div className="text-2xl font-bold text-orange-400 mb-2">03.</div>
        <p className="text-sm text-white">Capturá la pantalla del equipo que te guste y envianosla por WhatsApp.</p>
      </div>
    </div>
    
    {/* BOTÓN NARANJA RESALTADO */}
    <a 
      href="https://online.dmasrlonline.com.ar/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center bg-[#ff6b00] text-white font-bold py-5 px-12 rounded-full hover:bg-[#e66000] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,107,0,0.4)] mb-8"
    >
      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      INGRESAR AL CATÁLOGO
    </a>

    {/* NOTA REFORZADA CON DISEÑO DE ALERTA */}
    <div className="mt-4 bg-yellow-400/10 border-2 border-yellow-400/30 p-4 rounded-xl max-w-2xl mx-auto">
      <p className="text-base text-yellow-400 font-bold italic">
        ⚠️ IMPORTANTE: No necesitás usuario ni contraseña. Solo hacé clic en "Acceso como Invitado" para ver precios y modelos.
      </p>
    </div>
  </div>
</section>
{/* SECCIÓN: ZONA DE COBERTURA REGIONAL */}
<section className="py-12 bg-slate-50 border-t border-b border-slate-200">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h3 className="text-2xl font-bold text-blue-900 mb-6 uppercase tracking-tight">Presencia en toda la Comarca Andina</h3>
    <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-slate-700 font-semibold italic">
      <span className="flex items-center">📍 El Bolsón</span>
      <span className="flex items-center">📍 Lago Puelo</span>
      <span className="flex items-center">📍 El Hoyo</span>
      <span className="flex items-center">📍 Epuyén</span>
      <span className="flex items-center">📍 Cholila</span>
      <span className="flex items-center">📍 El Maitén</span>
    </div>
    <p className="mt-8 text-slate-500 text-sm max-w-2xl mx-auto">
      Brindamos soluciones de conectividad y seguridad en zonas rurales y parajes de difícil acceso. 
      Llegamos donde otros no llegan.
    </p>
  </div>
</section>

      {/* Footer */}
      {/* SECCIÓN DE UBICACIÓN (MAPA) */}
      <section id="ubicacion" className="py-20 bg-gradient-to-b from-[#e8f3ff]/50 via-[#f0f7ff]/60 to-[#e3ebf8]/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#00204a]">Nuestra Ubicación</h2>
            <p className="text-slate-600 mt-2">{DatosEmpresa.direccion}</p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white h-[450px] relative">
            {/* Mapa de Google Maps centrado en Alberti 965, El Bolsón */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2984.7356263544716!2d-71.5361!3d-41.9645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961bc2f4d8e5e3b1%3A0x6b8d4b3c9b3b3b3b!2sAlberti%20965%2C%20El%20Bols%C3%B3n%2C%20R%C3%ADo%20Negro!5e0!3m2!1ses-419!2sar!4v1706000000000!5m2!1ses-419!2sar" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      {/* SECCIÓN DE TESTIMONIOS */}
      <section id="testimonios" className="py-20 bg-gradient-to-b from-[#00204a] via-[#003d7a] to-[#001a3a] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-blue-200 mb-12">La tranquilidad de nuestros vecinos es nuestra mayor satisfacción.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Testimonio 1 */}
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/10 text-left">
              <div className="text-[#ff6b00] text-2xl mb-4">★★★★★</div>
              <p className="italic mb-6 text-blue-50">"Excelente servicio. Instalaron las cámaras en mi cabaña y ahora puedo ver todo desde el celular cuando no estoy en El Bolsón."</p>
              <p className="font-bold text-[#ff6b00]">- Ricardo M.</p>
            </div>
            {/* Testimonio 2 */}
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/10 text-left">
              <div className="text-[#ff6b00] text-2xl mb-4">★★★★★</div>
              <p className="italic mb-6 text-blue-50">"Muy profesionales. La alarma funciona perfecto y la atención de DigitalTech es inmediata ante cualquier duda."</p>
              <p className="font-bold text-[#ff6b00]">- Elena S.</p>
            </div>
            {/* Testimonio 3 */}
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/10 text-left">
              <div className="text-[#ff6b00] text-2xl mb-4">★★★★★</div>
              <p className="italic mb-6 text-blue-50">"Hicieron un enlace de Wi-Fi para mi campo y por fin tengo internet estable. Super recomendables en la zona."</p>
              <p className="font-bold text-[#ff6b00]">- Juan Eduardo T.</p>
            </div>
            {/* Testimonio 4 */}
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/10 text-left">
              <div className="text-[#ff6b00] text-2xl mb-4">★★★★★</div>
              <p className="italic mb-6 text-blue-50">"Exelente servicio, tanto en la instalacion como en el post-venta. Recomendamos sus servicos."</p>
              <p className="font-bold text-[#ff6b00]">- Amadeo Chacra Humus.</p>
            </div>
          </div>

          <Button 
            onClick={() => setIsReviewModalOpen(true)}
            className="bg-[#ff6b00] hover:bg-[#e66000] text-white rounded-full px-8 py-6 text-lg border-none"
          >
            Contanos tu experiencia
          </Button>
        </div>
      </section>
      {/* SECCIÓN DE TRABAJOS REALIZADOS */}
<section id="trabajos" className="py-20 bg-gradient-to-b from-[#f0f7ff]/70 via-[#e8f3ff]/50 to-[#e3ebf8]/60">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-[#00204a]">Nuestros Trabajos</h2>
      <p className="text-slate-600 mt-2">Seguridad instalada en El Bolsón y alrededores</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Aquí es donde "mapeamos" tus fotos */}
      {TrabajosRealizados.map((trabajo, index) => (
        <div 
          key={index} 
          className="group relative overflow-hidden rounded-2xl bg-white shadow-lg cursor-pointer"
          onClick={() => setSelectedImage(trabajo.imagen)}
        >
          <img 
            src={trabajo.imagen} 
            alt={trabajo.titulo} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h4 className="text-white font-bold text-lg">{trabajo.titulo}</h4>
            <p className="text-slate-300 text-sm">{trabajo.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
</section>

      <footer className="bg-[#00204a] text-white/50 py-10 px-4 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-4 text-white opacity-100">
           <Shield className="text-[#ff6b00]" size={20} />
           <span className="font-bold">DIGITALTECH</span>
        </div>
        <p>© 2026 DigitalTech Web - Todos los derechos reservados.</p>
        
        {/* REDES SOCIALES */}
        <div className="flex justify-center space-x-6 mt-6 mb-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-pink-500 transition-colors duration-300" title="Instagram">
            <span className="sr-only">Instagram</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-500 transition-colors duration-300" title="Facebook">
            <span className="sr-only">Facebook</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-300" title="X (Twitter)">
            <span className="sr-only">X</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.811-5.989 6.811h-3.308l7.734-8.835L2.25 2.25h6.825l4.721 6.237 5.448-6.237zM17.002 18.807h1.844L6.983 3.931H5.025L17.002 18.807z"/></svg>
          </a>
        </div>
        
        <a href="/admin" className="inline-flex items-center gap-2 hover:text-white transition-colors">
          <Settings size={14} /> Acceso Administrador
        </a>
      </footer>
      {/* VENTANA EMERGENTE DE CONTACTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-[#00204a] mb-2">Solicitar Presupuesto</h3>
            <p className="text-slate-500 mb-6 text-sm">
              Estás consultando por: <span className="font-bold text-[#0052cc]">{selectedService}</span>
            </p>

<form 
  className="space-y-4" 
onSubmit={(e) => {
  // 1. FUNDAMENTAL: Esto evita que el navegador busque el mail
  e.preventDefault();
  
  const f = e.currentTarget;
  const nombre = (f[0] as HTMLInputElement).value;
  const apellido = (f[1] as HTMLInputElement).value;
  const direccion = (f[2] as HTMLInputElement).value;
  const localidad = (f[3] as HTMLInputElement).value;
  const consulta = (f[4] as HTMLTextAreaElement).value;

  // 2. Armamos el texto (usamos %0D%0A para los saltos de línea)
  const textoWhatsApp = `📌 *NUEVO PRESUPUESTO*%0D%0A%0D%0A` +
                        `*Cliente:* ${nombre} ${apellido}%0D%0A` +
                        `*Dirección:* ${direccion}%0D%0A` +
                        `*Localidad:* ${localidad}%0D%0A` +
                        `*Consulta:* ${consulta}`;
  
  // 3. La URL mágica de WhatsApp
  const url = `https://wa.me/${DatosEmpresa.telefono}?text=${textoWhatsApp}`;
  
  // 4. Abrimos en pestaña nueva
  window.open(url, '_blank');
  
  // 5. Cerramos el cartelito
  setIsQuoteModalOpen(false);
}}
        >
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
    <input type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0052cc] outline-none" placeholder="Tu nombre..." />
  </div>
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp</label>
    <input type="tel" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0052cc] outline-none" placeholder="Ej: 2944..." />
  </div>
  <Button type="submit" className="w-full bg-[#0052cc] py-6 text-lg">
    Enviar Solicitud
  </Button>
</form>
          </div>
        </div>
      )}
{/* --- MODAL PRESUPUESTO GENERAL (WHATSAPP) --- */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsQuoteModalOpen(false)} 
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-2"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-bold text-[#00204a] mb-6">Solicitud de Presupuesto Técnico</h3>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget;
              
              // Extraemos valores
              const nombre = (f[0] as HTMLInputElement).value;
              const apellido = (f[1] as HTMLInputElement).value;
              const direccion = (f[2] as HTMLInputElement).value;
              const localidad = (f[3] as HTMLInputElement).value;
              const consulta = (f[4] as HTMLTextAreaElement).value;

              // Armamos el mensaje para WhatsApp (SIN MAILTO)
              const mensajeWA = `📌 *NUEVO PRESUPUESTO*%0D%0A%0D%0A` +
                                `*Cliente:* ${nombre} ${apellido}%0D%0A` +
                                `*Dirección:* ${direccion}%0D%0A` +
                                `*Localidad:* ${localidad}%0D%0A` +
                                `*Consulta:* ${consulta}`;
              
              const urlWA = `https://wa.me/${DatosEmpresa.telefono}?text=${mensajeWA}`;
              
              window.open(urlWA, '_blank');
              setIsQuoteModalOpen(false);
            }}>
              <input type="text" placeholder="Nombre" required className="p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0052cc]" />
              <input type="text" placeholder="Apellido" required className="p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0052cc]" />
              <input type="text" placeholder="Dirección" required className="p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0052cc]" />
              <input type="text" placeholder="Localidad" required className="p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0052cc]" />
              <textarea placeholder="¿En qué podemos ayudarte?" className="md:col-span-2 p-3 border border-slate-200 rounded-xl h-28 outline-none focus:ring-2 focus:ring-[#0052cc]"></textarea>
              
              <Button type="submit" className="md:col-span-2 bg-[#0052cc] py-6 text-lg text-white rounded-xl">
                Solicitar por WhatsApp
              </Button>
            </form>
          </div>
        </div>
      )}
      {/* MODAL PARA DEJAR COMENTARIO (WHATSAPP) */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm text-slate-900">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsReviewModalOpen(false)} 
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-2"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-[#00204a]">Tu opinión nos importa</h3>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget;
              const nombre = (f[0] as HTMLInputElement).value;
              const comentario = (f[1] as HTMLTextAreaElement).value;

              const mensaje = `⭐ *NUEVA RESEÑA DE CLIENTE*%0D%0A%0D%0A` +
                              `*Nombre:* ${nombre}%0D%0A` +
                              `*Comentario:* ${comentario}`;
              
              window.open(`https://wa.me/${DatosEmpresa.telefono}?text=${mensaje}`, '_blank');
              setIsReviewModalOpen(false);
            }}>
              <input type="text" placeholder="Tu nombre" required className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0052cc]" />
              <textarea placeholder="¿Cómo fue nuestro servicio?" required className="w-full p-3 border border-slate-200 rounded-xl h-32 outline-none focus:ring-2 focus:ring-[#0052cc]"></textarea>
              <Button type="submit" className="w-full bg-[#0052cc] py-6 text-white rounded-xl border-none">
                Enviar comentario por WhatsApp
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PARA VER IMAGEN AMPLIADA */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Trabajo ampliado" 
              className="w-full h-full object-contain"
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 bg-[#ff6b00] hover:bg-[#e66000] text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <a 
        href="https://wa.me/5492944378038"
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all hover:scale-110 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-medium whitespace-nowrap">
          Contáctanos
        </span>
        {/* Icono de WhatsApp */}
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.56.94 3.129 1.462 4.809 1.462 5.004 0 9.073-4.068 9.075-9.074.001-2.427-.943-4.709-2.657-6.424-1.713-1.715-3.993-2.659-6.423-2.659-5.006 0-9.075 4.069-9.075 9.075-.001 1.603.414 3.167 1.207 4.542l-1.005 3.677 3.769-.989z"/>
        </svg>
      </a>

    </div>
  );
}