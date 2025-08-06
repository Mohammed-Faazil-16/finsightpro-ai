import { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { ReportCard } from '@/components/ReportCard';
import { Chatbot } from '@/components/Chatbot';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  FileText, 
  MessageCircle, 
  TrendingUp,
  Calendar,
  DollarSign,
  Target,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

interface ResultProps {
  userData: any;
  onBack: () => void;
  onStartOver: () => void;
}

export const Result = ({ userData, onBack, onStartOver }: ResultProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatMinimized, setIsChatMinimized] = useState(true);

  const analysisDate = new Date().toLocaleDateString();
  const riskLevel = userData.riskTolerance?.[0] || 5;
  const riskProfile = riskLevel <= 3 ? 'Conservative' : riskLevel <= 7 ? 'Moderate' : 'Aggressive';

  const summaryCards = [
    {
      title: 'Investment Amount',
      value: `$${parseInt(userData.investmentAmount || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-accent'
    },
    {
      title: 'Risk Profile',
      value: riskProfile,
      icon: BarChart3,
      color: 'text-warning'
    },
    {
      title: 'Time Horizon',
      value: userData.timeHorizon || 'Long-term',
      icon: Calendar,
      color: 'text-primary'
    },
    {
      title: 'Primary Goal',
      value: userData.goals ? userData.goals.split(',')[0].slice(0, 20) + '...' : 'Wealth Building',
      icon: Target,
      color: 'text-success'
    }
  ];

  const keyInsights = [
    {
      title: 'Portfolio Recommendation',
      description: `Based on your ${riskProfile.toLowerCase()} risk profile, we recommend a ${
        riskLevel <= 4 ? '70% bonds, 30% stocks' : 
        riskLevel <= 7 ? '50% bonds, 50% stocks' : 
        '20% bonds, 80% stocks'
      } allocation.`,
      impact: 'High'
    },
    {
      title: 'Expected Returns',
      description: `Your portfolio could generate ${
        riskLevel <= 4 ? '6-8%' : 
        riskLevel <= 7 ? '8-10%' : 
        '10-12%'
      } annual returns based on historical performance.`,
      impact: 'Medium'
    },
    {
      title: 'Risk Management',
      description: 'Diversification across asset classes and regular rebalancing will help manage volatility.',
      impact: 'High'
    },
    {
      title: 'Tax Optimization',
      description: 'Consider tax-advantaged accounts and tax-efficient fund selections to maximize after-tax returns.',
      impact: 'Medium'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Form
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Financial Analysis Results</h1>
                <p className="text-muted-foreground">Generated on {analysisDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-success text-success-foreground">
                Analysis Complete
              </Badge>
              <Button variant="outline" onClick={onStartOver} className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                New Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {summaryCards.map((card, index) => (
            <Card key={index} className="border-border shadow-[var(--shadow-card)]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                    <p className="text-xl font-bold text-foreground mt-1">{card.value}</p>
                  </div>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Insights */}
        <Card className="border-border shadow-[var(--shadow-card)] mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Key Insights
            </CardTitle>
            <CardDescription>Important findings from your financial analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyInsights.map((insight, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        insight.impact === 'High' ? 'bg-accent-light text-accent-foreground' : 'bg-muted'
                      }`}
                    >
                      {insight.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Report
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-2"
              onClick={() => setIsChatMinimized(false)}
            >
              <MessageCircle className="w-4 h-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard userData={userData} />
          </TabsContent>

          <TabsContent value="report" className="space-y-6">
            <ReportCard userData={userData} />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="border-border shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-accent" />
                  AI Financial Assistant
                </CardTitle>
                <CardDescription>
                  Ask questions about your analysis, get investment advice, or explore different scenarios
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[600px] relative">
                <div className="text-center py-20 text-muted-foreground">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">AI Assistant is ready to help!</p>
                  <p>Click the chat icon in the bottom right to start a conversation.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Chatbot */}
      <Chatbot 
        isMinimized={isChatMinimized} 
        onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)} 
      />
    </div>
  );
};