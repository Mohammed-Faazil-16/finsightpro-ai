import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Target, DollarSign, Calendar, Shield } from 'lucide-react';

interface FinancialFormData {
  age: string;
  income: string;
  investmentAmount: string;
  timeHorizon: string;
  riskTolerance: number[];
  goals: string;
  experience: string;
  currentPortfolio: string;
  emergencyFund: string;
  debtStatus: string;
}

interface FinancialFormProps {
  onSubmit: (data: FinancialFormData) => void;
}

export const FinancialForm = ({ onSubmit }: FinancialFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FinancialFormData>({
    age: '',
    income: '',
    investmentAmount: '',
    timeHorizon: '',
    riskTolerance: [5],
    goals: '',
    experience: '',
    currentPortfolio: '',
    emergencyFund: '',
    debtStatus: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.age || !formData.income || !formData.investmentAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Analysis Started",
      description: "Analyzing your financial profile...",
    });

    onSubmit(formData);
  };

  const updateFormData = (field: keyof FinancialFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Financial Profile Assessment
        </h2>
        <p className="text-muted-foreground mt-2">
          Help us understand your financial situation to provide personalized investment recommendations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-accent" />
              Personal Information
            </CardTitle>
            <CardDescription>Basic details about your current situation</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={formData.age}
                onChange={(e) => updateFormData('age', e.target.value)}
                className="transition-[var(--transition-all)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="income">Annual Income (USD) *</Label>
              <Input
                id="income"
                type="number"
                placeholder="75000"
                value={formData.income}
                onChange={(e) => updateFormData('income', e.target.value)}
                className="transition-[var(--transition-all)]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Investment Details */}
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Investment Details
            </CardTitle>
            <CardDescription>Tell us about your investment preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="investment-amount">Investment Amount (USD) *</Label>
                <Input
                  id="investment-amount"
                  type="number"
                  placeholder="10000"
                  value={formData.investmentAmount}
                  onChange={(e) => updateFormData('investmentAmount', e.target.value)}
                  className="transition-[var(--transition-all)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-horizon">Investment Time Horizon</Label>
                <Select onValueChange={(value) => updateFormData('timeHorizon', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time frame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short-term (1-3 years)</SelectItem>
                    <SelectItem value="medium">Medium-term (3-7 years)</SelectItem>
                    <SelectItem value="long">Long-term (7+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Risk Tolerance: {formData.riskTolerance[0]}/10</Label>
              <div className="px-3">
                <Slider
                  value={formData.riskTolerance}
                  onValueChange={(value) => updateFormData('riskTolerance', value)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Conservative</span>
                <span>Moderate</span>
                <span>Aggressive</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Experience */}
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              Experience & Current Status
            </CardTitle>
            <CardDescription>Your investment background and current financial position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Investment Experience</Label>
              <RadioGroup 
                value={formData.experience} 
                onValueChange={(value) => updateFormData('experience', value)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="cursor-pointer">Beginner</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="cursor-pointer">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="cursor-pointer">Advanced</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="emergency-fund">Emergency Fund Status</Label>
                <Select onValueChange={(value) => updateFormData('emergencyFund', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No emergency fund</SelectItem>
                    <SelectItem value="partial">Partial (1-3 months)</SelectItem>
                    <SelectItem value="adequate">Adequate (3-6 months)</SelectItem>
                    <SelectItem value="excellent">Excellent (6+ months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="debt-status">Current Debt Status</Label>
                <Select onValueChange={(value) => updateFormData('debtStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select debt status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No debt</SelectItem>
                    <SelectItem value="low">Low debt (manageable)</SelectItem>
                    <SelectItem value="moderate">Moderate debt</SelectItem>
                    <SelectItem value="high">High debt (concerning)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals & Portfolio */}
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Goals & Current Portfolio
            </CardTitle>
            <CardDescription>Your investment objectives and existing holdings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="goals">Investment Goals</Label>
              <Textarea
                id="goals"
                placeholder="e.g., Retirement planning, house down payment, wealth building, education funding..."
                value={formData.goals}
                onChange={(e) => updateFormData('goals', e.target.value)}
                className="min-h-[100px] transition-[var(--transition-all)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-portfolio">Current Portfolio (Optional)</Label>
              <Textarea
                id="current-portfolio"
                placeholder="e.g., 50% stocks, 30% bonds, 20% cash; or specific investments you currently hold..."
                value={formData.currentPortfolio}
                onChange={(e) => updateFormData('currentPortfolio', e.target.value)}
                className="min-h-[80px] transition-[var(--transition-all)]"
              />
            </div>
          </CardContent>
        </Card>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent text-primary-foreground font-semibold py-6 transition-[var(--transition-all)]"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Analyze My Financial Profile
        </Button>
      </form>
    </div>
  );
};