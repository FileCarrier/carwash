// ============================================
// КОНФИГУРАЦИЯ САЙТА АВТОМОЙКИ
// Редактируйте этот файл под конкретную мойку
// ============================================

export const siteConfig = {
  // Основная информация
  companyName: "AquaShine",
  tagline: "Премиальная автомойка",
  description: "Профессиональная мойка и детейлинг вашего автомобиля с гарантией качества",
  address: "ул. Примерная, 42, Москва",
  phone: "+7 (999) 123-45-67",
  email: "info@aquashine.ru",
  workingHours: "Ежедневно 8:00 — 22:00",
  
  // Социальные сети
  social: {
    instagram: "https://instagram.com/aquashine",
    telegram: "https://t.me/aquashine",
    whatsapp: "https://wa.me/79991234567",
  },

  // Telegram Bot (для получения заявок)
  telegram: {
    botToken: "YOUR_BOT_TOKEN_HERE", // Токен бота от @BotFather
    chatId: "YOUR_CHAT_ID_HERE",     // ID чата куда отправлять заявки
  },

  // Рабочие часы для записи (24-часовой формат)
  schedule: {
    openHour: 8,
    closeHour: 22,
    slotDuration: 30, // длительность слота в минутах
  },

  // Услуги и цены
  services: [
    {
      id: "exterior",
      name: "Мойка кузова",
      description: "Бесконтактная мойка кузова с применением активной пены",
      icon: "droplets",
      duration: 20, // минут
      basePrice: 500,
      options: [
        { id: "ext-foam", name: "Двойная пена", price: 200 },
        { id: "ext-wax", name: "Покрытие воском", price: 400 },
        { id: "ext-osmosis", name: "Осмотическая вода", price: 150 },
      ],
    },
    {
      id: "interior",
      name: "Мойка салона",
      description: "Полная уборка салона: пылесос, протирка поверхностей, стёкла",
      icon: "car",
      duration: 40,
      basePrice: 800,
      options: [
        { id: "int-leather", name: "Уход за кожей", price: 500 },
        { id: "int-ozon", name: "Озонирование", price: 600 },
        { id: "int-mat", name: "Химчистка ковриков", price: 300 },
      ],
    },
    {
      id: "complex",
      name: "Комплексная мойка",
      description: "Мойка кузова + полная уборка салона",
      icon: "sparkles",
      duration: 60,
      basePrice: 1100,
      options: [
        { id: "comp-wax", name: "Покрытие воском", price: 400 },
        { id: "comp-ozon", name: "Озонирование", price: 600 },
        { id: "comp-engine", name: "Мойка двигателя", price: 700 },
      ],
    },
    {
      id: "detailing",
      name: "Детейлинг",
      description: "Глубокая очистка, полировка и защитное покрытие",
      icon: "gem",
      duration: 180,
      basePrice: 5000,
      options: [
        { id: "det-polish", name: "Полировка кузова", price: 3000 },
        { id: "det-ceramic", name: "Керамическое покрытие", price: 8000 },
        { id: "det-headlight", name: "Полировка фар", price: 1500 },
      ],
    },
  ],

  // Преимущества
  advantages: [
    {
      title: "Профессиональное оборудование",
      description: "Используем только премиальную химию и оборудование ведущих мировых брендов",
      icon: "award",
    },
    {
      title: "Опытная команда",
      description: "Наши мастера прошли обучение и имеют сертификаты ведущих производителей",
      icon: "users",
    },
    {
      title: "Гарантия качества",
      description: "Если вас что-то не устроит — перемоем бесплатно или вернём деньги",
      icon: "shield",
    },
    {
      title: "Онлайн-запись",
      description: "Записывайтесь в удобное время без очередей и ожидания",
      icon: "clock",
    },
  ],

  // Отзывы
  reviews: [
    {
      name: "Алексей К.",
      car: "BMW X5",
      text: "Отличная мойка! Машину привели в идеальное состояние. Теперь только сюда.",
      rating: 5,
    },
    {
      name: "Мария С.",
      car: "Mercedes GLC",
      text: "Записалась онлайн — приехала к назначенному времени, всё сделали быстро и качественно.",
      rating: 5,
    },
    {
      name: "Дмитрий В.",
      car: "Audi A6",
      text: "Делал комплекс с полировкой. Результат превзошёл ожидания. Рекомендую!",
      rating: 5,
    },
  ],

  // Классы авто (для расчёта стоимости)
  carClasses: [
    { id: "sedan", name: "Седан", multiplier: 1.0 },
    { id: "suv", name: "Кроссовер / Внедорожник", multiplier: 1.3 },
    { id: "minivan", name: "Минивэн", multiplier: 1.4 },
    { id: "business", name: "Бизнес-класс", multiplier: 1.2 },
  ],
};
