import { Droplets, Car, Sparkles, Gem, Award, Users, Shield, Clock } from "lucide-react";
import { siteConfig } from "../config";

const iconMap: Record<string, React.ReactNode> = {
  droplets: <Droplets size={28} />,
  car: <Car size={28} />,
  sparkles: <Sparkles size={28} />,
  gem: <Gem size={28} />,
  award: <Award size={28} />,
  users: <Users size={28} />,
  shield: <Shield size={28} />,
  clock: <Clock size={28} />,
};

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-slate-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
            Наши услуги
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Полный спектр услуг
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
            От быстрой мойки до полного детейлинга — мы позаботимся о вашем автомобиле
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {siteConfig.services.map((service) => (
            <div
              key={service.id}
              className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  {iconMap[service.icon]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{service.name}</h3>
                    <span className="text-cyan-400 font-bold text-lg">
                      от {service.basePrice} ₽
                    </span>
                  </div>
                  <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Clock size={14} className="text-slate-500" />
                    <span className="text-slate-500 text-sm">~{service.duration} мин</span>
                  </div>
                  {service.options.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.options.map((opt) => (
                        <span
                          key={opt.id}
                          className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full border border-slate-700"
                        >
                          {opt.name} +{opt.price}₽
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advantages */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.advantages.map((adv) => (
            <div
              key={adv.title}
              className="text-center p-6 rounded-xl bg-gradient-to-b from-slate-900/50 to-transparent border border-slate-800/50"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-4">
                {iconMap[adv.icon]}
              </div>
              <h3 className="text-white font-semibold mb-2">{adv.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
