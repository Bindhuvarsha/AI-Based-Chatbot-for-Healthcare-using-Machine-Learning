export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Jeeva Raksha</h3>
            <p className="text-gray-400">Your AI-powered medical symptom analyzer</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/analyze" className="hover:text-white transition">Analyze Symptoms</a></li>
              <li><a href="/hospitals" className="hover:text-white transition">Find Hospitals</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">AI Analysis</a></li>
              <li><a href="#" className="hover:text-white transition">Hospital Finder</a></li>
              <li><a href="#" className="hover:text-white transition">Medical Database</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@jeevaraksha.com</li>
              <li>Phone: +1-800-HEALTH-1</li>
              <li className="text-sm">© 2024 Jeeva Raksha. All rights reserved.</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
