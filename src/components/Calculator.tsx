import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CalculatorState {
  display: string;
  expression: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
  showingResult: boolean;
}

const Calculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    expression: '',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
    showingResult: false,
  });

  const inputNumber = (num: string) => {
    const { display, waitingForOperand, expression, showingResult, previousValue, operation } = state;

    if (showingResult) {
      // Start fresh after showing a result
      setState({
        ...state,
        display: num,
        expression: num,
        previousValue: null,
        operation: null,
        waitingForOperand: false,
        showingResult: false,
      });
    } else if (waitingForOperand) {
      // We're waiting for the second number after an operation
      setState({
        ...state,
        display: num,
        expression: expression + num,
        waitingForOperand: false,
      });
    } else if (previousValue !== null && operation) {
      // We're building the second number (continuing after first digit)
      const newDisplay = display === '0' ? num : display + num;
      const newExpression = expression + num;
      setState({
        ...state,
        display: newDisplay,
        expression: newExpression,
      });
    } else {
      // Building the first number
      const newDisplay = display === '0' ? num : display + num;
      setState({
        ...state,
        display: newDisplay,
        expression: newDisplay,
      });
    }
  };

  const inputDecimal = () => {
    const { display, waitingForOperand, expression, showingResult, previousValue, operation } = state;

    if (showingResult) {
      setState({
        ...state,
        display: '0.',
        expression: '0.',
        previousValue: null,
        operation: null,
        waitingForOperand: false,
        showingResult: false,
      });
    } else if (waitingForOperand) {
      setState({
        ...state,
        display: '0.',
        expression: expression + '0.',
        waitingForOperand: false,
      });
    } else if (display.indexOf('.') === -1) {
      const newDisplay = display + '.';
      if (previousValue !== null && operation) {
        // We're building the second number
        setState({
          ...state,
          display: newDisplay,
          expression: expression + '.',
        });
      } else {
        // We're building the first number
        setState({
          ...state,
          display: newDisplay,
          expression: newDisplay,
        });
      }
    }
  };

  const clear = () => {
    setState({
      display: '0',
      expression: '',
      previousValue: null,
      operation: null,
      waitingForOperand: false,
      showingResult: false,
    });
  };

  const performOperation = (nextOperation: string) => {
    const { display, previousValue, operation, expression, showingResult } = state;
    const inputValue = parseFloat(display);

    if (showingResult) {
      // Continue with the result from previous calculation
      setState({
        ...state,
        expression: display + nextOperation,
        previousValue: inputValue,
        operation: nextOperation,
        waitingForOperand: true,
        showingResult: false,
      });
    } else if (previousValue === null) {
      // First operation - just add the operation to expression
      setState({
        ...state,
        expression: display + nextOperation,
        previousValue: inputValue,
        operation: nextOperation,
        waitingForOperand: true,
      });
    } else if (operation && !waitingForOperand) {
      // We have both numbers, calculate and continue with new operation
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setState({
        ...state,
        display: String(newValue),
        expression: String(newValue) + nextOperation,
        previousValue: newValue,
        operation: nextOperation,
        waitingForOperand: true,
      });
    }
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };



  const handleEquals = () => {
    const { display, previousValue, operation, expression } = state;
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setState({
        display: String(newValue),
        expression: expression, // Keep the expression to show what calculation was performed
        previousValue: null,
        operation: null,
        waitingForOperand: true,
        showingResult: true,
      });
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-2xl max-w-sm mx-auto">
      {/* Display */}
      <div className="bg-calc-display rounded-xl p-6 mb-6 shadow-display">
        <div className="text-right">
          {/* Show calculation and result when displaying final result */}
          {state.showingResult && state.expression ? (
            <>
              {/* Show the calculation that was performed */}
              <div className="text-calc-display-text text-lg font-light tracking-wider opacity-70 mb-2">
                {state.expression}
              </div>
              {/* Show the result */}
              <div className="text-calc-display-text text-4xl font-light tracking-wider">
                {state.display}
              </div>
            </>
          ) : (
            /* Main display - show expression if building one, otherwise show current number */
            <div className="text-calc-display-text text-4xl font-light tracking-wider">
              {state.expression || state.display}
            </div>
          )}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button
          variant="calc-clear"
          size="calc"
          onClick={clear}
          className="col-span-2"
        >
          AC
        </Button>
        <Button
          variant="calc-clear"
          size="calc"
          onClick={clear}
        >
          C
        </Button>
        <Button
          variant="calc-operator"
          size="calc"
          onClick={() => performOperation('÷')}
        >
          ÷
        </Button>

        {/* Row 2 */}
        <Button
          variant="calc-number"
          size="calc"
          onClick={() => inputNumber('7')}
        >
          7
        </Button>
        <Button
          variant="calc-number"
          size="calc"
          onClick={() => inputNumber('8')}
        >
          8
        </Button>
        <Button
          variant="calc-number"
          size="calc"
          onClick={() => inputNumber('9')}
        >
          9
        </Button>
        <Button
          variant="calc-operator"
          size="calc"
          onClick={() => performOperation('×')}
        >
          ×
        </Button>

        {/* Row 3 */}
        <Button
          variant="calc-number"
          size="calc"
          onClick={() => inputNumber('4')}
        >
          4
        </Button>
        <Button
          variant="calc-number"
          size="calc"
          onClick={() => inputNumber('5')}
        >
          5
        </Button>
        <Button
          variant="calc-number"
          size="calc"
          onClick={() => inputNumber('6')}
        >
          6
        </Button>
        <Button
          variant="calc-operator"
          size="calc"
          onClick={() => performOperation('-')}
        >
          -
        </Button>

        {/* Row 4 */}
        <Button
          variant="calc-number"
          size="calc"
          onClick={() => inputNumber('1')}
        >
          1
        </Button>
        <Button
          variant="calc-number"
          size="calc"
          onClick={() => inputNumber('2')}
        >
          2
        </Button>
        <Button
          variant="calc-number"
          size="calc"
          onClick={() => inputNumber('3')}
        >
          3
        </Button>
        <Button
          variant="calc-operator"
          size="calc"
          onClick={() => performOperation('+')}
        >
          +
        </Button>

        {/* Row 5 */}
        <Button
          variant="calc-number"
          size="calc"
          onClick={() => inputNumber('0')}
          className="col-span-2"
        >
          0
        </Button>
        <Button
          variant="calc-number"
          size="calc"
          onClick={inputDecimal}
        >
          .
        </Button>
        <Button
          variant="calc-equals"
          size="calc"
          onClick={handleEquals}
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default Calculator;