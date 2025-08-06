import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Shield, 
  PieChart,
  Download,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

interface DashboardProps {
  userData: any;
}

export const Dashboard = ({ userData }: DashboardProps) => {
  // Mock analysis results based on user input
  const riskLevel = userData.riskTolerance?.[0] || 5;
  const investmentAmount = parseInt(userData.investmentAmount) || 0;
  const income = parseInt(userData.income) || 0;
  
  const riskProfile = riskLevel <= 3 ? 'Conservative' : riskLevel <= 7 ? 'Moderate' : 'Aggressive';
  const investmentRatio = (investmentAmount / income * 100).toFixed(1);

  const recommendations = [
    {
      name: 'Diversified Index Fund Portfolio',
      allocation: riskLevel <= 4 ? '70% Bonds, 30% Stocks' : riskLevel <= 7 ? '50% Bonds, 50% Stocks' : '20% Bonds, 80% Stocks',
      expectedReturn: riskLevel <= 4 ? '6-8%' : riskLevel <= 7 ? '8-10%' : '10-12%',
      risk: riskProfile,
      score: 95,
      description: 'Broad market exposure with low fees',
      color: 'bg-accent'
    },
    {
      name: 'Target-Date Fund',
      allocation: '90% Stocks, 10% Bonds',
      expectedReturn: '9-11%',
      risk: 'Moderate',
      score: 88,
      description: 'Automatically adjusts allocation as you age',
      color: 'bg-primary'
    },
    {
      name: 'ESG Focused Portfolio',
      allocation: '60% Stocks, 40% Bonds',
      expectedReturn: '7-9%',
      risk: 'Moderate',
      score: 82,
      description: 'Socially responsible investing approach',
      color: 'bg-success'
    }
  ];

  const portfolioMetrics = [
    { label: 'Risk Score', value: riskLevel, max: 10, color: 'text-warning' },
    { label: 'Diversification', value: 8.5, max: 10, color: 'text-success' },
    { label: 'Cost Efficiency', value: 9.2, max: 10, color: 'text-accent' },
    { label: 'Tax Efficiency', value: 7.8, max: 10, color: 'text-primary' }
  ];

  const marketInsights = [
    {
      title: 'S&P 500 Performance',
      value: '+12.4%',
      change: '+2.1%',
      trend: 'up',
      description: 'Year-to-date performance'
    },
    {
      title: 'Bond Market',
      value: '+4.2%',
      change: '-0.3%',
      trend: 'down',
      description: 'Treasury yields rising'
    },
    {
      title: 'Inflation Rate',
      value: '3.2%',
      change: '-0.1%',
      trend: 'down',
      description: 'Monthly decrease'
    }
  ];

  const alerts = [
    {
      type: 'info',
      title: 'Portfolio Rebalancing',
      message: 'Consider rebalancing your portfolio quarterly',
      icon: Info
    },
    {
      type: 'warning',
      title: 'Emergency Fund',
      message: userData.emergencyFund === 'none' ? 'Build emergency fund before investing' : 'Emergency fund status looks good',
      icon: userData.emergencyFund === 'none' ? AlertTriangle : CheckCircle
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Your Investment Dashboard
        </h2>
        <p className="text-muted-foreground mt-2">
          Personalized recommendations based on your financial profile
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Investment Amount</p>
                <p className="text-2xl font-bold text-foreground">${investmentAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Risk Profile</p>
                <p className="text-2xl font-bold text-foreground">{riskProfile}</p>
              </div>
              <Shield className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Investment Ratio</p>
                <p className="text-2xl font-bold text-foreground">{investmentRatio}%</p>
              </div>
              <PieChart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time Horizon</p>
                <p className="text-2xl font-bold text-foreground">{userData.timeHorizon || 'Long'}</p>
              </div>
              <Target className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Recommendations */}
      <Card className="border-border shadow-[var(--shadow-elevated)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Recommended Investment Strategies
          </CardTitle>
          <CardDescription>Tailored to your risk profile and investment goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <Card key={index} className="border-border relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${rec.color}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rec.name}</CardTitle>
                    <Badge variant="secondary" className="bg-accent-light text-accent-foreground">
                      Score: {rec.score}
                    </Badge>
                  </div>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Allocation</span>
                      <span className="text-sm font-medium">{rec.allocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Expected Return</span>
                      <span className="text-sm font-medium text-success">{rec.expectedReturn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Risk Level</span>
                      <span className="text-sm font-medium">{rec.risk}</span>
                    </div>
                  </div>
                  <Progress value={rec.score} className="h-2" />
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Analysis & Market Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Metrics */}
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>Portfolio Analysis</CardTitle>
            <CardDescription>Key performance indicators for your investment strategy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {portfolioMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <span className={`text-sm font-bold ${metric.color}`}>
                    {metric.value}/{metric.max}
                  </span>
                </div>
                <Progress value={(metric.value / metric.max) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Insights */}
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>Market Insights</CardTitle>
            <CardDescription>Current market conditions and trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {marketInsights.map((insight, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  {insight.trend === 'up' ? (
                    <TrendingUp className="w-5 h-5 text-success" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  )}
                  <div>
                    <p className="font-medium">{insight.title}</p>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{insight.value}</p>
                  <p className={`text-sm ${insight.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {insight.change}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>Important Alerts</CardTitle>
            <CardDescription>Action items and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${
                alert.type === 'warning' ? 'bg-warning/10' : 'bg-accent-light/50'
              }`}>
                <alert.icon className={`w-5 h-5 mt-0.5 ${
                  alert.type === 'warning' ? 'text-warning' : 'text-accent'
                }`} />
                <div>
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Generate reports and access tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Investment Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <PieChart className="w-4 h-4 mr-2" />
              Portfolio Allocation Tool
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Risk Assessment Quiz
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <TrendingUp className="w-4 h-4 mr-2" />
              Start Investing Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};