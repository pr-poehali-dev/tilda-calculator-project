import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LoanCalculator() {
  const [amount, setAmount] = useState(14000);
  const [days, setDays] = useState(21);

  const minAmount = 3000;
  const maxAmount = 100000;
  const minDays = 5;
  const maxDays = 33;

  const interestRate = 0;
  const totalAmount = amount + (amount * interestRate);
  const overpayment = totalAmount - amount;

  const calculateReturnDate = () => {
    const today = new Date();
    const returnDate = new Date(today);
    returnDate.setDate(today.getDate() + days);
    
    const day = String(returnDate.getDate()).padStart(2, '0');
    const month = String(returnDate.getMonth() + 1).padStart(2, '0');
    const year = String(returnDate.getFullYear()).slice(-2);
    
    return `${day}.${month}.${year}`;
  };

  const getDayWord = (d: number) => {
    if (d === 1 || (d % 10 === 1 && d !== 11)) return 'день';
    if ((d >= 2 && d <= 4) || (d % 10 >= 2 && d % 10 <= 4 && (d < 10 || d > 20))) return 'дня';
    return 'дней';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl top-0 right-0 animate-pulse" />
      <div className="absolute w-80 h-80 bg-secondary/10 rounded-full blur-3xl bottom-0 left-0 animate-pulse delay-1000" />
      
      <Card className="w-full max-w-3xl bg-gradient-to-br from-white to-slate-50 shadow-2xl rounded-3xl overflow-hidden relative z-10 animate-fade-in">
        <div className="p-6 sm:p-10 md:p-12">
          <div className="flex items-center justify-center mb-10 sm:mb-12 gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg hover:scale-110 transition-transform">
              →
            </div>
            <div className="text-center flex-1">
              <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-amber-900 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-2 shadow-md animate-pulse">
                ✨ СПЕЦПРЕДЛОЖЕНИЕ
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent leading-tight mb-1">
                Первый заем —
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary leading-tight">
                без процентов
              </h2>
            </div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-secondary to-green-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg hover:scale-110 transition-transform">
              ←
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <Card className="bg-white p-5 sm:p-7 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="flex justify-between items-center gap-2 mb-5">
                <div className="text-sm sm:text-base font-semibold text-slate-500 uppercase tracking-wider">
                  💰 Сумма
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {amount.toLocaleString('ru-RU')} ₽
                </div>
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
                <div className="flex justify-between mt-3 text-xs sm:text-sm text-slate-400 font-semibold">
                  <span>{minAmount.toLocaleString('ru-RU')} ₽</span>
                  <span>{maxAmount.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </Card>

            <Card className="bg-white p-5 sm:p-7 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="flex justify-between items-center gap-2 mb-5">
                <div className="text-sm sm:text-base font-semibold text-slate-500 uppercase tracking-wider">
                  📅 Срок
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {days} {getDayWord(days)}
                </div>
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
                <div className="flex justify-between mt-3 text-xs sm:text-sm text-slate-400 font-semibold">
                  <span>{minDays} дней</span>
                  <span>{maxDays} дня</span>
                </div>
              </div>
            </Card>

            <div className="bg-gradient-to-br from-primary to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-lg sm:text-xl font-semibold text-white/90 uppercase tracking-wider">
                  💎 Возвращаете
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="bg-gradient-to-br from-secondary to-green-600 text-white text-xl sm:text-2xl font-black px-5 py-2.5 rounded-2xl shadow-lg relative">
                    {interestRate * 100}%
                    <span className="absolute -top-2 -right-2 text-lg">🎉</span>
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg">
                    {totalAmount.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-white p-5 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-3xl mb-2">💸</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Переплата
                </div>
                <div className="text-2xl font-black text-slate-800">
                  {overpayment.toLocaleString('ru-RU')} ₽
                </div>
              </Card>
              
              <Card className="bg-white p-5 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-3xl mb-2">📆</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Вернуть до
                </div>
                <div className="text-2xl font-black text-slate-800">
                  {calculateReturnDate()}
                </div>
              </Card>
              
              <Card className="bg-white p-5 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Одобрение
                </div>
                <div className="text-2xl font-black text-slate-800">
                  5 минут
                </div>
              </Card>
            </div>

            <Button 
              className="w-full h-16 sm:h-20 text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white rounded-2xl shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1 uppercase tracking-wider relative overflow-hidden group"
            >
              <span className="relative z-10">🚀 Получить деньги</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>

            <div className="flex flex-col sm:flex-row justify-around gap-4 sm:gap-0 pt-6 border-t-2 border-slate-200">
              <div className="text-center">
                <div className="text-2xl mb-1">✅</div>
                <div className="text-xs font-semibold text-slate-600">
                  Без проверки<br/>кредитной истории
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🔒</div>
                <div className="text-xs font-semibold text-slate-600">
                  Безопасная<br/>передача данных
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-xs font-semibold text-slate-600">
                  Деньги на карту<br/>за 15 минут
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
