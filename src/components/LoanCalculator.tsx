import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LoanCalculator() {
  const [amount, setAmount] = useState(10000);
  const [days, setDays] = useState(10);
  const [bannerImage, setBannerImage] = useState('');

  const minAmount = 3000;
  const maxAmount = 100000;
  const minDays = 5;
  const maxDays = 33;

  const interestRate = 0.072;
  const totalAmount = amount + (amount * interestRate);

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm shadow-2xl rounded-3xl sm:rounded-[32px] overflow-hidden border border-white/50">
        <div className="p-4 sm:p-6 md:p-10">
          {bannerImage && (
            <div className="mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
              <img 
                src={bannerImage} 
                alt="Баннер" 
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="space-y-6 sm:space-y-8">
            <div>
              <div className="flex justify-between items-baseline gap-2 mb-4">
                <label className="text-lg sm:text-xl md:text-2xl font-normal text-gray-700">
                  Сумма
                </label>
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tabular-nums">
                  {amount.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              
              <div className="relative pt-2 touch-pan-y">
                <Slider
                  value={[amount]}
                  onValueChange={(value) => setAmount(value[0])}
                  min={minAmount}
                  max={maxAmount}
                  step={1000}
                  className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:border-[5px] sm:[&_[role=slider]]:border-[6px] [&_[role=slider]]:border-yellow-400 [&_[role=slider]]:shadow-lg [&_[role=slider]]:w-9 [&_[role=slider]]:h-9 sm:[&_[role=slider]]:w-10 sm:[&_[role=slider]]:h-10 [&>span]:bg-gray-200 [&>span>span]:bg-yellow-400 [&>span]:h-3 sm:[&>span]:h-3.5"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline gap-2 mb-4">
                <label className="text-lg sm:text-xl md:text-2xl font-normal text-gray-700">
                  Срок
                </label>
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tabular-nums">
                  {days} {getDayWord(days)}
                </span>
              </div>
              
              <div className="relative pt-2 touch-pan-y">
                <Slider
                  value={[days]}
                  onValueChange={(value) => setDays(value[0])}
                  min={minDays}
                  max={maxDays}
                  step={1}
                  className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:border-[5px] sm:[&_[role=slider]]:border-[6px] [&_[role=slider]]:border-yellow-400 [&_[role=slider]]:shadow-lg [&_[role=slider]]:w-9 [&_[role=slider]]:h-9 sm:[&_[role=slider]]:w-10 sm:[&_[role=slider]]:h-10 [&>span]:bg-gray-200 [&>span>span]:bg-yellow-400 [&>span]:h-3 sm:[&>span]:h-3.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-2 sm:pt-4">
              <div>
                <div className="text-base sm:text-lg md:text-xl font-normal text-gray-600 mb-2 sm:mb-3">
                  Возвращаете
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl md:text-3xl text-gray-400 line-through font-medium">
                    {Math.round(amount * 1.1).toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="bg-yellow-300 text-gray-900 text-xl sm:text-2xl md:text-3xl font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl">
                    {Math.round(totalAmount).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              <div>
                <div className="text-base sm:text-lg md:text-xl font-normal text-gray-600 mb-2 sm:mb-3">
                  Дата возврата
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {calculateReturnDate()}
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              <Button 
                className="w-full h-14 sm:h-16 md:h-20 text-lg sm:text-xl md:text-2xl font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl sm:rounded-2xl shadow-lg transition-all active:scale-[0.98] sm:hover:scale-[1.02]"
              >
                Получить через <span className="text-red-500">гос</span>услуги
              </Button>

              <Button 
                variant="outline"
                className="w-full h-14 sm:h-16 md:h-20 text-lg sm:text-xl md:text-2xl font-bold bg-white hover:bg-yellow-50 active:bg-yellow-100 text-gray-900 border-[3px] sm:border-4 border-yellow-400 rounded-xl sm:rounded-2xl shadow-lg transition-all active:scale-[0.98] sm:hover:scale-[1.02]"
              >
                Получить бесплатно
              </Button>
            </div>

            <div className="text-center pt-3 sm:pt-4">
              <a href="#" className="text-blue-600 hover:text-blue-700 active:text-blue-800 text-sm sm:text-base md:text-lg font-medium underline">
                Что если я не успею вернуть заём вовремя?
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-gray-200">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-gray-700 font-semibold text-sm sm:text-base">
                <span>⚙️ Настройки баннера</span>
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    URL изображения баннера
                  </label>
                  <input
                    type="text"
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    placeholder="https://example.com/banner.jpg"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                  />
                  <p className="mt-2 text-xs sm:text-sm text-gray-500">
                    Вставьте ссылку на изображение для баннера сверху калькулятора
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </Card>
    </div>
  );
}
