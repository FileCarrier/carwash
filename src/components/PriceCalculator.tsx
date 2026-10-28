import { useState, useMemo } from "react";
import { Calculator, Check } from "lucide-react";
import { siteConfig } from "../config";

export default function PriceCalculator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedCarClass, setSelectedCarClass] = useState(siteConfig.carClasses[0].id);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const totalPrice = useMemo(() => {
    const carClass = siteConfig.carClasses.find((c) => c.id === selectedCarClass);
    const multiplier = carClass?.multiplier || 1;

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
  }, [selectedServices, selectedOptions, selectedCarClass]);

  const totalDuration = useMemo(() => {
    let duration = 0;
    selectedServices.forEach((serviceId) => {
      const service = siteConfig.services.find((s) => s.id === serviceId);
      if (service) duration += service.duration;
    });
    return duration;
  }, [selectedServices]);

  return (
    <section id="calculator" className="py-20 md:py-32 bg-slate-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
            Калькулятор
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Рассчитайте стоимость
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Выберите нужные услуги и класс автомобиля для расчёта
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
          {/* Car class selection */}
          <div className="mb-8">
            <label className="text-white font-semibold mb-3 block">Класс автомобиля</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {siteConfig.carClasses.map((carClass) => (
                <button
                  key={carClass.id}
                  onClick={() => setSelectedCarClass(carClass.id)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    selectedCarClass === carClass.id
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                      : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {carClass.name}
                  <span className="block text-xs mt-1 opacity-60">
                    ×{carClass.multiplier}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Services selection */}
          <div className="mb-8">
            <label className="text-white font-semibold mb-3 block">Услуги</label>
            <div className="space-y-3">
              {siteConfig.services.map((service) => (
                <div
                  key={service.id}
                  className={`rounded-xl border p-4 transition-all cursor-pointer ${
                    selectedServices.includes(service.id)
                      ? "border-cyan-500/50 bg-cyan-500/5"
                      : "border-slate-700 bg-slate-900/30 hover:border-slate-600"
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
                          <Check size={12} className="text-white" />
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

                  {/* Options for selected service */}
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
                                <Check size={10} className="text-white" />
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
          </div>

          {/* Result */}
          {selectedServices.length > 0 && (
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Calculator size={20} />
                    <span className="font-semibold">Итого:</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    ~{totalDuration} мин • {siteConfig.carClasses.find(c => c.id === selectedCarClass)?.name}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{totalPrice} ₽</div>
                  <p className="text-slate-500 text-xs mt-1">примерная стоимость</p>
                </div>
              </div>
              <a
                href="#booking"
                className="block text-center mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                Записаться на эту услугу
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
