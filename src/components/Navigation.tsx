import { TabId, NavigationTab } from "../types";

interface NavigationProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

const navigationTabs: NavigationTab[] = [
  { icon: "fa-home", label: "Home", id: "home" },
  { icon: "fa-chart-pie", label: "Analytics", id: "analytics" },
  { icon: "fa-wallet", label: "Wallet", id: "wallet" },
  { icon: "fa-cog", label: "Settings", id: "settings" },
];

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex justify-around">
          {navigationTabs.map((tab: NavigationTab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id ? "text-blue-600" : "text-gray-400"
              }`}
              aria-label={tab.label}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <i className={`fas ${tab.icon} text-xl`}></i>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
