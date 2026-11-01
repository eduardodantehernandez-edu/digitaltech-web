
"use client";

import React, { useEffect, useRef, useState } from "react";
import { DatosEmpresa } from "@/lib/configuracion";
import {
  Shield, Printer, Plus, Trash2, Camera, ClipboardList,
  Wifi, Router, User, FileText, ImagePlus
} from "lucide-react";

interface Equipo {
  id: number;
  cantidad: number;
  tipo: string;
  marca: string;
  modelo: string;
  serie: string;
  ubicacion: string;
  ipLocal: string;
  observacion: string;
}

interface Foto {
  id: number;
  nombre: string;
  url: string;
}

const campo =
  "w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400";

const etiqueta =
  "block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2";

const tituloSeccion =
  "flex items-center gap-2 text-lg font-black text-[#00204a] border-b-2 border-orange-400 pb-3 mb-6";

export default function OrdenTrabajoPage() {
  const [numero, setNumero] = useState("Generando...");
  const [fecha, setFecha] = useState("");
  const [cliente, setCliente] = useState({
    nombre: "",
    documento: "",
    telefono: "",
    email: "",
    direccion: "",
    localidad: "",
  });

  const [trabajo, setTrabajo] = useState("");
  const [estado, setEstado] = useState("Finalizado");
  const [tecnico, setTecnico] = useState("DigitalTech");

  const [equipos, setEquipos] = useState<Equipo[]>([
    {
      id: 1,
      cantidad: 1,
      tipo: "",
      marca: "",
      modelo: "",
      serie: "",
      ubicacion: "",
      ipLocal: "",
      observacion: "",
    },
  ]);

  const [red, setRed] = useState({
    proveedor: "",
    conexion: "",
    routerMarca: "",
    routerModelo: "",
    usuarioAdmin: "",
    claveAdmin: "",
    ssid: "",
    claveWifi: "",
    modo: "",
    ubicacionRouter: "",
    observacionesRed: "",
  });

  const [observaciones, setObservaciones] = useState("");
  const [garantia, setGarantia] = useState("");
  const [condiciones, setCondiciones] = useState("");
  const [fotos, setFotos] = useState<Foto[]>([]);

  const numeroAsignado = useRef(false);

  useEffect(() => {
    if (numeroAsignado.current) return;
    numeroAsignado.current = true;

    const hoy = new Date();
    setFecha(hoy.toLocaleDateString("en-CA"));

    try {
      const anterior = Number(
        localStorage.getItem("digitaltech_orden_counter") || "0"
      );
      const siguiente = anterior + 1;

      localStorage.setItem(
        "digitaltech_orden_counter",
        String(siguiente)
      );

      setNumero(`DT-${String(siguiente).padStart(4, "0")}`);
    } catch {
      setNumero(
        `DT-${hoy.getFullYear()}${String(hoy.getMonth() + 1).padStart(2, "0")}${String(hoy.getDate()).padStart(2, "0")}`
      );
    }
  }, []);

  const actualizarCliente = (
    campo: keyof typeof cliente,
    valor: string
  ) => {
    setCliente((anterior) => ({ ...anterior, [campo]: valor }));
  };

  const actualizarRed = (
    campo: keyof typeof red,
    valor: string
  ) => {
    setRed((anterior) => ({ ...anterior, [campo]: valor }));
  };

  const agregarEquipo = () => {
    setEquipos((anteriores) => [
      ...anteriores,
      {
        id: Date.now(),
        cantidad: 1,
        tipo: "",
        marca: "",
        modelo: "",
        serie: "",
        ubicacion: "",
        ipLocal: "",
        observacion: "",
      },
    ]);
  };

  const actualizarEquipo = (
    id: number,
    campo: keyof Equipo,
    valor: string | number
  ) => {
    setEquipos((anteriores) =>
      anteriores.map((equipo) =>
        equipo.id === id ? { ...equipo, [campo]: valor } : equipo
      )
    );
  };

  const eliminarEquipo = (id: number) => {
    setEquipos((anteriores) =>
      anteriores.filter((equipo) => equipo.id !== id)
    );
  };

  const cargarFotos = (archivos: FileList | null) => {
    if (!archivos) return;

    Array.from(archivos).forEach((archivo) => {
      if (!archivo.type.startsWith("image/")) return;

      const lector = new FileReader();

      lector.onload = () => {
        setFotos((anteriores) => [
          ...anteriores,
          {
            id: Date.now() + Math.random(),
            nombre: archivo.name,
            url: lector.result as string,
          },
        ]);
      };

      lector.readAsDataURL(archivo);
    });
  };

  const eliminarFoto = (id: number) => {
    setFotos((anteriores) =>
      anteriores.filter((foto) => foto.id !== id)
    );
  };

  const imprimir = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-slate-100 p-3 md:p-8 print:bg-white print:p-0">
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          body {
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }

          .print-force-color {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .print-break {
            break-inside: avoid;
          }

          .print-new-page {
            break-before: page;
          }

          input,
          textarea,
          select {
            color: #1e293b !important;
          }

          textarea {
            overflow: visible !important;
          }

          .orden-contenedor {
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: none !important;
          }
        }
      `}</style>

      <div className="orden-contenedor max-w-5xl mx-auto bg-white rounded-[30px] shadow-2xl overflow-hidden">

        {/* ENCABEZADO */}
        <header className="bg-[#00204a] p-6 md:p-10 text-white border-b-[8px] border-[#ff6b00] print-force-color">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl">
                <Shield size={42} fill="#ff6b00" className="text-[#00204a]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-[#ff6b00]">
                  DIGITALTECH
                </h1>
                <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">
                  {DatosEmpresa.direccion}
                </p>
                <p className="text-blue-200 text-xs mt-1">
                  {DatosEmpresa.telefono} · {DatosEmpresa.email}
                </p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h2 className="text-xl font-black uppercase text-orange-400">
                Orden de Trabajo
              </h2>
              <p className="font-black text-2xl mt-1">{numero}</p>
              <p className="text-xs text-blue-200">
                Fecha: {fecha ? new Date(fecha + "T12:00:00").toLocaleDateString("es-AR") : ""}
              </p>
            </div>
          </div>
        </header>

        <div className="p-5 md:p-10 space-y-10">

          {/* CLIENTE */}
          <section>
            <h3 className={tituloSeccion}>
              <User size={21} className="text-orange-500" />
              1. Datos del cliente
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className={etiqueta}>Nombre y apellido</label>
                <input className={campo} value={cliente.nombre}
                  onChange={(e) => actualizarCliente("nombre", e.target.value)}
                  placeholder="Nombre completo" />
              </div>

              <div>
                <label className={etiqueta}>DNI / CUIT</label>
                <input className={campo} value={cliente.documento}
                  onChange={(e) => actualizarCliente("documento", e.target.value)}
                  placeholder="Documento del cliente" />
              </div>

              <div>
                <label className={etiqueta}>Teléfono</label>
                <input className={campo} value={cliente.telefono}
                  onChange={(e) => actualizarCliente("telefono", e.target.value)}
                  placeholder="Teléfono de contacto" />
              </div>

              <div>
                <label className={etiqueta}>Correo electrónico</label>
                <input className={campo} type="email" value={cliente.email}
                  onChange={(e) => actualizarCliente("email", e.target.value)}
                  placeholder="correo@ejemplo.com" />
              </div>

              <div>
                <label className={etiqueta}>Domicilio</label>
                <input className={campo} value={cliente.direccion}
                  onChange={(e) => actualizarCliente("direccion", e.target.value)}
                  placeholder="Dirección del cliente" />
              </div>

              <div>
                <label className={etiqueta}>Localidad</label>
                <input className={campo} value={cliente.localidad}
                  onChange={(e) => actualizarCliente("localidad", e.target.value)}
                  placeholder="Ciudad / localidad" />
              </div>
            </div>
          </section>

          {/* TRABAJO */}
          <section>
            <h3 className={tituloSeccion}>
              <ClipboardList size={21} className="text-orange-500" />
              2. Trabajo realizado
            </h3>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className={etiqueta}>Estado del trabajo</label>
                <select className={campo} value={estado}
                  onChange={(e) => setEstado(e.target.value)}>
                  <option>Finalizado</option>
                  <option>En proceso</option>
                  <option>Pendiente</option>
                  <option>Requiere nueva visita</option>
                </select>
              </div>

              <div>
                <label className={etiqueta}>Técnico responsable</label>
                <input className={campo} value={tecnico}
                  onChange={(e) => setTecnico(e.target.value)} />
              </div>
            </div>

            <label className={etiqueta}>Descripción detallada del trabajo</label>
            <textarea className={`${campo} min-h-[130px]`}
              value={trabajo}
              onChange={(e) => setTrabajo(e.target.value)}
              placeholder="Describa las tareas realizadas, reparaciones, instalaciones, mantenimiento y procedimientos..." />
          </section>

          {/* EQUIPOS */}
          <section>
            <h3 className={tituloSeccion}>
              <Router size={21} className="text-orange-500" />
              3. Equipos y materiales instalados
            </h3>

            {equipos.map((equipo, indice) => (
              <div key={equipo.id} className="border border-slate-200 rounded-xl p-4 mb-5 print-break">
                <div className="flex justify-between items-center mb-4">
                  <strong className="text-sm text-[#00204a]">
                    Equipo / Material #{indice + 1}
                  </strong>
                  <button type="button" onClick={() => eliminarEquipo(equipo.id)}
                    className="no-print text-red-400 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={etiqueta}>Tipo de equipo</label>
                    <input className={campo} value={equipo.tipo}
                      onChange={(e) => actualizarEquipo(equipo.id, "tipo", e.target.value)}
                      placeholder="Cámara IP, NVR, router, antena..." />
                  </div>

                  <div>
                    <label className={etiqueta}>Cantidad</label>
                    <input type="number" min="1" className={campo}
                      value={equipo.cantidad}
                      onChange={(e) => actualizarEquipo(equipo.id, "cantidad", Number(e.target.value))} />
                  </div>

                  <div>
                    <label className={etiqueta}>Marca</label>
                    <input className={campo} value={equipo.marca}
                      onChange={(e) => actualizarEquipo(equipo.id, "marca", e.target.value)}
                      placeholder="Marca" />
                  </div>

                  <div>
                    <label className={etiqueta}>Modelo</label>
                    <input className={campo} value={equipo.modelo}
                      onChange={(e) => actualizarEquipo(equipo.id, "modelo", e.target.value)}
                      placeholder="Modelo" />
                  </div>

                  <div>
                    <label className={etiqueta}>Número de serie</label>
                    <input className={campo} value={equipo.serie}
                      onChange={(e) => actualizarEquipo(equipo.id, "serie", e.target.value)}
                      placeholder="Número de serie" />
                  </div>

                  <div>
                    <label className={etiqueta}>Ubicación física</label>
                    <input className={campo} value={equipo.ubicacion}
                      onChange={(e) => actualizarEquipo(equipo.id, "ubicacion", e.target.value)}
                      placeholder="Ej: frente, oficina, techo..." />
                  </div>

                  <div>
                    <label className={etiqueta}>IP local fija (si corresponde)</label>
                    <input className={campo} value={equipo.ipLocal}
                      onChange={(e) => actualizarEquipo(equipo.id, "ipLocal", e.target.value)}
                      placeholder="192.168.1.100" />
                  </div>

                  <div>
                    <label className={etiqueta}>Observación del equipo</label>
                    <input className={campo} value={equipo.observacion}
                      onChange={(e) => actualizarEquipo(equipo.id, "observacion", e.target.value)}
                      placeholder="Detalles adicionales" />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" onClick={agregarEquipo}
              className="no-print flex items-center gap-2 border border-blue-600 text-blue-700 px-5 py-3 rounded-lg font-bold text-sm hover:bg-blue-50">
              <Plus size={17} /> AGREGAR EQUIPO
            </button>
          </section>

          {/* RED Y ROUTER */}
          <section className="print-break">
            <h3 className={tituloSeccion}>
              <Wifi size={21} className="text-orange-500" />
              4. Configuración de red e Internet
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className={etiqueta}>Proveedor de Internet (ISP)</label>
                <input className={campo} value={red.proveedor}
                  onChange={(e) => actualizarRed("proveedor", e.target.value)}
                  placeholder="Ej: Movistar, Claro, Starlink..." />
              </div>

              <div>
                <label className={etiqueta}>Tipo de conexión</label>
                <select className={campo} value={red.conexion}
                  onChange={(e) => actualizarRed("conexion", e.target.value)}>
                  <option value="">Seleccionar...</option>
                  <option>Fibra óptica</option>
                  <option>Starlink</option>
                  <option>Radioenlace</option>
                  <option>ADSL</option>
                  <option>Otra</option>
                </select>
              </div>

              <div>
                <label className={etiqueta}>Marca del router</label>
                <input className={campo} value={red.routerMarca}
                  onChange={(e) => actualizarRed("routerMarca", e.target.value)} />
              </div>

              <div>
                <label className={etiqueta}>Modelo del router</label>
                <input className={campo} value={red.routerModelo}
                  onChange={(e) => actualizarRed("routerModelo", e.target.value)} />
              </div>

              <div>
                <label className={etiqueta}>Usuario de administración</label>
                <input className={campo} value={red.usuarioAdmin}
                  onChange={(e) => actualizarRed("usuarioAdmin", e.target.value)} />
              </div>

              <div>
                <label className={etiqueta}>Contraseña de administración</label>
                <input className={campo} value={red.claveAdmin}
                  onChange={(e) => actualizarRed("claveAdmin", e.target.value)}
                  placeholder="Contraseña del router" />
              </div>

              <div>
                <label className={etiqueta}>Nombre de red Wi-Fi (SSID)</label>
                <input className={campo} value={red.ssid}
                  onChange={(e) => actualizarRed("ssid", e.target.value)} />
              </div>

              <div>
                <label className={etiqueta}>Contraseña Wi-Fi</label>
                <input className={campo} value={red.claveWifi}
                  onChange={(e) => actualizarRed("claveWifi", e.target.value)} />
              </div>

              <div>
                <label className={etiqueta}>Modo de funcionamiento</label>
                <select className={campo} value={red.modo}
                  onChange={(e) => actualizarRed("modo", e.target.value)}>
                  <option value="">Seleccionar...</option>
                  <option>Router</option>
                  <option>Access Point (AP)</option>
                  <option>Bridge</option>
                  <option>Repetidor</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <label className={etiqueta}>Ubicación física del router</label>
                <input className={campo} value={red.ubicacionRouter}
                  onChange={(e) => actualizarRed("ubicacionRouter", e.target.value)} />
              </div>
            </div>

            <div className="mt-5">
              <label className={etiqueta}>Observaciones de red y configuraciones especiales</label>
              <textarea className={`${campo} min-h-[90px]`}
                value={red.observacionesRed}
                onChange={(e) => actualizarRed("observacionesRed", e.target.value)}
                placeholder="Ej: Router secundario conectado en modo Access Point..." />
            </div>
          </section>

          {/* OBSERVACIONES */}
          <section>
            <h3 className={tituloSeccion}>
              <FileText size={21} className="text-orange-500" />
              5. Observaciones generales
            </h3>

            <textarea className={`${campo} min-h-[150px]`}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Escriba aquí las observaciones del trabajo, recomendaciones, problemas encontrados, tareas pendientes y cualquier otro detalle importante..." />
          </section>

          {/* FOTOGRAFIAS */}
          <section>
            <h3 className={tituloSeccion}>
              <Camera size={21} className="text-orange-500" />
              6. Registro fotográfico
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {fotos.map((foto) => (
                <div key={foto.id} className="relative print-break">
                  <img src={foto.url} alt={foto.nombre}
                    className="w-full h-36 object-cover rounded-xl border border-slate-200" />
                  <p className="text-xs text-slate-500 mt-1 truncate">{foto.nombre}</p>
                  <button type="button" onClick={() => eliminarFoto(foto.id)}
                    className="no-print absolute top-2 right-2 bg-white rounded-full p-2 text-red-500 shadow">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            <label className="no-print mt-4 inline-flex items-center gap-2 cursor-pointer border-2 border-dashed border-slate-300 rounded-xl p-5 text-sm font-bold text-slate-500 hover:border-orange-400 hover:text-orange-500">
              <ImagePlus size={22} />
              AGREGAR FOTOGRAFÍAS
              <input type="file" accept="image/*" multiple className="hidden"
                onChange={(e) => {
                  cargarFotos(e.target.files);
                  e.target.value = "";
                }} />
            </label>
          </section>

          {/* GARANTIA */}
          <section className="print-break">
            <h3 className={tituloSeccion}>
              <Shield size={21} className="text-orange-500" />
              7. Garantía y condiciones
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className={etiqueta}>Garantía otorgada</label>
                <input className={campo} value={garantia}
                  onChange={(e) => setGarantia(e.target.value)}
                  placeholder="Ej: 6 meses sobre instalación" />
              </div>

              <div>
                <label className={etiqueta}>Condiciones adicionales</label>
                <textarea className={`${campo} min-h-[90px]`}
                  value={condiciones}
                  onChange={(e) => setCondiciones(e.target.value)}
                  placeholder="Condiciones de garantía, mantenimiento y pago..." />
              </div>
            </div>
          </section>

          {/* CONFORMIDAD */}
          <section className="print-break">
            <h3 className={tituloSeccion}>
              8. Conformidad del cliente
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-10">
              El cliente declara haber recibido el trabajo detallado en esta
              orden y manifiesta su conformidad con las tareas realizadas,
              equipos instalados y condiciones indicadas.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div className="border-t border-slate-400 pt-3 text-center">
                <p className="text-xs font-bold text-slate-600">
                  FIRMA DEL CLIENTE
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Aclaración: {cliente.nombre || "________________"}
                </p>
              </div>

              <div className="border-t border-slate-400 pt-3 text-center">
                <p className="text-xs font-bold text-slate-600">
                  FIRMA DEL TÉCNICO
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {DatosEmpresa.nombre}
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* PIE */}
        <footer className="bg-[#00204a] p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-center gap-4 print-force-color">
          <div>
            <p className="font-black text-orange-400">DIGITALTECH</p>
            <p className="text-xs text-blue-200">{DatosEmpresa.direccion}</p>
            <p className="text-xs text-blue-200">{DatosEmpresa.email}</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs font-bold">ORDEN {numero}</p>
            <p className="text-[10px] text-blue-200">
              Documento de trabajo DigitalTech
            </p>
          </div>
        </footer>

        <div className="no-print p-6 bg-slate-50 flex justify-center">
          <button type="button" onClick={imprimir}
            className="flex items-center justify-center gap-3 bg-[#ff6b00] hover:bg-[#e66000] text-white px-8 py-5 rounded-xl font-black shadow-lg transition-all hover:scale-105 w-full md:w-auto">
            <Printer size={22} />
            DESCARGAR ORDEN DE TRABAJO PDF
          </button>
        </div>

      </div>
    </main>
  );
}
