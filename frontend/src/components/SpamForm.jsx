import React, { useState } from "react";
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  ArrowPathIcon
} from "@heroicons/react/24/solid";
import InfoTooltip from "./InfoToolTip";

function SpamForm() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setProbability(null);

    const backendUrl = import.meta.env.VITE_CLASSIFIER_URL;

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setPrediction(data.prediction);
      setProbability(data.probability);
    } catch (err) {
      console.error(err);
      setPrediction("Error connecting to server");
      setProbability(null);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeColor = () => {
    if (!prediction || !probability) return "bg-gray-300";
    if (prediction.toLowerCase() === "spam") {
      return probability >= 0.9 ? "bg-red-600" : "bg-red-400";
    } else {
      return probability >= 0.9 ? "bg-green-600" : "bg-green-400";
    }
  };

  const getIcon = () => {
    if (!prediction) return null;
    return prediction.toLowerCase() === "spam" ? (
      <XCircleIcon className="h-6 w-6 text-white inline-block mr-2" />
    ) : (
      <CheckCircleIcon className="h-6 w-6 text-white inline-block mr-2" />
    );
  };

  const getConfidenceColor = () => {
    if (!probability) return "text-gray-500";
    if (probability >= 0.9) return "text-green-600";
    if (probability >= 0.7) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceIcon = () => {
    if (!probability) return null;
    if (probability >= 0.9) return <ShieldCheckIcon className="h-4 w-4 inline mr-1" />;
    if (probability >= 0.7) return <ExclamationTriangleIcon className="h-4 w-4 inline mr-1" />;
    return <ExclamationTriangleIcon className="h-4 w-4 inline mr-1" />;
  };

  return (
    <section id="demo" className="min-h-screen mt-16 md:mt-10 w-full bg-black">
      <div className="max-w-7xl mx-auto h-full">
        {/* Header Section */}
        <div className="text-center md:py-12">
          <h1 className="text-5xl md:text-6xl font-serif lg:text-7xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
            Spam Classifier
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-serif">
            AI-powered spam detection for your messages. Get instant, accurate results.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Input Section */}
          <div className="space-y-6 opacity-100">
            <div className="bg-[#060831]/40 rounded-2xl border border-white/10 hover:border-blue-500/30 hover:translate-y-1 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2) transition-all p-6 md:p-8 shadow-md text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-mono">
                Check Your Message
              </h2>
              <InfoTooltip/>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <label htmlFor="message" className="block text-lg font-semibold text-gray-300 mb-3 font-mono">
                    Enter your message
                  </label>
                  <textarea
                    rows="8"
                    id="demo-textarea"
                    className="w-full p-5 rounded-xl border border-white/10 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors text-lg"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste or type your message here to check if it's spam..."
                    disabled={loading}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                    {text.length} characters
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !text.trim()}
                  className="w-full py-4 font-semibold text-base rounded-xl bg-gradient-to-r from-purple-500/80 to-blue-500/80 text-white hover:from-purple-600 hover:to-blue-600 cursor-pointer shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <ArrowPathIcon className="h-6 w-6 animate-spin" />
                      <span>Analyzing Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <ShieldCheckIcon className="h-5 w-5" />
                      <span>Check for Spam</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {prediction && probability && (
              <div className="bg-[#060831]/40 hover:border-blue-500/30 hover:translate-y-1 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2) transition-all rounded-2xl border border-white/10 p-6 md:p-8 shadow-md">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center font-mono">
                  Analysis Result
                </h3>
                
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <span
                      className={`inline-flex items-center px-8 py-4 rounded-full text-white font-bold text-xl shadow-xl ${getBadgeColor()} animate-in zoom-in-50 duration-500`}
                    >
                      {getIcon()}
                      {prediction.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className={`text-center text-lg font-semibold ${getConfidenceColor()}`}>
                      {getConfidenceIcon()}
                      Confidence: {(probability * 100).toFixed(1)}%
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full transition-all duration-700 ${
                            prediction.toLowerCase() === "spam" 
                              ? "bg-gradient-to-r from-rose-400 to-red-600" 
                              : "bg-gradient-to-r from-emerald-400 to-green-600"
                          }`}
                          style={{ width: `${probability * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {prediction && !probability && (
              <div className="bg-red-50/80 backdrop-blur-sm rounded-3xl border border-red-200 p-6 md:p-8 animate-in fade-in-0 slide-in-from-right-2 duration-500">
                <div className="flex items-center justify-center space-x-3">
                  <XCircleIcon className="h-6 w-6 text-red-500" />
                  <p className="text-red-600 font-bold text-lg">{prediction}</p>
                </div>
              </div>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl border border-white/10 p-4 hover:translate-y-0.5 transition-all">
                <div className="flex items-center space-x-3 ">
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <ShieldCheckIcon className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Privacy First</h4>
                    <p className="text-sm text-gray-400">No data retention policy</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-2xl border border-white/10 p-4 hover:translate-y-0.5 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <SparklesIcon className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Smart Classification</h4>
                    <p className="text-sm text-gray-400">KNN & Decision Tree models</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpamForm;
