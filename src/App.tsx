import React, { useState, useEffect, useRef } from 'react';
import Scene3D from './components/Scene3D';
import { HUD } from './components/HUD';
import { GamePhase, Stats, Scenario, Option } from './types';
import { INITIAL_STATS, LOADING_QUOTES } from './constants';
import { calculateOutcome } from './services/simulationEngine';
import { audioService } from './services/audioService';
import { generateDeck, drawScenario } from './services/contentLibrary';

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.MENU);
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [lastOutcome, setLastOutcome] = useState<string>("");
  const [loadingMessage, setLoadingMessage] = useState("Overheard: 'Loading patience...'"); 
  const [decisionTimeLeft, setDecisionTimeLeft] = useState(30);
  // REMOVED: loadingCountdown state to prevent re-renders
  
  // Refs for state access inside the heartbeat interval without closure staleness
  const phaseRef = useRef<GamePhase>(GamePhase.MENU);
  const loadStartTimeRef = useRef<number>(0);
  const decisionTimerRef = useRef<number | null>(null);

  // Sync Ref with State
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Initialize Deck on Mount
  useEffect(() => {
    generateDeck();
  }, []);

  // --- THE HEARTBEAT (Global Polling System) ---
  // Runs every 100ms. Checks if we are stuck in loading.
  useEffect(() => {
    const heartbeat = setInterval(() => {
      const now = Date.now();

      // LOADING LOGIC
      if (phaseRef.current === GamePhase.LOADING) {
        const elapsed = now - loadStartTimeRef.current;
        
        // PERFORMANCE FIX: We DO NOT update state here.
        // We only check if time is up.

        if (elapsed > 3000) {
          // FORCE TRANSITION
          console.log("Heartbeat: Loading complete. Forcing transition.");
          setPhase(GamePhase.DECISION);
        }
      }

    }, 100); // Check every 100ms

    return () => clearInterval(heartbeat);
  }, []);


  // Decision Timer (Local State Update)
  useEffect(() => {
    if (phase === GamePhase.DECISION) {
        setDecisionTimeLeft(30);
        decisionTimerRef.current = window.setInterval(() => {
            setDecisionTimeLeft((prev) => {
                if (prev <= 1) {
                    handlePanicTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    } else {
        if (decisionTimerRef.current) clearInterval(decisionTimerRef.current);
    }
    return () => {
        if (decisionTimerRef.current) clearInterval(decisionTimerRef.current);
    };
  }, [phase]);

  const handlePanicTimeout = () => {
      if (decisionTimerRef.current) clearInterval(decisionTimerRef.current);
      audioService.playFailure();
      setLastOutcome("FAILURE: PANIC! You stood there staring into the void for too long. The patient bit you. Shift wasted.");
      setStats(prev => ({
          ...prev,
          reputation: Math.max(0, prev.reputation - 10),
          shift: prev.shift - 5
      }));
      setPhase(GamePhase.RESULT);
  };

  const loadNewScenario = () => {
    try {
        // 1. Pick a random quote
        const randomQuote = LOADING_QUOTES[Math.floor(Math.random() * LOADING_QUOTES.length)];
        setLoadingMessage(randomQuote);
        
        // 2. Draw Scenario Synchronously (Pre-load)
        const scenario = drawScenario();
        if (!scenario) throw new Error("Scenario draw failed");
        setCurrentScenario(scenario);

        // 3. Start Loading Phase
        // CRITICAL: Set the timestamp REF before changing state
        loadStartTimeRef.current = Date.now();
        setPhase(GamePhase.LOADING);
        
    } catch (e) {
        console.error("Failed to load scenario:", e);
        setPhase(GamePhase.MENU);
    }
  };

  const handleStartShift = () => {
    setStats(INITIAL_STATS);
    generateDeck(); // Reshuffle for new game
    loadNewScenario();
  };

  const handleForceWake = () => {
    // Emergency Escape Hatch
    const scen = drawScenario();
    setCurrentScenario(scen);
    setPhase(GamePhase.DECISION);
  };

  const handleDrinkCoffee = () => {
    // Prevent drinking if full
    if (stats.coffee >= 95) return;

    audioService.playClick();
    setStats(prev => ({
        ...prev,
        coffee: Math.min(100, prev.coffee + 20),
        shift: Math.max(0, prev.shift - 2.5) // Costs 15 mins
    }));
  };

  const handleOptionSelect = (option: Option) => {
    if (!currentScenario) return;
    
    const result = calculateOutcome(option, stats);
    
    if (result.success) {
      audioService.playSuccess();
    } else {
      audioService.playFailure();
    }

    setLastOutcome(result.outcomeText);
    
    setStats(prev => {
        const newStats = { ...prev, ...result.statChanges };
        return newStats;
    });

    setPhase(GamePhase.RESULT);
  };

  const handleNext = () => {
    if (stats.shift <= 0 || stats.reputation <= 0 || stats.coffee <= 0) {
        setPhase(GamePhase.GAME_OVER);
    } else {
        loadNewScenario();
    }
  };

  return (
    <div className="w-full h-screen bg-slate-900 relative overflow-hidden font-sans">
      {/* 3D Background Layer - z-0 */}
      <div className="absolute inset-0 z-0">
        <Scene3D 
            patientTraits={currentScenario?.patientTraits} 
            propType={currentScenario?.propType}
            gamePhase={phase}
            lastOutcome={lastOutcome}
        />
      </div>

      {/* UI Layer - z-10 */}
      <div className="absolute inset-0 z-10">
        <HUD 
          stats={stats}
          scenario={currentScenario}
          phase={phase}
          onOptionSelect={handleOptionSelect}
          onStartShift={handleStartShift}
          onForceWake={handleForceWake}
          onNext={handleNext}
          onDrinkCoffee={handleDrinkCoffee}
          loadingMessage={loadingMessage}
          lastOutcome={lastOutcome}
          decisionTimeLeft={decisionTimeLeft}
        />
      </div>
    </div>
  );
};

export default App;