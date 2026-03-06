// Функция для форматирования числа в статистике пользователя (подписки, подписчики, публикации)

export const formatNumber = (num: number): string => {
  if (num < 0) return "0";
  // Для чисел меньше 10000 используем ru-RU с пробелом как разделитель тысяч
  if (num < 10_000) return num.toLocaleString("ru-RU");

  // Для больших чисел — компактный формат
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";

  if (num >= 10_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";

  // fallback
  return "0";
};
