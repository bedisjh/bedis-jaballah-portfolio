import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  Film, 
  Sparkles, 
  Download, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Play, 
  Image as ImageIcon,
  Monitor,
  Smartphone
} from 'lucide-react';
import { validateVideoAnimationParams } from '../../utils/portfolio-logic';

interface VideoAnimationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample photography from Bedis's portfolio available for instant testing
const SAMPLE_PHOTOS = [
  {
    id: 'sample-portrait',
    name: 'Bedis Jaballah (Portrait)',
    url: '/src/assets/images/bedis_jaballah_portrait.jpg',
    defaultPrompt: 'Cinematic subtle lighting sweep across the face with gentle ambient particles and realistic camera push-in.',
  },
  {
    id: 'sample-1',
    name: 'Media Direction',
    url: '/src/assets/images/enactus_media_management_1793959195984.jpg',
    defaultPrompt: 'Subtle cinematic slow zoom into the stage lighting with ambient lens flares.',
  },
  {
    id: 'sample-2',
    name: 'Tech Diagnostics',
    url: '/src/assets/images/personal_it_diagnostics_1793959196155.jpg',
    defaultPrompt: 'Gentle circuit glow pulsation and subtle depth of field shift.',
  },
  {
    id: 'sample-3',
    name: 'Startup Lab',
    url: '/src/assets/images/innova_live_tunisia_1793959195981.jpg',
    defaultPrompt: 'Gentle atmospheric camera pan across the creative workstation.',
  },
];

export const VideoAnimationModal: React.FC<VideoAnimationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [prompt, setPrompt] = useState<string>('Gentle cinematic motion, subtle breeze, soft lighting reflections.');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progressStage, setProgressStage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    setErrorMessage(null);
    setImageMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
        setGeneratedVideoUrl(null); // Reset previously generated video
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const selectSamplePhoto = async (sample: typeof SAMPLE_PHOTOS[0]) => {
    try {
      setErrorMessage(null);
      setPrompt(sample.defaultPrompt);
      
      // Fetch local asset and convert to base64 Data URL
      const response = await fetch(sample.url);
      const blob = await response.blob();
      setImageMimeType(blob.type || 'image/jpeg');
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedVideoUrl(null);
      };
      reader.readAsDataURL(blob);
    } catch {
      setSelectedImage(sample.url);
      setGeneratedVideoUrl(null);
    }
  };

  const handleGenerateVideo = async () => {
    const validation = validateVideoAnimationParams({
      image: selectedImage || '',
      aspectRatio,
      prompt,
    });

    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please provide a valid image and aspect ratio.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setProgressStage('Uploading image frames...');

    try {
      // Periodic progress status updates for realistic UX
      const statusTimer1 = setTimeout(() => {
        setProgressStage('Synthesizing motion vectors with gemini-omni-1.2-flash...');
      }, 1500);

      const statusTimer2 = setTimeout(() => {
        setProgressStage('Rendering temporal consistency and cinematic camera pan...');
      }, 5000);

      const response = await fetch('/api/animate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: selectedImage,
          mimeType: imageMimeType,
          aspectRatio, // '16:9' or '9:16'
          prompt,
        }),
      });

      clearTimeout(statusTimer1);
      clearTimeout(statusTimer2);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Video animation request failed.');
      }

      if (data.videoData) {
        const mime = data.mimeType || 'video/mp4';
        const videoSrc = `data:${mime};base64,${data.videoData}`;
        setGeneratedVideoUrl(videoSrc);
        setProgressStage('');
      } else {
        throw new Error('No video data returned from generation model.');
      }
    } catch (err: any) {
      console.error('Video animation error:', err);
      setErrorMessage(err.message || 'An error occurred while animating the photo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark backdrop blur overlay */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-4xl bg-[#0e0e16] border border-purple-500/30 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.2)] overflow-hidden z-10 my-auto text-left flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#12121e]/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  AI Motion Lab — Animate Image into Video
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold text-purple-300 bg-purple-950/70 border border-purple-500/40 rounded-full">
                  gemini-omni-1.2-flash
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Transform any still photo into cinematic video with aspect ratio control.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Error notification banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-300">Generation Notice</p>
                <p className="mt-0.5 text-zinc-300">{errorMessage}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Image Upload & Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold tracking-wider uppercase text-purple-400 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>1. Source Photo</span>
                </label>
                {selectedImage && (
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setGeneratedVideoUrl(null);
                    }}
                    className="text-xs text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    Clear photo
                  </button>
                )}
              </div>

              {/* Upload Dropzone or Photo Preview */}
              {!selectedImage ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[220px] ${
                    isDragOver
                      ? 'border-purple-400 bg-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                      : 'border-zinc-700/80 hover:border-purple-500/50 bg-zinc-900/40 hover:bg-zinc-900/70'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-200">
                    Click to upload or drag & drop photo
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Supports JPEG, PNG, WebP
                  </p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-zinc-700/80 bg-black group">
                  <img
                    src={selectedImage}
                    alt="Source to animate"
                    className="w-full h-56 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 justify-between">
                    <span className="text-[11px] font-mono text-zinc-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      Photo Loaded
                    </span>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs px-2.5 py-1 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-md border border-zinc-600 transition-colors"
                    >
                      Change Photo
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              )}

              {/* Quick Sample Presets */}
              <div>
                <p className="text-xs text-zinc-400 mb-2">Or test instantly with a portfolio photo:</p>
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_PHOTOS.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => selectSamplePhoto(sample)}
                      className="px-2.5 py-1.5 text-xs text-zinc-300 bg-zinc-900/80 hover:bg-purple-950/40 border border-zinc-800 hover:border-purple-500/40 rounded-lg transition-all text-left truncate flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
                      <span className="truncate">{sample.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Controls & Generation */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Aspect Ratio Selector (Mandatory Constraint: 16:9 or 9:16) */}
              <div>
                <label className="text-xs font-mono font-bold tracking-wider uppercase text-purple-400 block mb-2">
                  2. Video Aspect Ratio
                </label>
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Option 1: 16:9 Landscape */}
                  <button
                    type="button"
                    onClick={() => setAspectRatio('16:9')}
                    className={`p-3 rounded-xl border transition-all text-left flex items-start gap-3 ${
                      aspectRatio === '16:9'
                        ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.25)] text-white'
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-black/40 border border-zinc-700/60">
                      <Monitor className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-1.5">
                        <span>16:9</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-purple-300">Landscape</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Cinematic widescreen for web & desktop
                      </p>
                    </div>
                  </button>

                  {/* Option 2: 9:16 Portrait */}
                  <button
                    type="button"
                    onClick={() => setAspectRatio('9:16')}
                    className={`p-3 rounded-xl border transition-all text-left flex items-start gap-3 ${
                      aspectRatio === '9:16'
                        ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.25)] text-white'
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-black/40 border border-zinc-700/60">
                      <Smartphone className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-1.5">
                        <span>9:16</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-purple-300">Portrait</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Vertical video for TikTok & Reels
                      </p>
                    </div>
                  </button>

                </div>
              </div>

              {/* Motion Prompt */}
              <div>
                <label className="text-xs font-mono font-bold tracking-wider uppercase text-purple-400 block mb-2">
                  3. Motion Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={2}
                  placeholder="Describe desired motion (e.g., cinematic slow zoom, wind rustling leaves, gentle camera drift)..."
                  className="w-full px-3.5 py-2.5 bg-zinc-900/80 border border-zinc-700/80 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                />

                {/* Prompt Presets including Apple Exploded View Universal Prompt */}
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  <span className="text-[11px] text-zinc-500">Presets:</span>
                  <button
                    type="button"
                    onClick={() => setPrompt('Smoothly transition from the assembled to the exploded view, slow motion professional internal tech showcase, Apple style animation, high quality professional 3D explosion, slow with professional disassembly of the parts before showing exploded view.')}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-950/70 border border-purple-500/50 hover:bg-purple-900 text-purple-200 hover:text-white transition-colors flex items-center gap-1 shadow-sm"
                    title="Universal Prompt: Apple-style exploded view internal tech showcase"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Apple Tech Showcase (Exploded View)</span>
                  </button>
                  {[
                    'Cinematic slow zoom & light rays',
                    'Dynamic camera parallax rotation',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setPrompt(preset)}
                      className="text-[11px] px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGenerateVideo}
                  disabled={isLoading || !selectedImage}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_25px_rgba(168,85,247,0.35)] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-purple-200" />
                      <span>{progressStage || 'Synthesizing Video...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-purple-200 group-hover:scale-110 transition-transform" />
                      <span>Generate Video with Gemini Omni Flash</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

          {/* Generated Video Output Section */}
          {generatedVideoUrl && (
            <div className="mt-8 pt-6 border-t border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-white">Generated Video Output</span>
                  <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded">
                    {aspectRatio}
                  </span>
                </div>

                <a
                  href={generatedVideoUrl}
                  download={`bedis-motion-${aspectRatio.replace(':', 'x')}.mp4`}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-purple-300" />
                  <span>Download MP4</span>
                </a>
              </div>

              {/* Responsive Video Container adhering strictly to selected Aspect Ratio */}
              <div className="flex justify-center bg-black/60 rounded-xl p-4 border border-zinc-800">
                <div
                  className={`relative overflow-hidden rounded-lg border border-purple-500/30 shadow-2xl ${
                    aspectRatio === '16:9'
                      ? 'w-full max-w-2xl aspect-video'
                      : 'w-64 max-w-full aspect-[9/16]'
                  }`}
                >
                  <video
                    ref={videoRef}
                    src={generatedVideoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 border-t border-zinc-800/80 bg-[#0a0a10] flex items-center justify-between text-xs text-zinc-500">
          <span>Bedis Jaballah Creative Motion Tool · Powered by Gemini Interactions API</span>
          <span className="font-mono text-purple-400">gemini-omni-1.2-flash</span>
        </div>

      </div>
    </div>
  );
};
