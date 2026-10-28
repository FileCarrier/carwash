import { Star, Quote } from "lucide-react";
import { siteConfig } from "../config";

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 md:py-32 bg-slate-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
            Отзывы
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Нам доверяют
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Более 10 000 довольных клиентов за 5 лет работы
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {siteConfig.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/20 transition-all"
            >
              <Quote size={24} className="text-cyan-500/30 mb-4" />
              <p className="text-slate-300 leading-relaxed mb-6">{review.text}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">{review.name}</div>
                  <div className="text-slate-500 text-sm">{review.car}</div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
