import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json();

    // CONFIGURACIÓN DE TU CUENTA
    const userEmail = "eduardodantehernandez@gmail.com"; // <-- Poné tu dirección de Gmail
    const userPass = "mghe xiek lwyt ialr";     // <-- Pegá acá las 16 letras de Google

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: userEmail,
        pass: userPass,
      },
    });

    const mailOptions = {
      from: userEmail, // Se envía desde tu cuenta para que Gmail no lo bloquee
      to: userEmail,   // Te llega a vos mismo
      replyTo: email,  // Si le das a "Responder", le contestás al cliente
      subject: `📩 Nuevo Presupuesto: ${nombre}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ff6b00; border-radius: 10px;">
          <h2 style="color: #00204a;">Solicitud de Presupuesto - DigitalTech</h2>
          <p><strong>Cliente:</strong> ${nombre}</p>
          <p><strong>Email del cliente:</strong> ${email}</p>
          <hr />
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${mensaje}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Enviado con éxito" }, { status: 200 });
  } catch (error) {
    console.error("Error en el servidor de mail:", error);
    return NextResponse.json({ message: "Error al enviar" }, { status: 500 });
  }
}