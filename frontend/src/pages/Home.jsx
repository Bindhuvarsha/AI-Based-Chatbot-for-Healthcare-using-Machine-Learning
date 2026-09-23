export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">Jeeva Raksha</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your AI-powered medical companion for symptom analysis, healthcare insights, and hospital discovery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/analyze" className="btn-primary text-lg px-8 py-3">
              Analyze Symptoms
            </a>
            <a href="/hospitals" className="btn-secondary text-lg px-8 py-3">
              Find Hospitals
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-hover">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Symptom Analysis</h3>
            <p className="text-gray-600">
              Get instant AI-powered analysis of your symptoms using advanced NLP and machine learning models.
            </p>
          </div>

          <div className="card-hover">
            <div className="text-4xl mb-4">🏥</div>
            <h3 className="text-xl font-bold mb-2">Hospital Finder</h3>
            <p className="text-gray-600">
              Find nearby hospitals and clinics in your area with real-time location mapping.
            </p>
          </div>

          <div className="card-hover">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Medical Database</h3>
            <p className="text-gray-600">
              Access comprehensive medical information about diseases and symptoms.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Enter Symptoms', desc: 'Describe your symptoms' },
              { num: '2', title: 'AI Analysis', desc: 'Get AI insights' },
              { num: '3', title: 'Find Help', desc: 'Locate nearby hospitals' },
              { num: '4', title: 'Get Support', desc: 'Connect with healthcare' }
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h4 className="font-bold mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
