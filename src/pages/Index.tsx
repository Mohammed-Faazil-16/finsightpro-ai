import { useState } from 'react';
import { Home } from './Home';
import { Result } from './Result';
import { FinancialForm } from '@/components/FinancialForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home as HomeIcon } from 'lucide-react';

type AppState = 'home' | 'form' | 'results';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [userData, setUserData] = useState<any>(null);

  const handleGetStarted = () => {
    setCurrentState('form');
  };

  const handleFormSubmit = (data: any) => {
    setUserData(data);
    setCurrentState('results');
  };

  const handleBackToForm = () => {
    setCurrentState('form');
  };

  const handleStartOver = () => {
    setUserData(null);
    setCurrentState('home');
  };

  const handleGoHome = () => {
    setCurrentState('home');
  };

  // Navigation Header (only shown on form and results pages)
  const NavigationHeader = () => {
    if (currentState === 'home') return null;

    return (
      <div className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={handleGoHome}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <HomeIcon className="w-4 h-4" />
                FinSight Pro
              </Button>
              {currentState === 'results' && (
                <>
                  <span className="text-muted-foreground">/</span>
                  <Button 
                    variant="ghost" 
                    onClick={handleBackToForm}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Assessment
                  </Button>
                </>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentState === 'form' && 'Financial Assessment'}
              {currentState === 'results' && 'Analysis Results'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {currentState === 'home' && (
        <Home onGetStarted={handleGetStarted} />
      )}
      
      {currentState === 'form' && (
        <div className="container mx-auto px-4 py-12">
          <FinancialForm onSubmit={handleFormSubmit} />
        </div>
      )}
      
      {currentState === 'results' && userData && (
        <Result 
          userData={userData} 
          onBack={handleBackToForm}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
};

export default Index;
