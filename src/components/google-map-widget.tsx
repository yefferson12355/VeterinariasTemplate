"use client"

export function GoogleMapWidget(): JSX.Element {
  return (
    <div className="size-full">
      <iframe
        src={process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL}
        width="100%"
        height="100%"
        style={{ borderRadius: "20px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa de Google con la ubicación de la clínica veterinaria ARKA en Bochnia"
      />
    </div>
  )
}
