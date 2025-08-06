import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Shield, 
  Target, 
  Users, 
  Award, 
  Zap,
  BarChart3,
  Brain,
  ArrowRight,
  DollarSign,
  PieChart,
  LineChart
} from 'lucide-react';

interface HomeProps {
  onGetStarted: () => void;
}

export const Home = ({ onGetStarted }: HomeProps) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced algorithms analyze your financial profile and market conditions to provide personalized recommendations.',
      color: 'text-accent'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Comprehensive risk profiling to match investments with your comfort level and financial capacity.',
      color: 'text-warning'
    },
    {
      icon: Target,
      title: 'Goal-Based Planning',
      description: 'Tailored strategies aligned with your specific financial objectives and timeline.',
      color: 'text-success'
    },
    {
      icon: BarChart3,
      title: 'Portfolio Optimization',
      description: 'Data-driven portfolio allocation designed to maximize returns while managing risk.',
      color: 'text-primary'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Portfolio Value', value: '$2.3B', icon: DollarSign },
    { label: 'Avg Return', value: '12.4%', icon: TrendingUp },
    { label: 'Success Rate', value: '94%', icon: Award }
  ];

  const benefits = [
    'Personalized investment recommendations',
    'Real-time market analysis and insights',
    'Automated portfolio rebalancing suggestions',
    'Comprehensive risk assessment',
    'Tax-efficient investment strategies',
    'Goal-based financial planning'
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      content: 'FinSight Pro helped me build a diversified portfolio that fits my risk tolerance perfectly.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Business Owner',
      content: 'The AI recommendations are spot-on. My portfolio performance has improved significantly.',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'Teacher',
      content: 'Finally, investing advice that makes sense for my budget and goals. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-accent-light text-accent-foreground">
              🚀 AI-Powered Financial Intelligence
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Personal{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Investment
              </span>{' '}
              Assistant
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              FinSight Pro combines artificial intelligence with financial expertise to provide 
              personalized investment recommendations, risk analysis, and portfolio optimization 
              tailored to your unique goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg px-8 py-6 hover:shadow-lg transition-[var(--transition-all)]"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Free Analysis
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <LineChart className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-12 h-12 bg-accent-light rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Powered by{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Advanced AI
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our cutting-edge technology analyzes thousands of data points to provide 
              you with intelligent investment insights and recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className={`border-border shadow-[var(--shadow-card)] cursor-pointer transition-[var(--transition-all)] hover:shadow-[var(--shadow-elevated)] ${
                    activeFeature === index ? 'border-accent shadow-[var(--shadow-elevated)]' : ''
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-accent-light">
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:pl-8">
              <Card className="border-border shadow-[var(--shadow-elevated)] bg-gradient-to-br from-accent-light/30 to-primary/5">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="mx-auto w-20 h-20 bg-accent-light rounded-full flex items-center justify-center">
                      <PieChart className="w-10 h-10 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                      <p className="text-muted-foreground mb-6">
                        Join thousands of investors who trust FinSight Pro for their financial decisions.
                      </p>
                      <Button 
                        onClick={onGetStarted}
                        className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Start Your Analysis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Everything You Need for{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Smart Investing
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our comprehensive platform provides all the tools and insights you need 
                to make informed investment decisions and build wealth over time.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-border shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <div key={i} className="w-4 h-4 bg-accent rounded-full" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-border shadow-[var(--shadow-elevated)] bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Transform Your Financial Future?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join FinSight Pro today and start building wealth with AI-powered insights.
              </p>
              <Button 
                size="lg" 
                onClick={onGetStarted}
                variant="secondary"
                className="text-lg px-8 py-6 bg-background text-foreground hover:bg-background/90"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};