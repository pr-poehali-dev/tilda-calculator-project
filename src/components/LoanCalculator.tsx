import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function LoanCalculator() {
  const [amount, setAmount] = useState(14000);
  const [days, setDays] = useState(21);

  const minAmount = 3000;
  const maxAmount = 100000;
  const minDays = 5;
  const maxDays = 33;

  const interestRate = 0;
  const totalAmount = amount + (amount * interestRate);

  const calculateReturnDate = () => {
    const today = new Date();
    const returnDate = new Date(today);
    returnDate.setDate(today.getDate() + days);
    
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    
    const day = String(returnDate.getDate()).padStart(2, '0');
    const month = months[returnDate.getMonth()];
    const year = returnDate.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex items-center justify-between mb-12">
            <Icon name="ArrowRight" className="text-primary" size={48} />
            <div className="text-center flex-1 mx-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Первый заем —
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                без процентов
              </h2>
            </div>
            <Icon name="ArrowLeft" className="text-secondary" size={48} />
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xl md:text-2xl font-medium text-gray-700">
                  Сумма
                </label>
                <span className="text-3xl md:text-4xl font-bold text-[#1e293b]">
                  {amount.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              
              <div className="relative pt-2">
                <Slider
                  value={[amount]}
                  onValueChange={(value) => setAmount(value[0])}
                  min={minAmount}
                  max={maxAmount}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between mt-3 text-sm md:text-base text-gray-400 font-medium">
                  <span>{minAmount.toLocaleString('ru-RU')} ₽</span>
                  <span>{maxAmount.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xl md:text-2xl font-medium text-gray-700">
                  Срок
                </label>
                <span className="text-3xl md:text-4xl font-bold text-[#1e293b]">
                  {days} {days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}
                </span>
              </div>
              
              <div className="relative pt-2">
                <Slider
                  value={[days]}
                  onValueChange={(value) => setDays(value[0])}
                  min={minDays}
                  max={maxDays}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-3 text-sm md:text-base text-gray-400 font-medium">
                  <span>{minDays} дней</span>
                  <span>{maxDays} дня</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xl md:text-2xl font-medium text-gray-700">
                  Возвращаете
                </span>
                <div className="flex items-center gap-3">
                  <span className="bg-secondary text-white text-lg md:text-xl font-bold px-4 py-2 rounded-xl">
                    {interestRate * 100}%
                  </span>
                  {interestRate > 0 && (
                    <span className="text-xl md:text-2xl text-gray-400 line-through">
                      {(amount * 1.15).toLocaleString('ru-RU')} ₽
                    </span>
                  )}
                  <span className="text-3xl md:text-4xl font-bold text-primary">
                    {totalAmount.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xl md:text-2xl">
              <span className="font-medium text-gray-700">До</span>
              <span className="font-bold text-[#1e293b]">
                {calculateReturnDate()}
              </span>
            </div>

            <Button 
              className="w-full h-16 md:h-20 text-2xl md:text-3xl font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Получить деньги
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
