export function formatPrice(price) {
  // Convertir a número si es string
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  // Formatear con puntos para miles y comas para decimales (formato español)
  return numPrice.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
