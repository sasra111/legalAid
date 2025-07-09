import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Search,
  Users,
  FileText,
  Briefcase,
  MessageCircle,
  Clock,
  Star,
  ArrowRight,
  UserCheck,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    title: "Legal Intake",
    description:
      "Collect and organize client and case data automatically for efficient onboarding.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
    title: "Consultation Scheduling",
    description:
      "Allow clients to schedule consultations and communicate with lawyers easily.",
  },
  {
    icon: <Search className="h-8 w-8 text-blue-600" />,
    title: "Case Law Search Engine",
    description:
      "AI-powered search for statutes, precedents, and legal commentary.",
  },
  {
    icon: <Calendar className="h-8 w-8 text-blue-600" />,
    title: "Calendar",
    description:
      "Track upcoming dates, deadlines, and case events in one place.",
  },
  {
    icon: <Briefcase className="h-8 w-8 text-blue-600" />,
    title: "Case Tracker & Management",
    description:
      "Timeline for each case, including documents, notes, and assigned lawyers.",
  },
];

const howItWorks = [
  {
    icon: <UserCheck className="h-10 w-10 text-blue-600" />,
    title: "Sign Up & Onboard",
    description:
      "Create your account and import your existing cases in minutes.",
  },
  {
    icon: <FileText className="h-10 w-10 text-blue-600" />,
    title: "Automate & Organize",
    description:
      "Let LegalAid handle intake, scheduling, and document management.",
  },
  {
    icon: <Clock className="h-10 w-10 text-blue-600" />,
    title: "Grow & Succeed",
    description:
      "Focus on your clients while LegalAid streamlines your workflow.",
  },
];

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const elements = document.querySelectorAll(".fade-in-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 flex flex-col">
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(1deg);
          }
          66% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .shimmer-bg {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Navbar */}
      <header className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-gray-200/50 bg-white/80 backdrop-blur-xl sticky top-0 z-20 shadow-sm transition-all duration-300">
        <div className="flex items-center space-x-2 sm:space-x-3 group">
          <div className="p-2 bg-blue-600 rounded-xl shadow-lg group-hover:shadow-blue-300/50 transition-all duration-300 animate-pulse-glow">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent relative">
            LegalAid
            <div className="absolute inset-0 shimmer-bg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </span>
        </div>
        <div className="space-x-1 sm:space-x-2 flex items-center">
          <Button
            variant="ghost"
            className="hidden md:inline-block text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-all duration-300 hover:scale-105"
          >
            Features
          </Button>
          <Button
            variant="ghost"
            className="hidden md:inline-block text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-all duration-300 hover:scale-105"
          >
            Pricing
          </Button>
          <Button
            variant="ghost"
            className="hidden md:inline-block text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-all duration-300 hover:scale-105"
          >
            Contact
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-4 sm:px-6 hover:scale-105 animate-pulse-glow text-sm sm:text-base">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex flex-1 flex-col items-center justify-center text-center px-2 sm:px-4 py-16 sm:py-24 md:py-32 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-56 sm:w-96 h-56 sm:h-96 bg-blue-200/30 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-0 right-1/4 w-56 sm:w-96 h-56 sm:h-96 bg-purple-200/30 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-40 sm:w-64 h-40 sm:h-64 bg-indigo-200/20 rounded-full blur-2xl animate-float"
            style={{ animationDelay: "4s" }}
          />

          {/* Floating Icons */}
          <Sparkles
            className="absolute top-10 sm:top-20 left-10 sm:left-20 h-5 sm:h-6 w-5 sm:w-6 text-blue-400/40 animate-float"
            style={{ animationDelay: "1s" }}
          />
          <Zap
            className="absolute top-24 sm:top-40 right-16 sm:right-32 h-4 sm:h-5 w-4 sm:w-5 text-purple-400/40 animate-float"
            style={{ animationDelay: "3s" }}
          />
          <Shield
            className="absolute bottom-16 sm:bottom-32 left-16 sm:left-32 h-6 sm:h-7 w-6 sm:w-7 text-indigo-400/40 animate-float"
            style={{ animationDelay: "5s" }}
          />
        </div>

        <div className="max-w-2xl sm:max-w-4xl mx-auto fade-in-on-scroll">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 bg-clip-text text-transparent animate-fade-in-up">
              Modern Legal Practice,{" "}
            </span>
            <span
              className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent drop-shadow-sm animate-fade-in-up block"
              style={{ animationDelay: "0.2s" }}
            >
              Simplified
            </span>
          </h1>
          <p
            className="max-w-xl mx-auto text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600 mb-2 sm:mb-4 font-medium leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Legal management for the next generation of law firms.
          </p>
          <p
            className="max-w-xl mx-auto text-sm xs:text-base sm:text-lg md:text-xl text-gray-500 mb-8 sm:mb-12 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            LegalAid streamlines your workflow with AI-powered tools for intake,
            scheduling, research, and case management—so you can focus on what
            matters most: your clients.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="px-6 sm:px-12 py-4 sm:py-6 text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl shadow-2xl hover:shadow-3xl flex items-center gap-2 sm:gap-3 transition-all duration-500 hover:scale-110 animate-fade-in-up group animate-pulse-glow"
              style={{ animationDelay: "0.8s" }}
            >
              Get Started for Free
              <ArrowRight className="h-5 sm:h-6 w-5 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        ref={howItWorksRef}
        className="py-12 sm:py-20 px-2 sm:px-4 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-3xl sm:max-w-6xl mx-auto">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 sm:mb-16 bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent fade-in-on-scroll">
            How It Works
          </h2>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {howItWorks.map((step, idx) => (
              <div
                key={idx}
                className="fade-in-on-scroll group relative bg-white/70 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -top-2 -right-2 w-3 sm:w-4 h-3 sm:h-4 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-100 rounded-2xl group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    {step.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="bg-gradient-to-br from-gray-50 to-blue-50 py-12 sm:py-24 px-2 sm:px-4 relative overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: "float 20s ease-in-out infinite",
            }}
          />
        </div>

        <div className="max-w-4xl lg:max-w-7xl mx-auto relative z-10">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 sm:mb-20 bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent fade-in-on-scroll">
            Features
          </h2>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="fade-in-on-scroll group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-100 rounded-2xl group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 sm:py-24 px-2 sm:px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent animate-float" />
        <div className="max-w-xl sm:max-w-4xl mx-auto text-center relative z-10 fade-in-on-scroll">
          <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-blue-100 rounded-full inline-block animate-pulse-glow">
            <Star className="h-8 sm:h-12 w-8 sm:w-12 text-blue-600" />
          </div>
          <blockquote className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 text-gray-800 leading-relaxed italic">
            "LegalAid has transformed the way our firm operates. Intake is
            seamless, research is lightning fast, and our clients are happier
            than ever."
          </blockquote>
          <div className="flex flex-col items-center">
            <span className="font-bold text-base sm:text-xl text-gray-900">
              Alex Morgan
            </span>
            <span className="text-blue-600 font-medium text-sm sm:text-base">
              Partner, Morgan & Co. Law
            </span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-24 px-2 sm:px-4 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-700/90" />
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0 animate-float"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-xl sm:max-w-3xl mx-auto text-center relative z-10 fade-in-on-scroll">
          <h3 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-white">
            Ready to transform your legal practice?
          </h3>
          <p className="mb-8 sm:mb-12 text-blue-100 text-base sm:text-xl leading-relaxed">
            Join LegalAid today and experience the future of legal management.
          </p>
          <Button
            size="lg"
            className="px-6 sm:px-12 py-4 sm:py-6 text-base sm:text-xl font-bold bg-white hover:bg-gray-50 text-blue-700 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow group"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 sm:h-6 w-5 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 sm:py-12 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-2xl sm:max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 px-2 sm:px-4">
          <div className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              LegalAid
            </span>
            . All rights reserved.
          </div>
          <div className="flex gap-4 sm:gap-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 text-sm sm:text-base"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 text-sm sm:text-base"
            >
              Pricing
            </a>
            <a
              href="mailto:contact@legalaid.com"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 text-sm sm:text-base"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
