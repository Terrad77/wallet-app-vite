import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useAppData } from "./hooks/useAppData"; // Убедитесь, что этот файл существует
import TransactionListScreen from "./screens/TransactionListScreen"; // Создайте этот файл
import TransactionDetailScreen from "./screens/TransactionDetailScreen"; // Создайте этот файл

// Убедитесь, что этот импорт присутствует в Вашем index.html или корневом файле
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

const WalletApp: React.FC = () => {
  // Используем хук для загрузки данных и обработки состояний
  const { data, loading, error } = useAppData();

  // Состояние для активной вкладки навигации
  const [activeTab, setActiveTab] = useState("home");

  // --- Состояния Загрузки и Ошибки ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-blue-600 bg-gray-50">
        <i className="fas fa-spinner fa-spin mr-2"></i>Загрузка данных
        кошелька...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-8 text-center text-red-600 bg-gray-50">
        <i className="fas fa-exclamation-triangle mr-2"></i>Ошибка загрузки:{" "}
        {error || "Данные не найдены."}
      </div>
    );
  }
  // --- Конец обработки состояний ---

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header (статичен на всех экранах) */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  <i className="fas fa-wallet mr-2"></i>Wallet
                </h1>
                <p className="text-sm text-gray-500">Manage your finances</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <i className="fas fa-user text-gray-600 text-xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Основное содержимое, управляемое роутингом */}
        <Routes>
          {/* Главный экран: передаем ВСЕ данные, чтобы компоненты могли их использовать */}
          <Route path="/" element={<TransactionListScreen data={data} />} />

          {/* Экран деталей транзакции: передаем только массив транзакций */}
          <Route
            path="/transaction/:id"
            element={
              <TransactionDetailScreen transactions={data.transactions} />
            }
          />

          {/* Заглушка для других вкладок навигации */}
          <Route
            path="/:tabId"
            element={
              <div className="p-8 text-center">
                <h2 className="text-xl font-bold">Страница "{":tabId"}"</h2>
                <p className="text-gray-500">
                  Здесь будет соответствующий контент.
                </p>
              </div>
            }
          />

          <Route
            path="*"
            element={<div className="p-8 text-center">404 Not Found</div>}
          />
        </Routes>

        {/* Bottom Navigation (статичен на всех экранах) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-20">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex justify-around">
              {[
                { icon: "fa-home", label: "Home", id: "home", path: "/" },
                {
                  icon: "fa-chart-pie",
                  label: "Analytics",
                  id: "analytics",
                  path: "/analytics",
                },
                {
                  icon: "fa-wallet",
                  label: "Wallet",
                  id: "wallet",
                  path: "/wallet",
                },
                {
                  icon: "fa-cog",
                  label: "Settings",
                  id: "settings",
                  path: "/settings",
                },
              ].map((tab) => (
                <Link
                  key={tab.id}
                  to={tab.path}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <i className={`fas ${tab.icon} text-xl`}></i>
                  <span className="text-xs font-medium">{tab.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default WalletApp;
