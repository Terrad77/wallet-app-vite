import { cards } from "../types/cards";

interface CardBalanceProps {
  totalBalance: number;
  cards: cards[];
}

const CardBalance: React.FC<CardBalanceProps> = ({ totalBalance, cards }) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">
            <i className="fas fa-chart-line mr-1"></i>Total Balance
          </p>
          <h2 className="text-4xl font-bold text-gray-900">
            ${totalBalance.toFixed(2)}
          </h2>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <i className="fas fa-plus mr-2"></i>Add Money
        </button>
      </div>

      <div className="space-y-3">
        {cards.map((card: cards) => (
          <div
            key={card.id}
            className={`${card.color} rounded-xl p-4 text-white`}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-xs opacity-80 mb-1">{card.name}</p>
                <p className="text-sm font-mono">•••• {card.last4}</p>
              </div>
              <i className="fas fa-credit-card text-xl opacity-80"></i>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-80">Balance</p>
                <p className="text-xl font-bold">
                  ${(card.balance / 100).toFixed(2)}
                </p>
              </div>
              <p className="text-xs opacity-60">Exp: 12/26</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardBalance;
