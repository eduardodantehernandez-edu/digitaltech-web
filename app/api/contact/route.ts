import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json();

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "75f8745e-b941-4725-b123-c937d8e7fb96",
        name: nombre,
        email: email,
        message: mensaje,
        subject: `Nuevo Presupuesto: ${nombre}`,
      }),
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({ message: "Enviado con éxito" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Error al enviar" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error de servidor" }, { status: 500 });
  }
}