import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  UploadCloud, 
  CloudSun, 
  Thermometer, 
  Droplets, 
  Umbrella, 
  CheckCircle, 
  FileImage,
  RefreshCw,
  Info
} from 'lucide-react';
import { CropPresetSample } from '../types';

// Concrete healthy/stressed sample images with farm field background
const FARM_FIELD_HERO = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1200";

const SAMPLE_GALLERY = [
  {
    id: "sample-healthy-1",
    name: "Healthy Rice Paddy Leaf",
    status: "Healthy",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600",
    defaultWeather: { temp: 28, humidity: 75, rainProb: 60 },
    simulatedResult: {
      condition: "Healthy Leaf Canopy • Optimal Nutrition",
      stressLevel: "Healthy",
      riskScore: 8,
      affectedLeafArea: 0,
      nutrientDeficiency: "All primary soil minerals within normal parameters",
      recommendedActions: [
        "Continue organic crop protective neem spray every fortnight to deter pests.",
        "Maintain standard moisture levels; ensure weeding is completed within early stages.",
        "No chemical fungicide or corrective soil amendments required."
      ]
    }
  },
  {
    id: "sample-rust-2",
    name: "Stressed Wheat (Rust Rusting)",
    status: "Stressed",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=600",
    defaultWeather: { temp: 22, humidity: 85, rainProb: 70 },
    simulatedResult: {
      condition: "Fungal Leaf Rust (Puccinia graminis)",
      stressLevel: "High Stress",
      riskScore: 75,
      affectedLeafArea: 38,
      nutrientDeficiency: "None detected (fungal disease is the primary stress driver)",
      recommendedActions: [
        "Apply organic or government-approved sulfur-based copper fungicide spray.",
        "Ensure uniform field drainage; stagnating soil moisture accelerates fungal sporulation.",
        "Restrict nitrogen-rich urea fertilizers temporarily until crop stabilizes."
      ]
    }
  },
  {
    id: "sample-drought-3",
    name: "Drought-Stressed Maize",
    status: "Stressed",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600",
    defaultWeather: { temp: 38, humidity: 25, rainProb: 5 },
    simulatedResult: {
      condition: "Severe Soil Moisture Stress",
      stressLevel: "Critical",
      riskScore: 92,
      affectedLeafArea: 55,
      nutrientDeficiency: "Potassium absorption blocked due to root moisture deficit",
      recommendedActions: [
        "Initiate emergency overhead or drip irrigation immediately.",
        "Apply potassium spray to help plants maintain cellular turgor and reduce wilting.",
        "Utilize straw or leaf mulching on planting beds to preserve residual soil moisture."
      ]
    }
  }
];

export default function CropIntelligence() {
  const [selectedPreset, setSelectedPreset] = useState<typeof SAMPLE_GALLERY[0] | null>(null);
  const [customFile, setCustomFile] = useState<{ name: string; size: string; preview: string } | null>(null);
  
  // Interactive weather parameters
  const [temp, setTemp] = useState<number>(28);
  const [humidity, setHumidity] = useState<number>(65);
  const [rainProb, setRainProb] = useState<number>(30);

  // Analysis progress triggers
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const [analysisResult, setAnalysisResult] = useState<typeof SAMPLE_GALLERY[0]['simulatedResult'] | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      simulateCustomUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      simulateCustomUpload(file);
    }
  };

  const simulateCustomUpload = (file: File) => {
    setSelectedPreset(null);
    setCustomFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      preview: URL.createObjectURL(file)
    });
    setTemp(30);
    setHumidity(60);
    setRainProb(40);
    setAnalysisResult(null);
  };

  const handlePresetSelect = (preset: typeof SAMPLE_GALLERY[0]) => {
    setCustomFile(null);
    setSelectedPreset(preset);
    setTemp(preset.defaultWeather.temp);
    setHumidity(preset.defaultWeather.humidity);
    setRainProb(preset.defaultWeather.rainProb);
    setAnalysisResult(null);
  };

  const runPrediction = () => {
    if (!selectedPreset && !customFile) {
      alert('Please upload a crop leaf image or select a sample template.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResult(null);

    const steps = [
      'Uploading crop photo to secure system...',
      'Reading temperature and humidity sliders...',
      'Assessing leaf color ratios and discoloration...',
      'Matching parameters against crop stress databases...',
      'Formulating fertilizer and water prescriptions...'
    ];

    let currentStepIdx = 0;
    setAnalysisStep(steps[0]);

    const timer = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsAnalyzing(false);
          
          if (selectedPreset) {
            setAnalysisResult(selectedPreset.simulatedResult);
          } else {
            // Random output for custom uploads
            setAnalysisResult({
              condition: "Moderate Nitrogen Deficit & Moisture Stress",
              stressLevel: "Moderate Stress",
              riskScore: 45,
              affectedLeafArea: 20,
              nutrientDeficiency: "Nitrogen (N) deficit indicated",
              recommendedActions: [
                "Apply neem-coated urea fertilizer as per standard pocket dosage guidelines.",
                "Verify soil moisture depth; perform watering at early morning hours.",
                "Re-check leaf color development in 10 days."
              ]
            });
          }
          return 100;
        }
        
        const nextProgress = prev + 10;
        const nextStepIdx = Math.floor((nextProgress / 100) * steps.length);
        if (nextStepIdx < steps.length && nextStepIdx !== currentStepIdx) {
          currentStepIdx = nextStepIdx;
          setAnalysisStep(steps[currentStepIdx]);
        }
        return nextProgress;
      });
    }, 120);
  };

  const getStressBadge = (level: string) => {
    switch (level) {
      case 'Healthy':
        return 'bg-emerald-950/50 text-emerald-400 border-emerald-900/30';
      case 'Moderate Stress':
        return 'bg-amber-950/50 text-amber-400 border-amber-900/30';
      case 'High Stress':
        return 'bg-orange-950/50 text-orange-400 border-orange-900/30';
      case 'Critical':
        return 'bg-rose-950/50 text-rose-400 border-rose-900/30';
      default:
        return 'bg-navy-dark text-slate-400 border-accent-blue/10';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-navy-dark text-slate-200">
      
      {/* HEADER BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-light p-6 sm:p-8 border border-accent-blue/20 shadow-xl">
        <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-accent-blue/5 rounded-full blur-[60px]" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-bold font-mono uppercase bg-accent-blue/10 text-accent-blue px-3 py-1 rounded-full border border-accent-blue/20">
              Panchayat Crop Safety System
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Crop Stress Prediction System
            </h1>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              Evaluate crop health, check for weather-related moisture deficits, and obtain tailored water and treatment prescriptions instantly.
            </p>
          </div>
        </div>
      </div>

      {/* FARM FIELD IMAGERY HERO */}
      <div className="rounded-2xl overflow-hidden border border-accent-blue/15 shadow-md relative min-h-[140px]">
        <img 
          src={FARM_FIELD_HERO} 
          alt="Lush Indian Farm Fields" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 space-y-1">
          <h3 className="text-sm font-bold text-white font-display">Empowering Panchayat Agriculture</h3>
          <p className="text-[11px] text-slate-300 max-w-lg">
            Understand the stress impacts of high heat waves, low humidity, and rainfall shortages before symptoms spread.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUT COLUMN (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* File Upload Box */}
          <div className="bg-navy-light border border-accent-blue/15 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-accent-blue">
              Step 1: Upload Leaf Photo
            </h3>

            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-accent-cyan bg-accent-blue/10' 
                  : 'border-accent-blue/20 hover:border-accent-blue'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept="image/*" 
                className="hidden" 
              />
              
              {customFile ? (
                <div className="space-y-3">
                  <div className="relative w-24 h-24 mx-auto rounded-lg overflow-hidden border border-accent-blue/20">
                    <img src={customFile.preview} alt="Custom upload preview" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white truncate max-w-xs mx-auto">
                      {customFile.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{customFile.size} • Ready for analysis</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCustomFile(null);
                    }}
                    className="text-xs font-semibold text-rose-400 hover:underline"
                  >
                    Remove Image
                  </button>
                </div>
              ) : selectedPreset ? (
                <div className="space-y-3">
                  <div className="relative w-24 h-24 mx-auto rounded-lg overflow-hidden border border-accent-blue/20">
                    <img src={selectedPreset.image} alt="Sample crop preview" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Selected: {selectedPreset.name}
                    </p>
                    <p className="text-[10px] text-slate-400">Sample Template</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPreset(null);
                    }}
                    className="text-xs font-semibold text-rose-400 hover:underline"
                  >
                    Clear Choice
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                  <div>
                    <span className="text-xs font-bold text-accent-blue hover:underline">
                      Click to upload leaf photo
                    </span>
                    <span className="text-xs text-slate-400"> or drag and drop</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Supports JPG, PNG formats</p>
                </div>
              )}
            </div>

            {/* Alternating Healthy & Stressed Samples Gallery */}
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Or select a healthy / stressed crop sample below
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAMPLE_GALLERY.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handlePresetSelect(sample)}
                    className={`p-2 rounded-xl border text-left transition-all text-xs flex flex-col gap-2 overflow-hidden ${
                      selectedPreset?.id === sample.id
                        ? 'border-accent-blue bg-accent-blue/10'
                        : 'border-accent-blue/15 hover:bg-navy-dark'
                    }`}
                  >
                    <img src={sample.image} alt={sample.name} className="w-full h-20 object-cover rounded-lg" />
                    <div>
                      <div className="font-bold text-white leading-tight truncate">{sample.name}</div>
                      <span className={`inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        sample.status === 'Healthy' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                      }`}>
                        {sample.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Sliders for Weather conditions */}
          <div className="bg-navy-light border border-accent-blue/15 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-accent-blue">
              Step 2: Set Current Weather Conditions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-orange-400" />
                    Temperature
                  </span>
                  <span className="font-mono text-white font-bold">{temp}°C</span>
                </div>
                <input 
                  type="range"
                  min={10}
                  max={45}
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="w-full accent-accent-blue"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>10°C</span>
                  <span>45°C</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    Humidity
                  </span>
                  <span className="font-mono text-white font-bold">{humidity}%</span>
                </div>
                <input 
                  type="range"
                  min={10}
                  max={100}
                  value={humidity}
                  onChange={(e) => setHumidity(Number(e.target.value))}
                  className="w-full accent-accent-blue"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>10%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Umbrella className="w-3.5 h-3.5 text-accent-blue" />
                    Rain Probability
                  </span>
                  <span className="font-mono text-white font-bold">{rainProb}%</span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={100}
                  value={rainProb}
                  onChange={(e) => setRainProb(Number(e.target.value))}
                  className="w-full accent-accent-blue"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

            </div>

            <button
              onClick={runPrediction}
              disabled={isAnalyzing}
              className={`w-full py-2.5 rounded-xl font-bold text-xs text-navy-dark transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isAnalyzing 
                  ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30 cursor-not-allowed'
                  : 'bg-accent-blue hover:bg-accent-cyan'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Generating Stress Report...
                </>
              ) : (
                <>
                  <Sprout className="w-3.5 h-3.5" />
                  Calculate Stress Prediction
                </>
              )}
            </button>
          </div>

        </div>

        {/* RESULTS & PREDICTION VIEW (5 Cols) */}
        <div className="lg:col-span-5 bg-navy-light border border-accent-blue/15 text-white rounded-2xl p-6 shadow-xl min-h-[400px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            
            {isAnalyzing && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 space-y-6"
              >
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-navy-dark" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-accent-blue border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  <Sprout className="w-6 h-6 text-accent-blue animate-pulse" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-bold text-sm font-display text-white">Analyzing Crop Vitals</h4>
                  <p className="text-[10px] text-slate-400 font-mono">{analysisProgress}% Complete</p>
                </div>

                <div className="bg-navy-dark border border-accent-blue/15 p-2.5 rounded-xl max-w-xs mx-auto">
                  <p className="text-[10px] font-mono text-accent-cyan truncate animate-pulse">
                    {analysisStep}
                  </p>
                </div>
              </motion.div>
            )}

            {!isAnalyzing && analysisResult && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 text-left"
              >
                {/* Condition & Status Badge */}
                <div className="flex justify-between items-start border-b border-navy-dark pb-3">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-accent-blue tracking-wider">Condition Diagnosis</span>
                    <h3 className="text-base font-bold font-display text-white mt-0.5">
                      {analysisResult.condition}
                    </h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider shrink-0 ${getStressBadge(analysisResult.stressLevel)}`}>
                    {analysisResult.stressLevel}
                  </span>
                </div>

                {/* Circular risk gauge & indicator */}
                <div className="p-4 bg-navy-dark border border-accent-blue/15 rounded-xl flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-medium">Risk Factor Score</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold font-mono text-white">
                        {analysisResult.riskScore}
                      </span>
                      <span className="text-xs text-slate-500">/ 100</span>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-tight">
                      {analysisResult.riskScore > 70 
                        ? 'Critical moisture or disease stress detected. Corrective water & fertilizer dosage required.' 
                        : analysisResult.riskScore > 30 
                        ? 'Mild stress observed. Monitor soil conditions closely.' 
                        : 'Lush crop health with optimal chlorophyll conversion.'}
                    </p>
                  </div>

                  {/* Circle SVG */}
                  <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="28" cy="28" r="24" stroke="currentColor" className="text-navy-light" strokeWidth="4" fill="transparent" />
                      <circle 
                        cx="28" 
                        cy="28" 
                        r="24" 
                        stroke="currentColor" 
                        className={analysisResult.riskScore > 70 ? 'text-rose-500' : analysisResult.riskScore > 40 ? 'text-amber-500' : 'text-emerald-400'} 
                        strokeWidth="4" 
                        fill="transparent" 
                        strokeDasharray={151}
                        strokeDashoffset={151 - (151 * analysisResult.riskScore) / 100}
                      />
                    </svg>
                    <span className="absolute text-[10px] font-mono font-bold text-white">
                      {analysisResult.riskScore}%
                    </span>
                  </div>
                </div>

                {/* Side parameters */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-navy-dark border border-accent-blue/15 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Affected Canopy</span>
                    <p className="text-sm font-bold font-mono mt-0.5 text-white">{analysisResult.affectedLeafArea}%</p>
                  </div>
                  <div className="p-2.5 bg-navy-dark border border-accent-blue/15 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Nutrient Deficit</span>
                    <p className="text-xs font-bold mt-0.5 text-slate-200 truncate">{analysisResult.nutrientDeficiency}</p>
                  </div>
                </div>

                {/* Actionable treatment lists */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-accent-blue" />
                    Corrective Treatment Guidelines
                  </h4>
                  <ul className="space-y-1.5">
                    {analysisResult.recommendedActions.map((action, idx) => (
                      <li key={idx} className="text-xs text-slate-300 leading-relaxed bg-navy-dark p-2.5 rounded-lg border border-accent-blue/10 flex items-start gap-2">
                        <span className="font-mono text-accent-blue font-bold shrink-0">{idx + 1}.</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-navy-dark text-center text-[10px] text-slate-500">
                  Forecast run with Temp: {temp}°C, Humidity: {humidity}%, Rain: {rainProb}%
                </div>
              </motion.div>
            )}

            {!isAnalyzing && !analysisResult && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-slate-500 space-y-4"
              >
                <CloudSun className="w-12 h-12 mx-auto text-slate-700 animate-pulse" />
                <div className="max-w-xs mx-auto">
                  <h4 className="font-bold text-slate-400 text-xs">Waiting for Input Selection</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Please upload an image of a crop leaf or select one of our pre-compiled healthy/stressed templates on the left, then click analyze.
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
