export default function Dashboard({ user }) {
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="card text-center">
          <p className="text-lg">Please log in to view your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="card mb-8">
        <h1 className="text-4xl font-bold mb-4">Your Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.email}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Recent Analyses</h3>
          <p className="text-gray-600">Your symptom analysis history will appear here</p>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Saved Hospitals</h3>
          <p className="text-gray-600">Your favorite hospitals and clinics</p>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Medical Records</h3>
          <p className="text-gray-600">Your personal medical information</p>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Health Tips</h3>
          <p className="text-gray-600">Personalized health recommendations</p>
        </div>
      </div>
    </div>
  );
}
