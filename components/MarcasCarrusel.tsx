"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shield } from 'lucide-react';

const MarcasCarrusel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const marcas = [
    {
      nombre: "Ubiquiti",
      img: "/marcas/ubiquiti.jpg",
      desc: "Líder en soluciones de redes y conectividad de alto rendimiento. Ideal para enlaces de larga distancia y Wi-Fi empresarial."
    },
    {
      nombre: "Dahua",
      img: "/marcas/cam-dahua.jpg",
      desc: "Tecnología de vanguardia en videovigilancia. Cámaras con inteligencia artificial y visión nocturna ultra clara."
    },
    {
      nombre: "Hikvision",
      img: "/marcas/hikvision.jpg",
      desc: "El mayor proveedor mundial de seguridad electrónica. Soluciones robustas y confiables para todo tipo de instalaciones."
    },
    {
      nombre: "Ajax",
      img: "/marcas/ajax.jpg",
      desc: "El sistema de alarma inalámbrico más premiado de Europa. Diseño elegante con tecnología de grado militar."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrent((prev) => (prev === marcas.length - 1 ? 0 : prev + 1));
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [marcas.length, isPaused]);

  return (
    <section 
      className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-center text-sm font-bold text-blue-400 uppercase tracking-widest mb-10">
          Equipamiento Profesional de Insumos
        </h2>
        
        <div className="bg-gradient-to-br from-[#0052cc] to-[#ff6b00] rounded-2xl p-1 shadow-xl">
          <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 md:p-12 min-h-[250px] flex items-center border border-blue-100">
            {/* Contenido del Carrusel */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full transition-all duration-500">
              <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4">
                <img 
                  src={marcas[current].img} 
                  alt={marcas[current].nombre}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#00204a] mb-3">{marcas[current].nombre}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {marcas[current].desc}
                </p>
              </div>
            </div>

            {/* Botones de Navegación */}
            <button 
              onClick={() => setCurrent(current === 0 ? marcas.length - 1 : current - 1)}
              className="absolute left-2 md:-left-6 bg-white shadow-lg rounded-full p-2 text-slate-400 hover:text-[#ff6b00] transition-colors"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={() => setCurrent(current === marcas.length - 1 ? 0 : current + 1)}
              className="absolute right-2 md:-right-6 bg-white shadow-lg rounded-full p-2 text-slate-400 hover:text-[#ff6b00] transition-colors"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>

        {/* Indicadores de bolitas */}
        <div className="flex justify-center gap-2 mt-8">
          {marcas.map((_, i) => (
            <div 
              key={i}
              className={`h-2 rounded-full transition-all ${current === i ? "w-8 bg-[#ff6b00]" : "w-2 bg-slate-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarcasCarrusel;
