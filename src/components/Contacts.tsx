import { MapPin, Phone, Clock, Mail, Instagram, Send, MessageCircle } from "lucide-react";
import { siteConfig } from "../config";

export default function Contacts() {
  return (
    <section id="contacts" className="py-20 md:py-32 bg-slate-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
            Контакты
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Как нас найти
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Адрес</h3>
                <p className="text-slate-400 mt-1">{siteConfig.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Телефон</h3>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-slate-400 hover:text-cyan-400 transition-colors mt-1 block"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Режим работы</h3>
                <p className="text-slate-400 mt-1">{siteConfig.workingHours}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Email</h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-slate-400 hover:text-cyan-400 transition-colors mt-1 block"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          {/* Social & Map placeholder */}
          <div className="space-y-6">
            {/* Social links */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Мы в соцсетях</h3>
              <div className="flex gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center text-purple-400 hover:scale-110 transition-transform"
                >
                  <Instagram size={22} />
                </a>
                <a
                  href={siteConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:scale-110 transition-transform"
                >
                  <Send size={22} />
                </a>
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20 flex items-center justify-center text-green-400 hover:scale-110 transition-transform"
                >
                  <MessageCircle size={22} />
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={40} className="text-cyan-400/50 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">
                  Здесь будет карта
                </p>
                <p className="text-slate-600 text-xs mt-1">
                  Вставьте iframe Яндекс.Карт или Google Maps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
