import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  Users,
  ShieldCheck,
  Zap,
  ScanLine,
  Sparkles,
} from "lucide-react";

/** Trusted logos list */
const logos: string[] = ["NovaPay", "LogiTrack", "FinEdge", "DocuSync", "Flowstack"];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050716] text-gray-100 font-lexend flex flex-col">

      {/* ---------------- NAVBAR ---------------- */}
      <header className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/10 sticky top-0 z-40 backdrop-blur-md bg-black/40">
        <div className="flex items-center space-x-2">
          <img src="/optiextract-logo.png" alt="OptiExtract" className="h-9" />
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm text-gray-300">
          <a href="#home" className="hover:text-white transition">Home</a>
          <a href="#about" className="hover:text-white transition">About Us</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>

        <div className="flex items-center space-x-3">
          <Link to="/auth/login" className="text-sm text-gray-300 hover:text-white">
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="px-4 py-2 text-sm bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA] transition flex items-center space-x-1"
          >
            <span>Sign Up</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1">

        {/* ---------------- HERO SECTION ---------------- */}
        <section id="home" className="relative px-6 md:px-12 pt-16 md:pt-24 pb-20 overflow-hidden">
          <AnimatedBackgroundBlobs />

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">

            {/* LEFT SIDE */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 text-[11px] text-purple-200 mb-4"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2" />
                AI-first document intelligence
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
              >
                Extract data from documents
                <span className="text-[#A855F7] block">10× faster with AI.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="mt-4 text-sm md:text-base text-gray-300 max-w-xl"
              >
                OptiExtract turns invoices, receipts, contracts and more into
                clean, structured data. No more manual typing or copy-paste.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1 }}
                className="mt-7 flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/auth/signup"
                  className="px-6 py-3 bg-[#A855F7] text-white rounded-xl text-sm md:text-base hover:bg-[#9333EA] transition flex items-center space-x-2"
                >
                  <span>Get started free</span>
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/auth/login"
                  className="px-6 py-3 border border-white/20 text-gray-200 rounded-xl hover:bg-white/5 transition"
                >
                  Go to dashboard
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.3 }}
                className="mt-3 text-[11px] text-gray-500"
              >
                No credit card required · Built for teams · Secure by design
              </motion.p>
            </div>

            {/* RIGHT PREVIEW CARD */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-[11px] text-gray-400">Current document</p>
                    <p className="text-sm font-semibold text-white">
                      Invoice_Feb_2025.pdf
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px]">
                    Extracted
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <PreviewField label="Invoice Number" value="INV-00912" />
                  <PreviewField label="Invoice Date" value="2025-02-08" />
                  <PreviewField label="Total Amount" value="$1,250.00" />
                  <PreviewField label="Vendor Name" value="ACME Supplies Ltd." />
                </div>

                <div className="mt-5 border-t border-white/10 pt-4 flex items-center justify-between text-[11px] text-gray-300">
                  <span>AI confidence: 98.4%</span>
                  <span className="text-purple-300">View in dashboard →</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* LOGO STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-16 max-w-5xl mx-auto relative z-10"
          >
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] text-center mb-4">
              Trusted by teams who hate manual data entry
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-xs md:text-sm text-gray-300">
              {logos.map((logo, i) => (
                <div
                  key={i}
                  className="px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur"
                >
                  {logo}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ---------------- FEATURES SECTION ---------------- */}
        <section className="px-6 md:px-12 py-14 border-t border-white/10 bg-[#050716]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Built for document-heavy teams
            </h2>
            <p className="text-sm md:text-base text-gray-400 mb-8 max-w-xl">
              Finance, logistics, legal, and operations teams use OptiExtract to
              convert messy PDFs into structured clean data.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Zap size={24} className="text-[#A855F7]" />}
                title="Lightning-fast extraction"
                desc="Upload any PDF or image and get structured data in seconds."
              />
              <FeatureCard
                icon={<ScanLine size={24} className="text-[#A855F7]" />}
                title="Visual Review"
                desc="Review extracted data with bounding boxes mapped to fields."
              />
              <FeatureCard
                icon={<Sparkles size={24} className="text-[#A855F7]" />}
                title="Smart Templates"
                desc="Save templates to automate recurring document formats."
              />
            </div>
          </div>
        </section>

        {/* ---------------- ABOUT SECTION ---------------- */}
        <section id="about" className="px-6 md:px-12 py-16 border-t border-white/10 bg-[#050716]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                About OptiExtract
              </h2>
              <p className="text-sm md:text-base text-gray-300 mb-3">
                OptiExtract eliminates manual document processing forever.
              </p>
              <p className="text-sm md:text-base text-gray-400">
                Whether processing hundreds of invoices or validating legal files,
                OptiExtract adapts to your workflow.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center mb-3">
                <Users className="text-[#A855F7] mr-2" size={22} />
                <span className="font-medium text-sm">Teams we empower</span>
              </div>
              <ul className="text-xs md:text-sm text-gray-300 space-y-2">
                <li>• Finance teams — automate invoices</li>
                <li>• Logistics teams — verify documents</li>
                <li>• Legal teams — review contracts faster</li>
                <li>• Operations — eliminate admin work</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------- SECURITY SECTION ---------------- */}
        <section id="security" className="px-6 md:px-12 py-16 border-t border-white/10 bg-[#050716]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                Security built in from day one.
              </h2>
              <p className="text-sm md:text-base text-gray-300 mb-4">
                Your documents are sensitive. We treat them with enterprise-grade security.
              </p>

              <ul className="space-y-2 text-xs md:text-sm text-gray-300 list-disc list-inside">
                <li>Encrypted in transit and at rest</li>
                <li>Authentication via JWT</li>
                <li>Audit logs for accountability</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-gray-200">
              <div className="flex items-center mb-3">
                <ShieldCheck className="text-emerald-400 mr-2" size={20} />
                <span className="font-medium text-sm">Security snapshot</span>
              </div>
              <div className="space-y-2 text-xs text-gray-300">
                <p>• Strict document isolation</p>
                <p>• Role-based access</p>
                <p>• Auto-expiring tokens</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- CONTACT SECTION ---------------- */}
        <section id="contact" className="px-6 md:px-12 py-16 border-t border-white/10 bg-[#050716]">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

            {/* CONTACT TEXT */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-3">Contact Us</h2>
              <p className="text-sm md:text-base text-gray-300 mb-4">
                Have questions or need support? We’re here to help.
              </p>

              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Mail className="text-[#A855F7]" size={18} />
                  <span>support@optiextract.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="text-[#A855F7]" size={18} />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>

            {/* CONTACT FORM */}
            <form className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-2 bg-black/20 border border-white/15 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 bg-black/20 border border-white/15 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
              />
              <textarea
                rows={4}
                placeholder="Message"
                className="w-full px-3 py-2 bg-black/20 border border-white/15 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
              ></textarea>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#A855F7] text-white rounded-lg text-sm hover:bg-[#9333EA] transition"
              >
                Send Message
              </button>
            </form>

          </div>
        </section>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="py-6 border-t border-white/10 text-center text-xs text-gray-500 bg-[#050716]">
        © {new Date().getFullYear()} OptiExtract. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

/* ------------------------------------ */
/* --- REUSABLE COMPONENTS (TSX) ------ */
/* ------------------------------------ */

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
  >
    <div className="mb-3">{icon}</div>
    <h3 className="text-sm md:text-base font-semibold mb-1">{title}</h3>
    <p className="text-xs md:text-sm text-gray-300">{desc}</p>
  </motion.div>
);

interface PreviewFieldProps {
  label: string;
  value: string;
}

const PreviewField: React.FC<PreviewFieldProps> = ({ label, value }) => (
  <div className="bg-white/5 rounded-lg px-3 py-2">
    <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
    <p className="text-xs text-white mt-1 truncate">{value}</p>
  </div>
);

const AnimatedBackgroundBlobs: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-10 w-72 h-72 bg-[#A855F7] rounded-full blur-3xl opacity-30"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-40 -right-16 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-25"
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-120px] left-1/3 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-10"
        animate={{ x: [0, 15, 0], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />
    </div>
  );
};
