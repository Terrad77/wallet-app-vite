import { useParams, useNavigate } from "react-router-dom";
import { type Transaction } from "../types/models";
import {
  getTransactionVisuals,
  getStatusTextAndIcon,
} from "../utils/transactionUtils";

interface TransactionDetailScreenProps {
  transactions: Transaction[]; // Массив транзакций приходит из WalletApp.tsx
}

const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = ({
  transactions,
}) => {
  // 1. Получаем ID транзакции из URL
  const { id } = useParams<{ id: string }>();
  // Хук для программной навигации (например, для кнопки "Назад")
  const navigate = useNavigate();

  // 2. Ищем транзакцию
  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return (
      <div className="max-w-md mx-auto p-8 text-center text-red-600">
        <h2 className="text-xl font-bold">Транзакция не найдена</h2>
        <button onClick={() => navigate("/")} className="mt-4 text-blue-600">
          <i className="fas fa-arrow-left mr-2"></i>Вернуться домой
        </button>
      </div>
    );
  }

  // 3. Используем вспомогательные функции для стилей
  const { icon, color } = getTransactionVisuals(transaction);
  const statusInfo = getStatusTextAndIcon(transaction.status);
  const isPositive = transaction.amount > 0;

  // Форматирование даты
  const formattedDate = new Date(transaction.date).toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    // Этот экран будет располагаться ПОД Header и НАД Bottom Navigation
    <div className="max-w-md mx-auto px-4 py-6 pb-24">
      {/* Кнопка Назад */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 p-2 text-gray-700 hover:bg-gray-100 rounded-full"
      >
        <i className="fas fa-arrow-left text-xl"></i>
      </button>

      {/* Контент модального окна, адаптированный под экран */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* Заголовок и иконка */}
        <div className="text-center mb-6">
          <div
            className={`w-20 h-20 ${color.replace(
              "-100",
              "-200"
            )} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
          >
            {/* Адаптируем цвет иконки, чтобы она была белой, как в Вашем моке */}
            <i
              className={`fas ${icon} text-3xl ${
                color.includes("text-") ? color.split(" ")[1] : "text-white"
              }`}
            ></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {transaction.title}
          </h3>
          <p className="text-gray-500">{transaction.transactionName}</p>
        </div>

        {/* Блок суммы и деталей */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 mb-1">Amount</p>
            <p
              className={`text-4xl font-bold ${
                isPositive ? "text-green-600" : "text-gray-900"
              }`}
            >
              {isPositive ? "+" : ""}
              {transaction.amount.toFixed(2)} {transaction.currency}
            </p>
          </div>

          <div className="space-y-3">
            {/* Описание */}
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-500">
                <i className="fas fa-file-alt mr-2"></i>Описание
              </span>
              <span className="font-medium text-gray-900 text-right">
                {transaction.transactionDescription}
              </span>
            </div>

            {/* Статус */}
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-500">
                <i className="fas fa-info-circle mr-2"></i>Статус
              </span>
              <span
                className={`font-medium flex items-center gap-2 ${statusInfo.color}`}
              >
                <i className={`fas ${statusInfo.icon}`}></i> {statusInfo.text}
              </span>
            </div>

            {/* Дата */}
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-500">
                <i className="fas fa-calendar mr-2"></i>Дата и Время
              </span>
              <span className="font-medium text-gray-900">{formattedDate}</span>
            </div>

            {/* ID */}
            <div className="flex justify-between py-2">
              <span className="text-gray-500">
                <i className="fas fa-hashtag mr-2"></i>Transaction ID
              </span>
              <span className="font-medium text-gray-900 font-mono text-sm">
                #{transaction.id}
              </span>
            </div>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50">
            <i className="fas fa-download mr-2"></i>Скачать
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
          >
            <i className="fas fa-times mr-2"></i>Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailScreen;
