import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  PieChart, 
  TrendingUp, 
  Shield, 
  DollarSign,
  BarChart3,
  Target,
  Zap,
  RefreshCw
} from 'lucide-react';

interface AssetAllocation {
  name: string;
  percentage: number;
  expectedReturn: number;
  risk: number;
  color: string;
}

export const PortfolioOptimizer = () => {
  const [investmentAmount, setInvestmentAmount] = useState(50000);
  const [riskTolerance, setRiskTolerance] = useState([6]);
  const [timeHorizon, setTimeHorizon] = useState([10]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const baseAllocations: AssetAllocation[] = [
    { name: 'US Stocks', percentage: 40, expectedReturn: 10.5, risk: 16, color: 'bg-accent' },
    { name: 'International Stocks', percentage: 20, expectedReturn: 9.8, risk: 18, color: 'bg-primary' },
    { name: 'Bonds', percentage: 25, expectedReturn: 4.2, risk: 4, color: 'bg-success' },
    { name: 'Real Estate', percentage: 10, expectedReturn: 8.5, risk: 14, color: 'bg-warning' },
    { name: 'Commodities', percentage: 5, expectedReturn: 6.8, risk: 22, color: 'bg-muted-foreground' }
  ];

  // Adjust allocations based on risk tolerance
  const getOptimizedAllocations = (): AssetAllocation[] => {
    const risk = riskTolerance[0];
    const horizon = timeHorizon[0];
    
    if (risk <= 3) { // Conservative
      return [
        { ...baseAllocations[0], percentage: 20 }, // US Stocks
        { ...baseAllocations[1], percentage: 10 }, // International
        { ...baseAllocations[2], percentage: 60 }, // Bonds
        { ...baseAllocations[3], percentage: 5 },  // Real Estate
        { ...baseAllocations[4], percentage: 5 }   // Commodities
      ];
    } else if (risk <= 7) { // Moderate
      return [
        { ...baseAllocations[0], percentage: 35 },
        { ...baseAllocations[1], percentage: 25 },
        { ...baseAllocations[2], percentage: 30 },
        { ...baseAllocations[3], percentage: 7 },
        { ...baseAllocations[4], percentage: 3 }
      ];
    } else { // Aggressive
      return [
        { ...baseAllocations[0], percentage: 50 },
        { ...baseAllocations[1], percentage: 30 },
        { ...baseAllocations[2], percentage: 10 },
        { ...baseAllocations[3], percentage: 7 },
        { ...baseAllocations[4], percentage: 3 }
      ];
    }
  };

  const optimizedAllocations = getOptimizedAllocations();

  const portfolioMetrics = {
    expectedReturn: optimizedAllocations.reduce((acc, asset) => 
      acc + (asset.percentage / 100) * asset.expectedReturn, 0
    ).toFixed(1),
    portfolioRisk: Math.sqrt(
      optimizedAllocations.reduce((acc, asset) => 
        acc + Math.pow(asset.percentage / 100, 2) * Math.pow(asset.risk, 2), 0
      )
    ).toFixed(1),
    sharpeRatio: (
      (optimizedAllocations.reduce((acc, asset) => 
        acc + (asset.percentage / 100) * asset.expectedReturn, 0
      ) - 2.5) / Math.sqrt(
        optimizedAllocations.reduce((acc, asset) => 
          acc + Math.pow(asset.percentage / 100, 2) * Math.pow(asset.risk, 2), 0
        )
      )
    ).toFixed(2)
  };

  const projectedValue = (investmentAmount * Math.pow(1 + parseFloat(portfolioMetrics.expectedReturn) / 100, timeHorizon[0])).toLocaleString();

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-border shadow-[var(--shadow-card)] bg-gradient-to-r from-accent-light/30 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-accent" />
            Portfolio Optimizer
          </CardTitle>
          <CardDescription>
            Optimize your portfolio allocation based on your risk tolerance and investment timeline
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Input Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-lg">Investment Parameters</CardTitle>
            <CardDescription>Adjust your investment preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="investment-amount">Investment Amount (USD)</Label>
              <Input
                id="investment-amount"
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(parseInt(e.target.value) || 0)}
                placeholder="50000"
              />
            </div>

            <div className="space-y-4">
              <Label>Risk Tolerance: {riskTolerance[0]}/10</Label>
              <Slider
                value={riskTolerance}
                onValueChange={setRiskTolerance}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Conservative</span>
                <span>Moderate</span>
                <span>Aggressive</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Time Horizon: {timeHorizon[0]} years</Label>
              <Slider
                value={timeHorizon}
                onValueChange={setTimeHorizon}
                max={30}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1 year</span>
                <span>15 years</span>
                <span>30 years</span>
              </div>
            </div>

            <Button 
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="w-full bg-gradient-to-r from-primary to-accent"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Optimize Portfolio
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Portfolio Metrics */}
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-success">{portfolioMetrics.expectedReturn}%</div>
                <div className="text-sm text-muted-foreground">Expected Return</div>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <Shield className="w-6 h-6 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-warning">{portfolioMetrics.portfolioRisk}%</div>
                <div className="text-sm text-muted-foreground">Portfolio Risk</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                <span className="font-medium">{portfolioMetrics.sharpeRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current Investment</span>
                <span className="font-medium">${investmentAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Projected Value ({timeHorizon[0]}y)</span>
                <span className="font-bold text-success">${projectedValue}</span>
              </div>
            </div>

            <div className="p-4 bg-accent-light/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-accent" />
                <span className="font-medium text-sm">Optimization Score</span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={85} className="flex-1" />
                <span className="font-bold text-accent">85/100</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Allocation */}
      <Card className="border-border shadow-[var(--shadow-elevated)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent" />
            Optimized Asset Allocation
          </CardTitle>
          <CardDescription>Recommended portfolio allocation based on your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Allocation Bars */}
            <div className="space-y-4">
              {optimizedAllocations.map((asset, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${asset.color}`} />
                      <span className="font-medium">{asset.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="text-xs">
                        {asset.expectedReturn}% return
                      </Badge>
                      <span className="font-bold">{asset.percentage}%</span>
                    </div>
                  </div>
                  <Progress value={asset.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Risk: {asset.risk}%</span>
                    <span>${((investmentAmount * asset.percentage) / 100).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Allocation Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <DollarSign className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-lg font-bold">${investmentAmount.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Investment</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
                <div className="text-lg font-bold">{optimizedAllocations.length}</div>
                <div className="text-sm text-muted-foreground">Asset Classes</div>
              </div>
              <div className="text-center">
                <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-lg font-bold">{timeHorizon[0]} years</div>
                <div className="text-sm text-muted-foreground">Time Horizon</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};