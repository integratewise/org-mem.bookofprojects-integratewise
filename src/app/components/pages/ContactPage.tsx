import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, User, Mail, Building2, Briefcase, Users, MessageSquare } from 'lucide-react';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', teamSize: '', interest: '', challenge: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const inputStyle = { background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', color: 'var(--ink)' };
  const labelStyle = { color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden" style={{ background: 'var(--forest)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: 'var(--gold)', filter: 'blur(120px)' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>CONTACT</p>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--paper)', fontFamily: 'var(--font-serif)' }}>
            See IntegrateWise in action.
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--paper)', opacity: 0.8 }}>
            IntegrateWise is in active development with two products serving early customers. We are selectively onboarding organizations that want to stop being the integration layer.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {submitted ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--forest-bright) 12%, transparent)' }}>
              <Send className="w-7 h-7" style={{ color: 'var(--forest-bright)' }} />
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>Request received.</h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>We will be in touch within 48 hours.</p>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
            <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
              If your team manages complex relationships across multiple tools, if your AI forgets everything between sessions, if your organization runs on 10+ tools that do not talk to each other — we should talk.
            </p>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold tracking-widest mb-2" style={labelStyle}>NAME</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={inputStyle}>
                <User className="w-4 h-4 shrink-0" style={{ color: 'var(--text-faint)' }} />
                <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--ink)' }} required />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold tracking-widest mb-2" style={labelStyle}>EMAIL</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={inputStyle}>
                <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--text-faint)' }} />
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@company.com" className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--ink)' }} required />
              </div>
            </div>

            {/* Company + Role */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold tracking-widest mb-2" style={labelStyle}>COMPANY</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={inputStyle}>
                  <Building2 className="w-4 h-4 shrink-0" style={{ color: 'var(--text-faint)' }} />
                  <input type="text" value={form.company} onChange={e => update('company', e.target.value)} placeholder="Company" className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--ink)' }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest mb-2" style={labelStyle}>ROLE</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={inputStyle}>
                  <Briefcase className="w-4 h-4 shrink-0" style={{ color: 'var(--text-faint)' }} />
                  <input type="text" value={form.role} onChange={e => update('role', e.target.value)} placeholder="Your role" className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--ink)' }} />
                </div>
              </div>
            </div>

            {/* Team Size */}
            <div>
              <label className="block text-xs font-bold tracking-widest mb-2" style={labelStyle}>TEAM SIZE</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={inputStyle}>
                <Users className="w-4 h-4 shrink-0" style={{ color: 'var(--text-faint)' }} />
                <input type="text" value={form.teamSize} onChange={e => update('teamSize', e.target.value)} placeholder="e.g. 10-50" className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--ink)' }} />
              </div>
            </div>

            {/* Interest */}
            <div>
              <label className="block text-xs font-bold tracking-widest mb-3" style={labelStyle}>PRIMARY INTEREST</label>
              <div className="flex gap-3">
                {['Account Success', 'Business Intelligence', 'Both'].map(opt => (
                  <button key={opt} type="button" onClick={() => update('interest', opt)} className="flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all" style={{ background: form.interest === opt ? 'var(--forest)' : 'var(--surface-raised)', color: form.interest === opt ? 'var(--paper)' : 'var(--text-muted)', border: `1px solid ${form.interest === opt ? 'var(--forest)' : 'var(--border-subtle)'}` }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Challenge */}
            <div>
              <label className="block text-xs font-bold tracking-widest mb-2" style={labelStyle}>BIGGEST OPERATIONAL CHALLENGE</label>
              <div className="flex items-start gap-3 px-4 py-3 rounded-xl" style={inputStyle}>
                <MessageSquare className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--text-faint)' }} />
                <textarea value={form.challenge} onChange={e => update('challenge', e.target.value)} placeholder="What is the biggest operational challenge your team faces?" rows={4} className="flex-1 bg-transparent outline-none text-sm resize-none" style={{ color: 'var(--ink)' }} />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'var(--forest)', color: 'var(--paper)' }}>
              <Send className="w-4 h-4" />
              Request a demo
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
