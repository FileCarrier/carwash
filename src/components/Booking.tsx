import { useState, useMemo, useCallback } from "react";
import { Calendar, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { siteConfig } from "../config";
import type { TimeSlot } from "../types";

// Имитация занятых слотов (в реальном проекте это будет API)
const getBookedSlots = (_date: string): string[] => {
  // Здесь можно подключить API для получения занятых слотов
  // Пока возвращаем пустой массив — все слоты свободны
  return [];
};

export default function Booking() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carClass, setCarClass] = useState(siteConfig.carClasses[0].id);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Генерация дат на ближайшие 7 дней
  const availableDates = useMemo(() => {
    const dates: { value: string; label: string; dayName: string }[] = [];
    const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const monthNames = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const value = date.toISOString().split("T")[0];
      const label = `${date.getDate()} ${monthNames[date.getMonth()]}`;
      const dayName = dayNames[date.getDay()];
      dates.push({ value, label, dayName });
    }
    return dates;
  }, []);

  // Генерация временных слотов
  const timeSlots: TimeSlot[] = useMemo(() => {
    if (!selectedDate) return [];
    
    const bookedSlots = getBookedSlots(selectedDate);
    const slots: TimeSlot[] = [];
    const { openHour, closeHour, slotDuration } = siteConfig.schedule;
    
    // Проверяем, является ли выбранная дата сегодня
    const today = new Date();
    const isToday = selectedDate === today.toISOString().split("T")[0];
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();

    for (let hour = openHour; hour < closeHour; hour++) {
      for (let min = 0; min < 60; min += slotDuration) {
        const timeStr = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
        
        let available = true;
        
        // Если это сегодня, пропускаем прошедшее время
        if (isToday) {
          if (hour < currentHour || (hour === currentHour && min <= currentMinute)) {
            available = false;
          }
        }
        
        // Проверяем, не забронирован ли слот
        if (bookedSlots.includes(timeStr)) {
          available = false;
        }

        slots.push({ time: timeStr, available });
      }
    }
    return slots;
  }, [selectedDate]);

  const totalPrice = useMemo(() => {
    const carClassObj = siteConfig.carClasses.find((c) => c.id === carClass);
    const multiplier = carClassObj?.multiplier || 1;
    let total = 0;
    selectedServices.forEach((serviceId) => {
      const service = siteConfig.services.find((s) => s.id === serviceId);
      if (service) {
        total += service.basePrice * multiplier;
        service.options.forEach((opt) => {
          if (selectedOptions.includes(opt.id)) {
            total += opt.price * multiplier;
          }
        });
      }
    });
    return Math.round(total);
  }, [selectedServices, selectedOptions, carClass]);

  const toggleService = useCallback((serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  }, []);

  const toggleOption = useCallback((optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  }, []);

  const sendToTelegram = async () => {
    setSending(true);
    setError("");

    const carClassObj = siteConfig.carClasses.find((c) => c.id === carClass);
    
    const selectedServiceNames = selectedServices.map((id) => {
      const service = siteConfig.services.find((s) => s.id === id);
      return service?.name || id;
    });

    const selectedOptionNames = selectedOptions.map((id) => {
      for (const service of siteConfig.services) {
        const opt = service.options.find((o) => o.id === id);
        if (opt) return opt.name;
      }
      return id;
    });

    const message = `🚗 *НОВАЯ ЗАЯВКА НА ЗАПИСЬ*

👤 *Клиент:* ${name}
📱 *Телефон:* ${phone}
🚙 *Автомобиль:* ${carModel} (${carClassObj?.name})

📅 *Дата:* ${selectedDate}
⏰ *Время:* ${selectedTime}

🛠 *Услуги:*
${selectedServiceNames.map((s) => `• ${s}`).join("\n")}

${selectedOptionNames.length > 0 ? `✨ *Доп. опции:*\n${selectedOptionNames.map((o) => `• ${o}`).join("\n")}` : ""}

💰 *Стоимость:* ${totalPrice} ₽

${comment ? `💬 *Комментарий:* ${comment}` : ""}`;

    try {
      const { botToken, chatId } = siteConfig.telegram;
      
      if (botToken === "YOUR_BOT_TOKEN_HERE" || chatId === "YOUR_CHAT_ID_HERE") {
        // Демо-режим — показываем что заявка принята
        console.log("Telegram message:", message);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSent(true);
        setSending(false);
        return;
      }

      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      setSent(true);
    } catch {
      setError("Произошла ошибка при отправке. Позвоните нам или попробуйте позже.");
    } finally {
      setSending(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedServices.length > 0;
      case 2: return selectedDate !== "" && selectedTime !== "";
      case 3: return name.trim() !== "" && phone.trim() !== "" && carModel.trim() !== "";
      default: return false;
    }
  };

  if (sent) {
    return (
      <section id="booking" className="py-20 md:py-32 bg-slate-950 relative">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-slate-900/50 border border-green-500/30 rounded-2xl p-10">
            <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Заявка отправлена!</h2>
            <p className="text-slate-400 text-lg mb-6">
              Мы свяжемся с вами в ближайшее время для подтверждения записи.
            </p>
            <div className="bg-slate-800/50 rounded-xl p-4 text-left">
              <p className="text-slate-300 text-sm">
                📅 {selectedDate} в {selectedTime}
              </p>
              <p className="text-slate-300 text-sm">
                💰 Стоимость: {totalPrice} ₽
              </p>
            </div>
            <button
              onClick={() => {
                setSent(false);
                setStep(1);
                setSelectedServices([]);
                setSelectedOptions([]);
                setSelectedDate("");
                setSelectedTime("");
                setName("");
                setPhone("");
                setCarModel("");
                setComment("");
              }}
              className="mt-6 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              ← Новая запись
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 md:py-32 bg-slate-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
            Онлайн-запись
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Запишитесь на мойку
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Выберите удобное время — мы всё подготовим к вашему приезду
          </p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-center mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  step >= s
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-slate-800 text-slate-500 border border-slate-700"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 sm:w-24 h-0.5 mx-2 transition-all ${
                    step > s ? "bg-cyan-500" : "bg-slate-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
          {/* Step 1: Services */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-cyan-400" />
                Выберите услуги
              </h3>

              <div className="space-y-3">
                {siteConfig.services.map((service) => (
                  <div
                    key={service.id}
                    className={`rounded-xl border p-4 transition-all cursor-pointer ${
                      selectedServices.includes(service.id)
                        ? "border-cyan-500/50 bg-cyan-500/5"
                        : "border-slate-700 bg-slate-800/30 hover:border-slate-600"
                    }`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            selectedServices.includes(service.id)
                              ? "border-cyan-500 bg-cyan-500"
                              : "border-slate-600"
                          }`}
                        >
                          {selectedServices.includes(service.id) && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                        <div>
                          <span className="text-white font-medium">{service.name}</span>
                          <span className="text-slate-500 text-sm ml-2">
                            ~{service.duration} мин
                          </span>
                        </div>
                      </div>
                      <span className="text-cyan-400 font-semibold">
                        {service.basePrice} ₽
                      </span>
                    </div>

                    {selectedServices.includes(service.id) && service.options.length > 0 && (
                      <div className="mt-4 ml-8 space-y-2">
                        {service.options.map((opt) => (
                          <div
                            key={opt.id}
                            className="flex items-center justify-between py-1.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleOption(opt.id);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                  selectedOptions.includes(opt.id)
                                    ? "border-cyan-500 bg-cyan-500"
                                    : "border-slate-600"
                                }`}
                              >
                                {selectedOptions.includes(opt.id) && (
                                  <span className="text-white text-[10px]">✓</span>
                                )}
                              </div>
                              <span className="text-slate-300 text-sm">{opt.name}</span>
                            </div>
                            <span className="text-slate-400 text-sm">+{opt.price} ₽</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {totalPrice > 0 && (
                <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Промежуточный итог:</span>
                    <span className="text-xl font-bold text-white">{totalPrice} ₽</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock size={20} className="text-cyan-400" />
                Выберите дату и время
              </h3>

              {/* Date selection */}
              <label className="text-slate-300 text-sm font-medium mb-3 block">Дата</label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-8">
                {availableDates.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => {
                      setSelectedDate(date.value);
                      setSelectedTime("");
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedDate === date.value
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                        : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <div className="text-xs opacity-60">{date.dayName}</div>
                    <div className="font-semibold text-sm mt-1">{date.label}</div>
                  </button>
                ))}
              </div>

              {/* Time selection */}
              {selectedDate && (
                <>
                  <label className="text-slate-300 text-sm font-medium mb-3 block">
                    Свободное время
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                          !slot.available
                            ? "border-slate-800 bg-slate-900/50 text-slate-700 cursor-not-allowed line-through"
                            : selectedTime === slot.time
                            ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                            : "border-slate-700 bg-slate-800/50 text-slate-300 hover:border-cyan-500/50"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 3: Contact info */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Send size={20} className="text-cyan-400" />
                Ваши данные
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Александр"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Марка и модель авто *
                  </label>
                  <input
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder="Toyota Camry"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Класс автомобиля
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {siteConfig.carClasses.map((cc) => (
                      <button
                        key={cc.id}
                        onClick={() => setCarClass(cc.id)}
                        className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                          carClass === cc.id
                            ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                            : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        {cc.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Комментарий (необязательно)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Особые пожелания..."
                    rows={3}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-white font-semibold mb-2">Ваша запись:</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-slate-400">
                    📅 {selectedDate} в {selectedTime}
                  </p>
                  <p className="text-slate-400">
                    🚙 {carModel || "—"}
                  </p>
                  <p className="text-slate-400">
                    🛠 {selectedServices.map((id) => siteConfig.services.find((s) => s.id === id)?.name).join(", ")}
                  </p>
                  <p className="text-white font-bold text-lg mt-2">
                    💰 {totalPrice} ₽
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-slate-400 hover:text-white transition-colors font-medium"
              >
                ← Назад
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => canProceed() && setStep(step + 1)}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  canProceed()
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25"
                    : "bg-slate-800 text-slate-600 cursor-not-allowed"
                }`}
              >
                Далее →
              </button>
            ) : (
              <button
                onClick={sendToTelegram}
                disabled={sending || !canProceed()}
                className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  sending || !canProceed()
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25"
                }`}
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Отправить заявку
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
