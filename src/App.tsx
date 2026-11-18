import { useCallback, useEffect, useRef, useState } from 'react';
import { ContactFooterSection } from './components/ContactFooterSection';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { PinnedNarrativeTrack } from './components/PinnedNarrativeTrack';
import { PropertiesSection } from './components/PropertiesSection';
import { ScrollBackgroundCanvas } from './components/ScrollBackgroundCanvas';
import { startFramePreload } from './utils/frameSequenceCache';

export default function App() {
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [selectedPropertyForInquiry, setSelectedPropertyForInquiry] = useState('');
  const sequenceTrackRef = useRef<HTMLDivElement | null>(null);
  const smoothedProgressRef = useRef(0);

  useEffect(() => {
    const unsubscribe = startFramePreload((pct) => {
      setPreloadProgress(pct);
    });
    return unsubscribe;
  }, []);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleRequestViewing = useCallback(
    (propertyName: string) => {
      setSelectedPropertyForInquiry(propertyName);
      scrollToId('contact');
    },
    [scrollToId]
  );

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#171918]">
      {showLoader && (
        <LoadingScreen
          progress={preloadProgress}
          onComplete={() => setShowLoader(false)}
        />
      )}

      <Navbar onDiscoverClick={() => scrollToId('properties')} />

      <main>
        {/* Sticky 213-frame sequence canvas pinned behind Narrative Track and Curated Portfolio */}
        <div className="relative bg-[#171918]">
          <ScrollBackgroundCanvas
            trackRef={sequenceTrackRef}
            onSmoothedProgress={(p) => {
              smoothedProgressRef.current = p;
            }}
          />

          {/* Hero + 4 strictly sequential alternating chapters driven by the same smoothed progress */}
          <PinnedNarrativeTrack
            trackRef={sequenceTrackRef}
            progressRef={smoothedProgressRef}
            onExploreProperties={() => scrollToId('properties')}
            onDiscoverWorld={() => scrollToId('journey')}
          />

          {/* Curated Portfolio sits cleanly over the static final Frame 213 background */}
          <PropertiesSection onRequestViewing={handleRequestViewing} />
        </div>
      </main>

      <ContactFooterSection preselectedProperty={selectedPropertyForInquiry} />
    </div>
  );
}
