import React, { useState, useEffect } from 'react';
import { Stats, Scenario, Option, GamePhase } from '../types';
import { audioService } from '../services/audioService';

interface HUDProps {
  stats: Stats;
  scenario: Scenario | null;
  phase: GamePhase;
  onOptionSelect: (opt: Option) => void;
  onStartShift: () => void;
  onForceWake: () => void;
  onNext: () => void;
  onDrinkCoffee: () => void;
  loadingMessage: string;
  lastOutcome?: string;
  decisionTimeLeft: number; 
  loadingCountdown?: number;
}

const StatBadge = ({ label, value, color = "bg-slate-700", subLabel, children }: { label: string, value?: string | number, color?: string, subLabel?: string, children?: React.ReactNode }) => (
  <div className={`flex flex-col items-center justify-center p-1 px-2 rounded shadow-md ${color} text-white min-w-[80px] h-14 border border-slate-600 relative overflow-hidden`}>
    <span className="text-[9px] uppercase font-bold tracking-wider opacity-80 z-10">{label}</span>
    {children ? children : <span className="text-lg font-mono font-bold leading-none mt-1 z-10">{value}</span>}
    {subLabel && <span className="text-[9px] opacity-60 z-10">{subLabel}</span>}
  </div>
);

const CaffeineMeter = ({ level }: { level: number }) => (
  <div className="w-full h-3 bg-black/50 mt-1 rounded-full overflow-hidden border border-white/20">
    <div 
      className={`h-full transition-all duration-500 ${level < 30 ? 'bg-red-500 animate-pulse' : 'bg-yellow-400'}`}
      style={{ width: `${level}%` }}
    />
  </div>
);

const TutorialModal = ({ onClose }: { onClose: () => void }) => (
    <div className="absolute inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 pointer-events-auto animate-in fade-in duration-300">
        <div className="bg-slate-800 border-4 border-yellow-400 p-8 max-w-2xl w-full shadow-2xl relative">
            <h2 className="text-4xl font-black text-yellow-400 mb-6 uppercase tracking-widest border-b-4 border-yellow-400 pb-2">
                Employee Orientation
            </h2>
            
            <div className="space-y-6 text-white font-sans text-lg">
                <div className="flex items-start gap-4">
                    <div className="text-3xl">⏰</div>
                    <div>
                        <strong className="text-yellow-400 block uppercase">The Clock is Ticking</strong>
                        <p className="text-slate-300 text-sm">Your shift ends at 13:00 (1:00 PM). Every patient interaction takes time. Drinking coffee wastes 15 minutes. Don't run out of time.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="text-3xl">☕</div>
                    <div>
                        <strong className="text-yellow-400 block uppercase">Caffeine is Life</strong>
                        <p className="text-slate-300 text-sm">If your caffeine hits 0%, you pass out and <span className="text-red-500 font-bold">DIE</span>. Click "DRINK" to recharge, but don't get "TOO WIRED" (&gt;95%) or you can't drink anymore.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="text-3xl">⚠️</div>
                    <div>
                        <strong className="text-yellow-400 block uppercase">Risk Management</strong>
                        <p className="text-slate-300 text-sm">
                            <span className="text-green-400 font-bold">LOW RISK</span> = Safe but boring.<br/>
                            <span className="text-red-500 font-bold">HIGH RISK</span> = 80% chance of failure/lawsuit, but huge rewards if you land it.
                        </p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="text-3xl">⏳</div>
                    <div>
                        <strong className="text-yellow-400 block uppercase">30 Second Rule</strong>
                        <p className="text-slate-300 text-sm">You have 30 seconds to decide per patient. If the timer hits zero, Dr. Waldrop panics.</p>
                    </div>
                </div>
            </div>
            <button onClick={onClose} className="w-full mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-2xl py-4 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none uppercase cursor-pointer">
                I Understand
            </button>
        </div>
    </div>
);

const ConfettiOverlay = () => {
    const [active, setActive] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => setActive(false), 4000); // Stop after 4s
        return () => clearTimeout(timer);
    }, []);

    if (!active) return null;

    return (
        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
            {Array.from({ length: 80 }).map((_, i) => (
                <div 
                    key={i}
                    className="absolute w-4 h-4 bg-red-500 animate-bounce"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `-50px`,
                        backgroundColor: ['#ef4444', '#eab308', '#3b82f6', '#22c55e'][Math.floor(Math.random() * 4)],
                        animation: `fall ${2 + Math.random() * 2}s linear infinite`,
                        animationDelay: `${Math.random()}s`,
                        transform: `rotate(${Math.random() * 360}deg)`
                    }}
                />
            ))}
            <style>{`
                @keyframes fall {
                    0% { transform: translateY(-50px) rotate(0deg); }
                    100% { transform: translateY(110vh) rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const MalpracticeOverlay = () => (
    <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="border-8 border-red-600 text-red-600 text-9xl font-black uppercase p-10 rotate-[-15deg] opacity-0 animate-stamp bg-white/80 backdrop-blur-sm">
            MALPRACTICE
        </div>
        <style>{`
            @keyframes stamp {
                0% { transform: scale(3) rotate(-15deg); opacity: 0; }
                100% { transform: scale(1) rotate(-15deg); opacity: 1; }
            }
            .animate-stamp {
                animation: stamp 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
        `}</style>
    </div>
);

export const HUD: React.FC<HUDProps> = ({
  stats,
  scenario,
  phase,
  onOptionSelect,
  onStartShift,
  onForceWake,
  onNext,
  onDrinkCoffee,
  loadingMessage,
  lastOutcome,
  decisionTimeLeft,
}) => {
  
  const [showTutorial, setShowTutorial] = useState(false);

  const handleOptionClick = (opt: Option) => {
    audioService.playClick();
    onOptionSelect(opt);
  };

  const handleStartShiftClick = () => {
      audioService.init(); 
      setShowTutorial(true);
  };

  const closeTutorialAndStart = () => {
      setShowTutorial(false);
      onStartShift();
  }

  const hoursPassed = (100 - stats.shift) / 10;
  const currentHour = 8 + Math.floor(hoursPassed);
  const minutes = Math.floor((hoursPassed % 1) * 60);
  const timeString = `${currentHour < 10 ? '0' : ''}${currentHour}:${minutes < 10 ? '0' : ''}${minutes}`;
  
  const isSuccess = lastOutcome?.startsWith("SUCCESS");
  const isFailure = lastOutcome?.startsWith("FAILURE");

  if (showTutorial) {
      return <TutorialModal onClose={closeTutorialAndStart} />;
  }

  if (phase === GamePhase.MENU) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 z-50 pointer-events-auto backdrop-blur-sm">
        <div className="max-w-2xl text-center p-8 border-4 border-white bg-slate-800 shadow-[20px_20px_0px_0px_#e53e3e] animate-in fade-in zoom-in duration-500">
            <h1 className="text-7xl font-black text-white mb-2 tracking-tighter font-sans drop-shadow-lg">CARDINAL<br/><span className="text-red-500">MEDICAL</span></h1>
            <p className="text-2xl text-slate-300 mb-8 font-mono border-t border-b border-slate-600 py-2">The Waldrop Ward</p>
            <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto">You are Dr. Waldrop. Your patients are absurd. 100 unique scenarios. Keep your caffeine up. Don't get sued.</p>
            <button onClick={handleStartShiftClick} className="px-10 py-5 bg-red-600 hover:bg-red-500 text-white font-black text-3xl tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform active:translate-y-1 active:shadow-none transition-all border-2 border-black cursor-pointer">BEGIN SHIFT</button>
        </div>
      </div>
    );
  }

  if (phase === GamePhase.GAME_OVER) {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-50 text-center p-8 pointer-events-auto">
          <div className="bg-white p-10 rounded max-w-lg border-8 border-red-600">
            <h1 className="text-6xl text-red-600 font-black mb-4 uppercase">Shift Over</h1>
            {stats.coffee <= 0 ? <p className="text-red-500 font-bold text-xl mb-4">CAUSE OF DEATH: CAFFEINE WITHDRAWAL</p> : null}
             {stats.shift <= 0 ? <p className="text-slate-500 font-bold text-xl mb-4">CLOCK HIT 13:00. MANDATORY NAP TIME.</p> : null}
            <div className="text-left font-mono text-lg space-y-2 mb-8 text-slate-800">
                 <p>Babies Delivered: <span className="font-bold">{stats.babies}</span></p>
                 <p>Lawsuits Filed: <span className="font-bold text-red-600">{stats.lawsuits}</span></p>
                 <p>Final Reputation: <span className="font-bold">{stats.reputation}%</span></p>
                 <hr className="border-black"/>
                 <p className="text-xl font-bold pt-2 text-center">{stats.reputation > 50 ? "STATUS: EMPLOYED (Barely)" : "STATUS: FIRED"}</p>
            </div>
            <button onClick={() => onStartShift()} className="w-full px-6 py-4 bg-black text-white font-bold text-xl hover:bg-slate-800 cursor-pointer">NEXT SHIFT</button>
          </div>
        </div>
    )
  }

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between h-full">
      {/* FULL SCREEN FX OVERLAYS */}
      {phase === GamePhase.RESULT && isSuccess && <ConfettiOverlay />}
      {phase === GamePhase.RESULT && isFailure && <MalpracticeOverlay />}

      {/* Top Bar */}
      <div className="bg-slate-800/95 border-b-4 border-black p-2 flex justify-between items-center pointer-events-auto shadow-xl z-20 backdrop-blur shrink-0">
        <div className="flex gap-2">
          <StatBadge label="Rep" value={`${stats.reputation}%`} color={stats.reputation < 50 ? 'bg-red-700' : 'bg-slate-600'} />
          <StatBadge label="Babies" value={stats.babies} color="bg-blue-600" />
          <StatBadge label="Lawsuits" value={stats.lawsuits} color={stats.lawsuits > 0 ? "bg-red-600" : "bg-green-600"} />
        </div>
        <div className="flex flex-col items-center">
            <h2 className="text-white font-bold tracking-widest text-lg">DR. WALDROP</h2>
            <div className="text-[10px] text-slate-400 font-mono">OBGYN ON CALL</div>
        </div>
        <div className="flex gap-2 items-center">
             <StatBadge label="Shift Timer" value={timeString} color="bg-slate-700" />
             <div className="flex items-center gap-1">
                <button 
                   disabled={stats.coffee >= 95 || stats.shift <= 0}
                   onClick={onDrinkCoffee}
                   className={`h-14 w-14 border border-black text-white rounded shadow-md flex flex-col items-center justify-center active:translate-y-1 transition-colors ${stats.coffee >= 95 ? 'bg-slate-600 cursor-not-allowed opacity-50' : 'bg-amber-800 hover:bg-amber-700 cursor-pointer'}`}
                   title="Drink Coffee (-15m shift time, +20 Caffeine)"
                >
                    <span className="text-xl">{stats.coffee >= 95 ? '🫨' : '☕'}</span>
                    <span className="text-[8px] font-bold text-amber-200">{stats.coffee >= 95 ? 'TOO WIRED' : 'DRINK'}</span>
                </button>
                <StatBadge label="Caffeine" color={stats.coffee < 30 ? 'bg-red-900' : 'bg-slate-800'}>
                    <CaffeineMeter level={stats.coffee} />
                    <span className="text-[9px] font-mono mt-1">{stats.coffee}%</span>
                </StatBadge>
             </div>
        </div>
      </div>

      {/* Main Interaction Layer */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Loading State */}
        {phase === GamePhase.LOADING && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 pointer-events-auto backdrop-blur-sm z-50">
            <div className="bg-white p-6 max-w-md w-full mx-4 border-4 border-black shadow-[12px_12px_0px_0px_#fbbf24]">
               <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-black uppercase italic text-slate-900">Overheard...</h2>
               </div>
               <div className="bg-yellow-100 p-4 border-l-4 border-yellow-400 text-md font-serif italic text-slate-800 mb-4 min-h-[80px] flex items-center">"{loadingMessage}"</div>
               <style>{` @keyframes loadBarFill { 0% { width: 0%; } 100% { width: 100%; } } .animate-load-fill { animation: loadBarFill 3s linear forwards; } `}</style>
               <div className="w-full h-6 bg-slate-700 border-2 border-black mt-2 relative shadow-inner">
                  <div className="h-full bg-yellow-400 border-r-2 border-black animate-load-fill">
                      <div className="w-full h-full opacity-20 bg-[length:10px_10px] bg-[linear-gradient(45deg,rgba(0,0,0,0.2)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2)_75%,transparent_75%,transparent)]" />
                  </div>
               </div>
               <div className="text-center text-[10px] font-bold uppercase mt-1 text-slate-500 tracking-widest">Processing Insanity...</div>
            </div>
          </div>
        )}

        {/* Right Sidebar - Patient File */}
        {(phase === GamePhase.DECISION || phase === GamePhase.RESULT) && scenario && (
          <div className="absolute right-2 top-2 bottom-2 w-[420px] flex flex-col pointer-events-auto z-10">
              <div className="flex-1 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)] flex flex-col h-full max-h-full overflow-hidden">
                <div className="bg-slate-800 p-3 border-b-4 border-black shrink-0">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Patient Record</span>
                        <span className="text-[10px] font-mono text-slate-400">ID: {scenario.id}</span>
                    </div>
                    <h2 className="text-xl font-black text-white leading-none truncate">{scenario.title}</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                    <div className="mb-4"><div className="bg-white p-3 border-l-4 border-red-500 italic text-sm text-slate-800 shadow-sm">"{scenario.complaint}"</div></div>
                    <div className="mb-4"><p className="text-slate-700 font-serif text-md leading-snug">{scenario.narrative}</p></div>
                    {phase === GamePhase.DECISION && (
                        <div className="mt-2 mb-4">
                             <div className="flex justify-between text-[10px] font-bold uppercase mb-1"><span>Decision Time</span><span className="text-red-600 animate-pulse">ACT NOW: {decisionTimeLeft}s</span></div>
                             <div className="w-full h-4 bg-gray-300 rounded border border-slate-400 overflow-hidden relative">
                                <div className="h-full bg-red-500 transition-all duration-1000 ease-linear" style={{width: `${(decisionTimeLeft / 30) * 100}%`}}></div>
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md">00:{decisionTimeLeft < 10 ? `0${decisionTimeLeft}` : decisionTimeLeft}</div>
                             </div>
                        </div>
                    )}
                    <div className="pb-2">
                        {phase === GamePhase.DECISION ? (
                            <div className="flex flex-col gap-3">
                                {scenario.options.map((opt) => (
                                    <button key={opt.id} onClick={() => handleOptionClick(opt)} className="w-full group relative bg-white border-2 border-slate-800 p-2 px-3 text-left hover:bg-blue-50 transition-all hover:border-blue-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none cursor-pointer">
                                        <div className="flex justify-between items-center mb-1"><span className="font-bold text-slate-900 text-base">{opt.label}</span><span className={`text-[9px] font-bold px-1 rounded uppercase border ${opt.risk.toLowerCase() === 'low' ? 'bg-green-100 border-green-500 text-green-900' : opt.risk.toLowerCase() === 'medium' ? 'bg-yellow-100 border-yellow-500 text-yellow-900' : 'bg-red-100 border-red-500 text-red-900'}`}>{opt.risk}</span></div>
                                        <div className="text-[11px] font-medium text-slate-600 leading-tight">{opt.description}</div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-800 text-white p-4 border-2 border-black animate-in slide-in-from-bottom-10 duration-300">
                                <h3 className={`font-black text-xl mb-1 ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>{isSuccess ? 'SUCCESS' : 'FAILURE'}</h3>
                                <p className="mb-4 text-sm font-serif leading-relaxed">{lastOutcome?.replace('SUCCESS:', '').replace('FAILURE:', '')}</p>
                                <button onClick={() => { audioService.playClick(); onNext(); }} className="w-full bg-yellow-400 text-black font-black py-3 border-2 border-black uppercase tracking-widest hover:bg-yellow-300 shadow-[4px_4px_0px_0px_#000] cursor-pointer">Next Patient</button>
                            </div>
                        )}
                    </div>
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};
