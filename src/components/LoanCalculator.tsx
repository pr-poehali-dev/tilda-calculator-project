import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LoanCalculator() {
  const [amount, setAmount] = useState(10000);
  const [days, setDays] = useState(10);

  const minAmount = 3000;
  const maxAmount = 100000;
  const minDays = 5;
  const maxDays = 33;

  const interestRate = 0.072;
  const totalAmount = amount + (amount * interestRate);
  const overpayment = totalAmount - amount;

  const calculateReturnDate = () => {
    const today = new Date();
    const returnDate = new Date(today);
    returnDate.setDate(today.getDate() + days);
    
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    
    const day = returnDate.getDate();
    const month = months[returnDate.getMonth()];
    const year = returnDate.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  const getDayWord = (d: number) => {
    if (d === 1 || (d % 10 === 1 && d !== 11)) return 'день';
    if ((d >= 2 && d <= 4) || (d % 10 >= 2 && d % 10 <= 4 && (d < 10 || d > 20))) return 'дня';
    return 'дней';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm shadow-2xl rounded-[32px] overflow-hidden border border-white/50">
        <div className="p-6 sm:p-8 md:p-10">
          <Card className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden border-0 shadow-lg">
            <div className="absolute top-0 right-0 w-48 h-48 opacity-30">
              <div className="text-6xl">🎄</div>
            </div>
            
            <div className="relative z-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Погасим заём за вас!
              </h1>
              <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                Выберем 50 счастливчиков, за которых закроем заём 15 января
              </p>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition-all hover:scale-105">
                Участвовать в акции
              </Button>
            </div>
          </Card>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-xl sm:text-2xl font-normal text-gray-700">
                  Сумма
                </label>
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
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
                  className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:border-[6px] [&_[role=slider]]:border-yellow-400 [&_[role=slider]]:shadow-lg [&_[role=slider]]:w-10 [&_[role=slider]]:h-10 [&>span]:bg-gray-200 [&>span>span]:bg-yellow-400"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-xl sm:text-2xl font-normal text-gray-700">
                  Срок
                </label>
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {days} {getDayWord(days)}
                </span>
              </div>
              
              <div className="relative pt-2">
                <Slider
                  value={[days]}
                  onValueChange={(value) => setDays(value[0])}
                  min={minDays}
                  max={maxDays}
                  step={1}
                  className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:border-[6px] [&_[role=slider]]:border-yellow-400 [&_[role=slider]]:shadow-lg [&_[role=slider]]:w-10 [&_[role=slider]]:h-10 [&>span]:bg-gray-200 [&>span>span]:bg-yellow-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <div className="text-lg sm:text-xl font-normal text-gray-600 mb-3">
                  Возвращаете
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl text-gray-400 line-through font-medium">
                    {Math.round(amount * 1.1).toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="bg-yellow-300 text-gray-900 text-2xl sm:text-3xl font-bold px-4 py-2 rounded-2xl">
                    {Math.round(totalAmount).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              <div>
                <div className="text-lg sm:text-xl font-normal text-gray-600 mb-3">
                  Дата возврата
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {calculateReturnDate()}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Button 
                className="w-full h-16 sm:h-20 text-xl sm:text-2xl font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg transition-all hover:scale-[1.02]"
              >
                Получить через <span className="text-red-500">гос</span>услуги
              </Button>

              <Button 
                variant="outline"
                className="w-full h-16 sm:h-20 text-xl sm:text-2xl font-bold bg-white hover:bg-yellow-50 text-gray-900 border-4 border-yellow-400 rounded-2xl shadow-lg transition-all hover:scale-[1.02]"
              >
                Получить бесплатно
              </Button>
            </div>

            <div className="text-center pt-4">
              <a href="#" className="text-blue-600 hover:text-blue-700 text-base sm:text-lg font-medium underline">
                Что если я не успею вернуть заём вовремя?
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
