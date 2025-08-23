import Calculator from '@/components/Calculator';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    document.title = 'Modern Calculator - Fast & Beautiful Calculator App';
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Calculator
          </h1>
          <p className="text-muted-foreground">
            Modern & intuitive calculator with beautiful design
          </p>
        </header>
        <Calculator />
      </div>
    </main>
  );
};

export default Index;
