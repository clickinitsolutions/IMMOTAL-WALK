import React from "react";
import { Heart, Users, Map, Compass, BookOpen, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import BuddhaPresence from "./BuddhaPresence";

export default function AboutSection() {
  const values = [
    {
      icon: Compass,
      title: "Lineage Authenticity",
      description: "We transmit unmodified wisdom from Vedic, Buddhist, and Upanishadic lineages. No watered-down protocols, only pure self-inquiry."
    },
    {
      icon: ShieldCheck,
      title: "Scientific Integration",
      description: "We correlate ancient mindfulness states with modern neuroscience, heart-rate variability (HRV), and neural oscillation theories."
    },
    {
      icon: Heart,
      title: "Absolute Devotion",
      description: "Every class, guide, and retreat is curated as a sacred offering (Seva) to help seekers realize their fundamental nature."
    }
  ];

  const team = [
    {
      name: "Acharya Shunya Prasad",
      role: "Lineage Elder & Advaita Vedanta Master",
      bio: "Spent 18 years in silent contemplation in the higher Himalayas before returning to share the non-dual path of self-inquiry.",
      avatar: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Dr. Evelyn Vance, PhD",
      role: "Neuroscientist & Meditation Researcher",
      bio: "Harvard-trained neuroscientist researching the direct impact of high-state pranayama on cortical synchronization and deep rest.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Yogi Devendra",
      role: "Chief of Asana & Kundalini Breath",
      bio: "Initiated in traditional Hatha lineage in Rishikesh. Curates alignments designed to steady the physical shell for long dhyana.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <div id="about-page" className="space-y-16 py-4">
      {/* Immersive Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-2">
          Our Sacred Genesis
        </span>
        <h2 className="text-4xl font-serif font-bold text-sage-900 tracking-tight leading-tight">
          Restoring Stillness in a Mechanical World
        </h2>
        <p className="mt-4 text-sage-600 text-sm leading-relaxed">
          Immortal Walks was born from a simple revelation in the high snows of Gangotri: that human suffering is not a technical problem, but a state of forgotten identity. We build digital and physical bridges back to that silence.
        </p>
      </div>

      {/* Philosophy Grid */}
      <div className="relative">
        <BuddhaPresence variant="watermark" className="-top-32 -left-32 w-80 h-80 opacity-5" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-white border border-sage-100 p-8 rounded-3xl space-y-4 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-sage-50 text-gold-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-sage-900">{v.title}</h3>
                <p className="text-xs text-sage-600 leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Elegant Buddha banner in the center */}
      <BuddhaPresence variant="banner" quote="Quiet the mind, and the soul will speak. No obstacle can block the seeker who has discovered their own inner sun." />

      {/* Interactive Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-sage-900 text-gold-100 rounded-3xl p-8 lg:p-12 overflow-hidden relative">
        <div className="absolute right-0 top-0 w-64 h-64 opacity-5 pointer-events-none">
          <svg className="w-full h-full text-white" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="lg:col-span-7 space-y-6 z-10">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-400">
            The Visionary Compass
          </span>
          <h3 className="text-3xl font-serif font-medium leading-tight text-white">
            “The mind is a superb servant, but a catastrophic master.”
          </h3>
          <p className="text-sage-200 text-xs leading-relaxed">
            Through daily attunement, we slow down the biological heart rate, decrease neurological cortisol, and establish an unbroken awareness. Whether you are practicing asana, breathing in pranayama, or writing in your introspective journal, our instruments are designed to steer you from the mechanical into the immortal.
          </p>
          <div className="border-l-2 border-gold-400 pl-4 py-1 italic text-xs text-gold-300">
            "We believe that real spiritual practice is practical, logical, and deeply liberating."
          </div>
        </div>

        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-64 lg:h-80 shadow-md">
          <img
            src="https://i.pinimg.com/736x/52/4d/fc/524dfc8580a82c1181233f1dece8b43d.jpg"
            alt="Serene Meditating Buddha Statue"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[1.02] contrast-105"
          />
        </div>
      </div>

      {/* Master Guides / Team */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-1">
            Sanskrit Guardians
          </span>
          <h3 className="text-2xl font-serif font-bold text-sage-900">
            Our Master Lineage Guides
          </h3>
          <p className="text-sage-600 text-xs max-w-xl">
            Meet the researchers, yogis, and non-dual masters carrying our core transmission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-sage-100 p-6 flex flex-col justify-between space-y-4 hover:shadow-xs transition-shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover border border-sage-100"
                />
                <div>
                  <h4 className="font-serif font-bold text-sage-900 text-sm leading-tight">
                    {t.name}
                  </h4>
                  <span className="text-[10px] text-gold-700 block mt-0.5">{t.role}</span>
                </div>
              </div>
              <p className="text-xs text-sage-600 leading-relaxed bg-sage-50/50 p-4 rounded-xl border border-sage-50">
                {t.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Elegant Golden Buddha visual presence below team */}
        <div className="flex justify-center pt-4">
          <BuddhaPresence 
            variant="card" 
            quote="There is no path to happiness: happiness is the path."
            className="max-w-md w-full"
          />
        </div>
      </div>

      {/* Expanded Ancient Lineage Chronology & Deep Narrative Details */}
      <div className="border-t border-sage-100 pt-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-700 block">
            Lineage Epochs
          </span>
          <h3 className="text-3xl font-serif font-bold text-sage-950 tracking-tight">
            The Historical Stream of Tapovan Wisdom
          </h3>
          <p className="text-sage-600 text-xs leading-relaxed">
            The teachings transmitted by Immortal Walks are not modern inventions. They represent a contiguous stream of non-dual practice, maintained through rigorous silence and master-to-disciple attunement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/60 p-8 rounded-3xl border border-sage-100/80 space-y-4">
            <span className="text-xs font-mono text-gold-600 font-bold block">EPOCH I • VEDIC ROOTS (C. 1500 BCE)</span>
            <h4 className="text-md font-serif font-bold text-sage-900">The Rigveda Aranyaka Solitudes</h4>
            <p className="text-xs text-sage-600 leading-relaxed">
              Before the establishment of formal monasteries, practitioners retreated into the deep sub-alpine forests (Aranyakas). Here, they developed the core patterns of Prana regulation and deep sensory internalization (Pratyahara) to quiet the physical body during extreme high-altitude cold.
            </p>
          </div>

          <div className="bg-white/60 p-8 rounded-3xl border border-sage-100/80 space-y-4">
            <span className="text-xs font-mono text-gold-600 font-bold block">EPOCH II • UPANISHADIC VICHARA (C. 800 BCE)</span>
            <h4 className="text-md font-serif font-bold text-sage-900">Socratic Non-Dual Inquiries</h4>
            <p className="text-xs text-sage-600 leading-relaxed">
              Transitioning from ritual to pure intellectual self-inquiry, the early forest sages of the Gangotri basin compiled dialogues on the nature of the self (Atman). This epoch established the practice of Svadhyaya—contemplative inquiry—which serves as the core framework of our digital journaling engine.
            </p>
          </div>

          <div className="bg-white/60 p-8 rounded-3xl border border-sage-100/80 space-y-4">
            <span className="text-xs font-mono text-gold-600 font-bold block">EPOCH III • tapovan RESTORATION (1920 CE)</span>
            <h4 className="text-md font-serif font-bold text-sage-900">Swami Tapovan Maharaj Solitudes</h4>
            <p className="text-xs text-sage-600 leading-relaxed">
              In the early 20th century, the legendary saint Swami Tapovan Maharaj revived the strict lifestyle of forest-dwelling sages in Uttarkashi. He demonstrated that deep contemplation, paired with physical spinal steadiness and scriptural clarity, holds the power to liberate modern cognitive fatigue.
            </p>
          </div>
        </div>

        <div className="bg-[#5c6f59]/5 border border-[#5c6f59]/10 rounded-3xl p-8 lg:p-10 space-y-6 text-left max-w-4xl mx-auto">
          <h4 className="text-lg font-serif font-bold text-sage-950">Deep Scriptural Commitments & Modern Biometrics</h4>
          <p className="text-xs text-sage-700 leading-relaxed">
            Every visual asset and layout formula on this platform is calibrated to serve as a visual "Trataka" (gaze stabilization) anchor. In traditional practice, steadying the visual field is a direct mechanism to down-regulate the sympathetic nervous system and prepare the mind for unhindered concentration. By integrating ancient stone-carving aesthetics with modern high-frequency acoustic oscillators, we evoke the calm acoustic resonance of Himalayan caves within the current digital environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pt-4 border-t border-sage-200/40">
            <div className="text-xs font-mono text-sage-600">
              REFERENCE SCRIPTURES: Mandukya, Avadhuta Gita, Patanjali Yoga Sutras
            </div>
            <div className="text-[10px] bg-gold-100 text-gold-800 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Verified Lineage Transmission
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
