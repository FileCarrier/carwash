import { Droplets } from "lucide-react";
import { siteConfig } from "../config";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Droplets size={16} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg">{siteConfig.companyName}</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">
                  Услуги и цены
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">
                  Калькулятор стоимости
                </a>
              </li>
              <li>
                <a href="#booking" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">
                  Онлайн-запись
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">
                  Отзывы
                </a>
              </li>
              <li>
                <a href="#contacts" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-500">{siteConfig.address}</li>
              <li>
                <a href={`tel:${siteConfig.phone}`} className="text-slate-500 hover:text-cyan-400 transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="text-slate-500">{siteConfig.workingHours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} {siteConfig.companyName}. Все права защищены.
          </p>
          <p className="text-slate-700 text-xs">
            Шаблон сайта для автомоек
          </p>
        </div>
      </div>
    </footer>
  );
}
