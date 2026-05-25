import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, User, Mail, Building2, Briefcase, Users, MessageSquare } from 'lucide-react';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', teamSize: '', interest: '', challenge: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const inputStyle = { background: 'transparent', border: '1px solid var(--rule-light)', color: 'var(--ink)' };
  const labelStyle = { color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' };

  return (
    <div>
      {/* Editorial Header */}
      <section className="relative px-8 lg:px-16 pt-16 pb-8">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 75% 15%, color-mix(in srgb, var(--gold) 5%, transparent) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl">
          <p className="iw-hero-eyebrow mb-6 flex items-center gap-3">
            <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--gold)' }} />
            Contact
          </p>
          <h1 className="iw-hero-title mb-6" style={{ color: 'var(--ink)' }}>
            See IntegrateWise<br />
            <span style={{ color: 'var(--forest)' }}>in action.</span>
          </h1>
          <p className="iw-body max-w-2xl" style={{ color: 'var(--ink-muted)' }}>
            IntegrateWise is in active development with two products serving early customers.
            We are selectively onboarding organizations that want to stop being the integration layer.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-8 lg:px-16 py-12">
        {submitted ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--forest-bright) 12%, transparent)' }}>
              <Send className="w-7 h-7" style={{ color: 'var(--forest-bright)' }} />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: 'var(--ink)' }}>Request received.</h2>
            <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>We will be in touch within 48 hours.</p>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
            <p className="text-sm mb-8" style={{ color: 'var(--ink-muted)' }}>
              If your team manages complex relationships across multiple tools, if your AI forgets everything between sessions, if your organization runs on 10+ tools that do not talk to each other — we should talk.
            </p>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold tracking-widest mb-2" style={labelStyle}>NAME</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={inputStyle}>
                <User className="w-4 h-4 shrink-0" style={{ color: 'var(--ink-ghost)' }} />
                <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--ink)' }} required />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold tracking-widest mb-2" style={labelStyle}>EMAIL</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={inputStyle}>
                <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--ink-ghost)' }} />
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@company.com" className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--ink)' }} required />
              </div>
            </div>

            {/* Company + Role */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold tracking-widest mb-2" style={labelStyle}>COMPANY</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={inputStyle}>
                  <Building2 className="w-4 h-4 shrink-0" style={{ color: 'var(--ink-ghost)' }} />
                  <input type="text" value={form.company} onChange={e => update('company', e.target.value)} placeholder="Company" className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--ink)' }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest mb-2" style={labelStyle}>ROLE</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={inputStyle}>
                  <Briefcase className="w-4 h-4 shrink-0" style={{ color: 'var(--ink-ghost)' }} />
                  <input type="text" value={form.role} onChange={e => update('role', e.target.value)} placeholder="Your role" className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--ink)' }} />
                </div>
              </div>
            </div>

            {/* Team Size */}
            <div>
              <label className="block text-xs font-bold tracking-widest mb-2" style={labelStyle}>TEAM SIZE</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={inputStyle}>
                <Users className="w-4 h-4 shrink-0" style={{ color: 'var(--ink-ghost)' }} />
                <input type="text" value={form.teamSize} onChange={e => update('teamSize', e.target.value)} placeholder="e.g. 10-50" className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--ink)' }} />
              </div>
            </div>

            {/* Interest */}
            <div>
              <label className="block text-xs font-bold tracking-widest mb-3" style={labelStyle}>PRIMARY INTEREST</label>
              <div className="flex gap-3">
                {['Account Success', 'Business Intelligence', 'Both'].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update('interest', opt)}
                    className="flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: form.interest === opt ? 'var(--forest)' : 'transparent',
                      color: form.interest === opt ? 'var(--paper)' : 'var(--ink-muted)',
                      border: `1px solid ${form.interest === opt ? 'var(--forest)' : 'var(--rule-light)'}`,
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Challenge */}
            <div>
              <label className="block text-xs font-bold tracking-widest mb-2" style={labelStyle}>BIGGEST OPERATIONAL CHALLENGE</label>
              <div className="flex items-start gap-3 px-4 py-3 rounded-xl" style={inputStyle}>
                <MessageSquare className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--ink-ghost)' }} />
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
