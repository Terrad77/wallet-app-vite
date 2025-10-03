const Header: React.FC = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              <i className="fas fa-wallet mr-2"></i>Wallet
            </h1>
            <p className="text-sm text-gray-500">Manage your finances</p>
          </div>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="User profile"
          >
            <i className="fas fa-user text-gray-600 text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
