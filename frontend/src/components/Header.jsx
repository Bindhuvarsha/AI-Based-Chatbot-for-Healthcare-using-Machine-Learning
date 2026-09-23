import { Link } from 'react-router-dom';

export default function Header({ user, setUser }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-3xl font-bold text-blue-600">🏥</div>
            <span className="text-2xl font-bold text-gray-800">Jeeva Raksha</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/analyze" className="text-gray-700 hover:text-blue-600 transition">
              Symptom Analyzer
            </Link>
            <Link to="/hospitals" className="text-gray-700 hover:text-blue-600 transition">
              Find Hospitals
            </Link>
            <Link to="/medical-info" className="text-gray-700 hover:text-blue-600 transition">
              Medical Info
            </Link>
            {user && (
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">{user.email}</span>
                <button
                  onClick={() => setUser(null)}
                  className="btn-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <button className="btn-primary">
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
