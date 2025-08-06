import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Globe, 
  Newspaper,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

export const MarketInsights = () => {
  const marketData = [
    {
      symbol: 'S&P 500',
      price: '4,785.23',
      change: '+0.84%',
      changeValue: '+39.87',
      trend: 'up'
    },
    {
      symbol: 'NASDAQ',
      price: '15,347.90',
      change: '+1.12%',
      changeValue: '+169.30',
      trend: 'up'
    },
    {
      symbol: 'DOW JONES',
      price: '37,689.54',
      change: '+0.45%',
      changeValue: '+168.59',
      trend: 'up'
    },
    {
      symbol: 'VIX',
      price: '13.45',
      change: '-2.34%',
      changeValue: '-0.32',
      trend: 'down'
    }
  ];

  const newsArticles = [
    {
      title: 'Fed Signals Potential Rate Cuts in 2024',
      summary: 'Federal Reserve officials hint at possible interest rate reductions as inflation shows signs of cooling.',
      source: 'Financial Times',
      time: '2 hours ago',
      impact: 'Positive'
    },
    {
      title: 'Tech Sector Shows Strong Earnings Growth',
      summary: 'Major technology companies report better-than-expected quarterly earnings, driving market optimism.',
      source: 'Wall Street Journal',
      time: '4 hours ago',
      impact: 'Positive'
    },
    {
      title: 'Global Markets React to Geopolitical Tensions',
      summary: 'International markets show mixed reactions to ongoing geopolitical developments in key regions.',
      source: 'Reuters',
      time: '6 hours ago',
      impact: 'Neutral'
    }
  ];

  const sectorPerformance = [
    { name: 'Technology', performance: '+2.45%', trend: 'up' },
    { name: 'Healthcare', performance: '+1.78%', trend: 'up' },
    { name: 'Financials', performance: '+0.92%', trend: 'up' },
    { name: 'Energy', performance: '-0.34%', trend: 'down' },
    { name: 'Real Estate', performance: '-0.89%', trend: 'down' },
    { name: 'Utilities', performance: '+0.12%', trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      {/* Market Indices */}
      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              Market Overview
            </CardTitle>
            <CardDescription>Real-time market indices and performance</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketData.map((market, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{market.symbol}</span>
                  {market.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold">{market.price}</div>
                  <div className={`text-sm ${
                    market.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    {market.change} ({market.changeValue})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sector Performance */}
      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent" />
            Sector Performance
          </CardTitle>
          <CardDescription>Today's sector leaders and laggards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sectorPerformance.map((sector, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  {sector.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <span className="font-medium">{sector.name}</span>
                </div>
                <span className={`font-bold ${
                  sector.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  {sector.performance}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market News */}
      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-accent" />
            Market News
          </CardTitle>
          <CardDescription>Latest financial news and analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newsArticles.map((article, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 transition-[var(--transition-all)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium line-clamp-1">{article.title}</h4>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          article.impact === 'Positive' ? 'bg-success text-success-foreground' :
                          article.impact === 'Negative' ? 'bg-destructive text-destructive-foreground' :
                          'bg-muted'
                        }`}
                      >
                        {article.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {article.source} • {article.time}
                      </span>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};