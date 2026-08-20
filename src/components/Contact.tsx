// ─── Contact Section ─────────────────────────────────────────────────────────
import { useState } from 'react'
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useContent } from '../context/ContentContext'

export default function Contact() {
  const { content, loading } = useContent()
  const contact = content?.contact

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingSubmit(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoadingSubmit(false)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  if (loading) {
    return (
      <section id="contact" className="py-28 px-6 relative">
        <div className="max-w-5xl mx-auto flex justify-center">
          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      </section>
    )
  }

  const contactItems = [
    { icon: Mail, title: 'Email', value: contact?.email || 'carrascoyuri841@gmail.com', href: `mailto:${contact?.email || 'carrascoyuri841@gmail.com'}` },
    { icon: Phone, title: 'Teléfono', value: contact?.phone || '+51 989 766 318', href: `tel:${contact?.phone || '+51989766318'}` },
    { icon: FaWhatsapp, title: 'WhatsApp', value: contact?.whatsapp || '+51 989 766 318', href: `https://wa.me/${(contact?.whatsapp || '+51989766318').replace(/\s/g, '')}?text=Hola,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20trabajar%20contigo.`, target: '_blank' },
    { icon: MapPin, title: 'Ubicación', value: contact?.location || 'Perú (Remoto/Presencial)', href: undefined },
  ]

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="absolute left-1/4 top-0 w-80 h-80 bg-indigo-700/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            — Contacto
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {contact?.title || 'Hablemos'} <span className="gradient-text">juntos</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-md mx-auto">
            {contact?.subtitle || '¿Tienes un proyecto en mente? Estoy disponible para trabajar en nuevas ideas y colaboraciones.'}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6">
            {contactItems.map(({ icon: Icon, title, value, href, target }) => (
              <div key={title} className="glass rounded-2xl p-5 flex items-start gap-4 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                  <Icon size={18} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{title}</p>
                  {href ? (
                    <a href={href} target={target} className="text-slate-300 text-sm font-medium hover:text-indigo-400 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-slate-300 text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-3 glass rounded-3xl p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-all"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Cuéntame sobre tu proyecto..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loadingSubmit}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:from-indigo-400 hover:to-violet-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loadingSubmit ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : sent ? (
                <>
                  <CheckCircle size={16} />
                  ¡Mensaje enviado!
                </>
              ) : (
                <>
                  <Send size={16} />
                  Enviar mensaje
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}