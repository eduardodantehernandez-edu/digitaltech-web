"use client";
import { DatosEmpresa } from "@/lib/configuracion";
import React, { useState } from 'react';
import { 
  Shield, Printer, Image as ImageIcon, Trash2, Plus, Phone, Mail, MapPin
} from 'lucide-react';
import { Button } from "@/components/ui/button";

interface LineItem {
  id: number;
  cant: number;
  descripcion: string;
  unitario: number;
  imagen?: string;
}

export default function PresupuestadorPage() {
  const [items, setItems] = useState<LineItem[]>([{ id: 1, cant: 1, descripcion: "", unitario: 0 }]);
  const [clienteNombre, setClienteNombre] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const agregarFila = () => {
    const nuevoId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, { id: nuevoId, cant: 1, descripcion: "", unitario: 0 }]);
  };

  const eliminarFila = (id: number) => setItems(items.filter(item => item.id !== id));

  const actualizarItem = (id: number, campo: keyof LineItem, valor: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [campo]: valor } : item));
  };

  const calcularTotal = () => items.reduce((acc, item) => acc + (item.cant * item.unitario), 0);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-10 print:bg-white print:p-0">
      <style jsx global>{`
        @media print {
          .print-force-color { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-[40px] overflow-hidden print:shadow-none print:rounded-none">
        
        {/* HEADER */}
        <div className="bg-[#00204a] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-6 border-b-[10px] border-[#ff6b00] print-force-color">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-2xl border-2 border-[#00204a]">
              <Shield size={40} fill="#ff6b00" className="text-[#00204a]" />
            </div>
            <div>
              <h2 className="text-4xl font-black italic tracking-tighter text-[#ff6b00]" 
                  style={{ textShadow: "-1.5px -1.5px 0 #00204a, 1.5px -1.5px 0 #00204a, -1.5px 1.5px 0 #00204a, 1.5px 1.5px 0 #00204a" }}>
                DIGITALTECH
              </h2>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">{DatosEmpresa.direccion}</p>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-xl font-black text-orange-400 uppercase">Presupuesto</h3>
            <p className="text-xs opacity-60">Fecha: {new Date().toLocaleDateString('es-AR')}</p>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="p-8 md:p-12">
          <div className="mb-10">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">CLIENTE / PROYECTO</label>
            <input 
              type="text" 
              value={clienteNombre}
              onChange={(e) => setClienteNombre(e.target.value)}
              placeholder="Ej: Instalación Cámaras - Juan Pérez" 
              className="w-full text-2xl font-bold border-none bg-slate-50 p-4 rounded-xl outline-none focus:ring-2 ring-orange-400 transition-all" 
            />
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-slate-400 text-[10px] uppercase font-black border-b border-slate-100 pb-4">
                <th className="pb-4 w-16">Cant.</th>
                <th className="pb-4">Descripción</th>
                <th className="pb-4 w-24 text-center">Foto</th>
                <th className="pb-4 w-32 text-right">Unitario</th>
                <th className="pb-4 w-32 text-right">Subtotal</th>
                <th className="pb-4 w-10 no-print"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="py-4">
                    <input type="number" value={item.cant} onChange={(e) => actualizarItem(item.id, 'cant', parseInt(e.target.value) || 0)} className="w-12 bg-transparent font-bold outline-none" />
                  </td>
                  <td className="py-4">
                    <input type="text" value={item.descripcion} onChange={(e) => actualizarItem(item.id, 'descripcion', e.target.value)} placeholder="Producto/Servicio..." className="w-full bg-transparent outline-none" />
                  </td>
                  <td className="py-4 text-center">
                    <label className="cursor-pointer inline-block">
                      {item.imagen ? (
                        <img src={item.imagen} className="w-12 h-12 object-cover rounded-lg border shadow-sm" />
                      ) : (
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300 border border-dashed border-slate-200 hover:text-orange-500 hover:border-orange-500 transition-all">
                          <ImageIcon size={16} />
                        </div>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          actualizarItem(item.id, 'imagen', url);
                        }
                      }} />
                    </label>
                  </td>
                  <td className="py-4 text-right font-medium">
                    <input type="number" value={item.unitario} onChange={(e) => actualizarItem(item.id, 'unitario', parseFloat(e.target.value) || 0)} className="w-24 text-right bg-transparent outline-none" />
                  </td>
                  <td className="py-4 text-right font-black text-[#00204a] print-force-color">
                    ${(item.cant * item.unitario).toLocaleString()}
                  </td>
                  <td className="py-4 text-center no-print">
                    <button onClick={() => eliminarFila(item.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button onClick={agregarFila} variant="outline" className="mt-4 text-[#0052cc] font-bold gap-2 no-print">
            <Plus size={16} /> AGREGAR LÍNEA
          </Button>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <textarea 
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Notas, Garantías y Condiciones de pago..." 
              className="w-full p-4 bg-slate-50 rounded-2xl text-sm min-h-[120px] outline-none italic text-slate-600 border-none" 
            />
            <div className="flex flex-col justify-end">
              <div className="bg-[#00204a] p-8 rounded-[30px] text-white shadow-xl print-force-color border-2 border-[#ff6b00]">
                <p className="text-[10px] uppercase font-black text-orange-400 mb-1">Inversión Total Estimada</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black italic">${calcularTotal().toLocaleString()}</span>
                  <span className="text-blue-300 font-bold text-sm uppercase">Ars</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER ACCIÓN */}
        <div className="p-8 bg-slate-50 flex justify-between items-center no-print border-t border-slate-100">
          <p className="text-xs text-slate-400 font-medium italic">DigitalTech Herramienta Interna</p>
          <Button onClick={() => window.print()} className="bg-[#ff6b00] hover:bg-[#e66000] text-white px-8 py-6 rounded-xl font-bold gap-2 shadow-lg transition-all hover:scale-105">
            <Printer size={20} /> DESCARGAR PRESUPUESTO PDF
          </Button>
        </div>
      </div>
    </div>
  );
}