import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Navigation, Star, Phone, Globe, AlertCircle, Ambulance, Clock, Activity } from 'lucide-react';
import axios from 'axios';
import { logError, getErrorMessage, validateLocation } from '../utils/errorHandler';

const API_BASE = "/api";

const HospitalFinder = ({ diagnosisContext }) => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('general');
  const [sortBy, setSortBy] = useState('distance');
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Auto-populate specialty from diagnosis context
  useEffect(() => {
    if (diagnosisContext?.recommended_specialties?.length > 0) {
      setSpecialty(diagnosisContext.recommended_specialties[0].toLowerCase());
    }
  }, [diagnosisContext]);

  // Get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`${latitude},${longitude}`);
          setLocation(`${latitude},${longitude}`);
        },
        (err) => {
          console.warn("Geolocation error:", err);
          setLocation('Mumbai');
        }
      );
    }
  }, []);

  const fetchHospitals = async (loc = location, spec = specialty, sort = sortBy) => {
    // Validate location
    const validation = validateLocation(loc);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE}/nearby-hospitals`, { 
        location: loc, 
        specialty: spec !== 'general' ? spec : null,
        radius: 10000,
        sort_by: sort
      }, {
        timeout: 15000
      });

      if (response.data.hospitals.length === 0) {
        setError('No hospitals found in this area. Try a different location.');
      } else {
        setHospitals(response.data.hospitals);
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'hospitals');
      setError(errorMessage);
      logError(err, { context: 'hospital_finder', location: loc, specialty: spec });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchHospitals(location, specialty, sortBy);
  };

  const handleEmergency = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE}/emergency-services`, {
        location: userLocation || location,
        emergency_type: 'medical'
      }, {
        timeout: 15000
      });

      if (response.data.nearby_hospitals) {
        setHospitals(response.data.nearby_hospitals);
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'hospitals');
      setError(errorMessage);
      logError(err, { context: 'emergency_finder' });
    } finally {
      setLoading(false);
    }
  };

  const specialties = [
    { value: 'general', label: 'General' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'orthopedic', label: 'Orthopedic' },
    { value: 'emergency', label: '🚨 Emergency' },
    { value: 'pediatrics', label: 'Pediatrics' }
  ];

  const sortOptions = [
    { value: 'distance', label: 'Nearest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'emergency_availability', label: 'Emergency Services' }
  ];

  return (
    <div className="space-y-8">
      {/* Diagnosis Context Alert */}
      {diagnosisContext && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-900/20 border border-blue-700/50 rounded-2xl flex items-start gap-3"
        >
          <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-semibold text-blue-300">Based on your diagnosis:</p>
            <p className="text-xs text-blue-200 mt-1">
              We've filtered hospitals with {diagnosisContext.recommended_specialties?.[0] || 'relevant'} services nearby.
            </p>
          </div>
        </motion.div>
      )}

      {/* Search & Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Location Input */}
          <div className="relative flex-1 group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter city, zip code, or coordinates..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-6 py-3 outline-none focus:border-emerald-500/50 transition-all text-slate-100 text-sm"
            />
          </div>

          {/* Specialty Filter */}
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 outline-none focus:border-emerald-500/50 transition-all text-slate-100 text-sm"
          >
            {specialties.map(spec => (
              <option key={spec.value} value={spec.value}>{spec.label}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 outline-none focus:border-emerald-500/50 transition-all text-slate-100 text-sm"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-emerald-500 text-slate-950 px-6 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 text-sm"
          >
            <Search size={18} /> Search
          </button>

          {/* Emergency Button */}
          <button 
            onClick={handleEmergency}
            disabled={loading}
            className="bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95 disabled:opacity-50 text-sm"
          >
            <Ambulance size={18} /> SOS
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-900/20 border border-red-700/50 rounded-2xl text-red-300 text-sm flex items-start gap-3"
        >
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          [1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 h-56 animate-pulse" />
          ))
        ) : (
          hospitals.map((hospital, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/30 transition-all group flex flex-col justify-between h-full"
            >
              {/* Header */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                    <MapPin size={24} />
                  </div>
                  <div className="flex items-center gap-2">
                    {hospital.rating && (
                      <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-200">{hospital.rating.toFixed(1)}</span>
                      </div>
                    )}
                    {hospital.emergency_available && (
                      <div className="px-2 py-1 bg-red-900/20 border border-red-700/50 rounded-lg">
                        <Ambulance size={14} className="text-red-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Hospital Name */}
                <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-3 leading-tight">
                  {hospital.name}
                </h4>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  {/* Address */}
                  <p className="text-slate-400 flex items-start gap-2">
                    <MapPin size={14} className="flex-shrink-0 mt-0.5 text-emerald-500" />
                    {hospital.address}
                  </p>

                  {/* Distance */}
                  <p className="text-slate-400 flex items-center gap-2">
                    <Navigation size={14} className="text-emerald-500" />
                    {hospital.distance} km away
                  </p>

                  {/* Specialties */}
                  {hospital.specialties?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {hospital.specialties.slice(0, 2).map((spec, i) => (
                        <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {spec}
                        </span>
                      ))}
                      {hospital.specialties.length > 2 && (
                        <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-slate-800 text-slate-400">
                          +{hospital.specialties.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Open Status */}
                  {hospital.is_open !== undefined && (
                    <p className={`flex items-center gap-2 text-xs font-semibold ${hospital.is_open ? 'text-emerald-400' : 'text-orange-400'}`}>
                      <Clock size={12} />
                      {hospital.is_open ? 'Open Now' : 'Closed'}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-800/50 mt-4">
                <button className="flex-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl py-2.5 text-xs font-bold text-slate-300 transition-all flex items-center justify-center gap-2">
                  <Phone size={14} />
                  <span className="hidden sm:inline">Call</span>
                </button>
                <button className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 rounded-xl py-2.5 text-xs font-bold text-emerald-400 transition-all flex items-center justify-center gap-2">
                  <Navigation size={14} />
                  <span className="hidden sm:inline">Directions</span>
                </button>
                {hospital.emergency_available && (
                  <button className="flex-1 bg-red-900/10 hover:bg-red-900/20 border border-red-700/30 hover:border-red-700/50 rounded-xl py-2.5 text-xs font-bold text-red-400 transition-all flex items-center justify-center gap-2">
                    <Ambulance size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Empty State */}
      {!loading && hospitals.length === 0 && !error && (
        <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-[3rem]">
          <div className="p-4 bg-slate-900 rounded-full w-fit mx-auto mb-6 text-slate-600">
            <Search size={40} />
          </div>
          <h5 className="text-xl font-bold text-slate-400">Ready to find care?</h5>
          <p className="text-slate-600 mt-2">Enter your location to discover nearby hospitals and medical facilities.</p>
        </div>
      )}

      {/* Result Count */}
      {!loading && hospitals.length > 0 && (
        <p className="text-center text-sm text-slate-500 font-semibold">
          Found {hospitals.length} hospitals matching your criteria
        </p>
      )}
    </div>
  );
};

export default HospitalFinder;
