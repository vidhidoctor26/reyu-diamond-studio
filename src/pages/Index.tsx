import { Diamond, Shield, ArrowRight, TrendingUp, Users, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PremiumCard, GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Hero Section with emotional storytelling
function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[hsl(262_70%_55%/0.08)] rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
      
      {/* Diamond sparkle decorations */}
      <DiamondSparkle className="absolute top-32 left-1/4 w-2 h-2" delay={0} />
      <DiamondSparkle className="absolute top-48 right-1/3 w-3 h-3" delay={0.5} />
      <DiamondSparkle className="absolute bottom-40 left-1/3 w-2 h-2" delay={1} />
      <DiamondSparkle className="absolute top-1/3 right-1/4 w-2 h-2" delay={1.5} />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 mb-8 animate-fade-in">
          <Badge variant="premium" className="px-4 py-1.5">
            <Shield className="w-3.5 h-3.5 mr-1.5" />
            Secure & Trusted Platform
          </Badge>
        </div>
        
        {/* Main headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="block text-foreground">The Future of</span>
          <span className="block gradient-text mt-2">Diamond Trading</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Experience a new era of transparency, trust, and elegance in the global diamond marketplace. 
          Where every transaction is secure, and every diamond tells a story.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Button variant="premium" size="xl" asChild>
            <Link to="/marketplace">
              Explore Marketplace
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/listings">
              Start Selling
            </Link>
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <TrustIndicator icon={<Users className="w-5 h-5" />} value="2,500+" label="Active Traders" />
          <TrustIndicator icon={<Diamond className="w-5 h-5" />} value="15,000+" label="Diamonds Listed" />
          <TrustIndicator icon={<Shield className="w-5 h-5" />} value="$50M+" label="Secured Transactions" />
        </div>
      </div>
    </section>
  );
}

// Diamond sparkle animation component
function DiamondSparkle({ className, delay }: { className?: string; delay: number }) {
  return (
    <div 
      className={`bg-accent/60 rounded-full animate-sparkle ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

// Trust indicator component
function TrustIndicator({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground">
      <div className="p-2 rounded-lg bg-accent/10 text-accent">
        {icon}
      </div>
      <div className="text-left">
        <div className="text-lg font-semibold text-foreground">{value}</div>
        <div className="text-sm">{label}</div>
      </div>
    </div>
  );
}

// Value Propositions Section
function ValuePropsSection() {
  const propositions = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Escrow",
      description: "Every transaction is protected with our industry-leading escrow system. Trade with complete peace of mind.",
    },
    {
      icon: <Diamond className="w-8 h-8" />,
      title: "Verified Inventory",
      description: "All diamonds are authenticated and graded. What you see is exactly what you get.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Market Insights",
      description: "Stay ahead with real-time pricing trends and market analytics to make informed decisions.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Premium Experience",
      description: "A refined platform built for professionals who value quality, clarity, and efficiency.",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Why Choose Reyu</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for Trust, Designed for Excellence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've reimagined diamond trading with the security, transparency, and elegance that professionals deserve.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {propositions.map((prop, index) => (
            <PremiumCard 
              key={prop.title}
              className="p-8 text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6">
                {prop.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 font-serif">{prop.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{prop.description}</p>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Create Your Account",
      description: "Sign up in minutes and complete verification to unlock full trading capabilities.",
    },
    {
      step: "02",
      title: "List or Browse",
      description: "Add your inventory with detailed specifications or explore the marketplace for opportunities.",
    },
    {
      step: "03",
      title: "Connect & Negotiate",
      description: "Communicate securely with verified traders and negotiate with confidence.",
    },
    {
      step: "04",
      title: "Complete Securely",
      description: "Finalize deals through our escrow system for guaranteed safe transactions.",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Simple Process</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trade with Confidence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process makes diamond trading straightforward, secure, and efficient.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Connection line */}
          <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20 hidden lg:block" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.step}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-2xl font-bold text-accent shadow-soft mx-auto mb-6">
                  {step.step}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 font-serif">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Social Proof / Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Reyu has transformed how we manage our diamond inventory. The transparency and security are unmatched.",
      author: "Sarah Chen",
      role: "Diamond Trader, Hong Kong",
      avatar: "SC",
    },
    {
      quote: "Finally, a platform that understands what professionals need. Clean, fast, and incredibly reliable.",
      author: "Marcus Webb",
      role: "Gemstone Dealer, New York",
      avatar: "MW",
    },
    {
      quote: "The escrow system gives us complete peace of mind. Every transaction feels safe and professional.",
      author: "Elena Rossi",
      role: "Jewelry Designer, Milan",
      avatar: "ER",
    },
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Join thousands of professionals who have made Reyu their platform of choice.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <GlassCard 
              key={testimonial.author}
              className="p-8 bg-primary-foreground/5 border-primary-foreground/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 text-warning fill-warning" />
                ))}
              </div>
              <p className="text-primary-foreground/90 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-primary-foreground/60">{testimonial.role}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-[hsl(262_70%_55%/0.05)]" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[hsl(262_70%_55%/0.1)] rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 text-center">
        <Diamond className="w-16 h-16 text-accent mx-auto mb-8 animate-float" />
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Elevate Your Trading?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
          Join Reyu Diamond today and experience the future of secure, transparent, and elegant diamond trading.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="premium" size="xl" asChild>
            <Link to="/marketplace">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            Free to join
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            Verified community
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Diamond className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold font-serif">Reyu Diamond</span>
          </div>
          
          <nav className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link to="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
            <Link to="/listings" className="hover:text-foreground transition-colors">Listings</Link>
            <Link to="/inventory" className="hover:text-foreground transition-colors">Inventory</Link>
            <Link to="/profile" className="hover:text-foreground transition-colors">Profile</Link>
          </nav>
          
          <div className="text-sm text-muted-foreground">
            © 2024 Reyu Diamond. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Index/Homepage Component
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ValuePropsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
