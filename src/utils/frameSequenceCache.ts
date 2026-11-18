import { VIDEO_FRAMES } from '../data/frames';

const imageCache: (HTMLImageElement | null)[] = new Array(VIDEO_FRAMES.length).fill(null);
let preloadStarted = false;
const progressListeners = new Set<(progress: number) => void>();
let loadedCount = 0;

function notifyProgress() {
  const pct = Math.min(100, Math.round((loadedCount / VIDEO_FRAMES.length) * 100));
  progressListeners.forEach((cb) => cb(pct));
}

function loadSingleFrame(index: number): Promise<HTMLImageElement | null> {
  if (imageCache[index]?.complete && imageCache[index]!.naturalWidth > 0) {
    return Promise.resolve(imageCache[index]);
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = VIDEO_FRAMES[index];
    img.onload = () => {
      imageCache[index] = img;
      loadedCount += 1;
      notifyProgress();
      resolve(img);
    };
    img.onerror = () => {
      loadedCount += 1;
      notifyProgress();
      resolve(null);
    };
  });
}

export function startFramePreload(onProgress?: (pct: number) => void): () => void {
  if (onProgress) {
    progressListeners.add(onProgress);
    onProgress(Math.min(100, Math.round((loadedCount / VIDEO_FRAMES.length) * 100)));
  }

  if (!preloadStarted) {
    preloadStarted = true;
    const priorityIndices = [0, 30, 60, 90, 120, 150, 180, 212];
    const prioritySet = new Set(priorityIndices);

    Promise.all(priorityIndices.map((idx) => loadSingleFrame(idx))).then(async () => {
      const remaining: number[] = [];
      for (let i = 0; i < VIDEO_FRAMES.length; i += 1) {
        if (!prioritySet.has(i)) remaining.push(i);
      }

      const batchSize = 12;
      for (let i = 0; i < remaining.length; i += batchSize) {
        const batch = remaining.slice(i, i + batchSize);
        await Promise.all(batch.map((idx) => loadSingleFrame(idx)));
      }
    });
  }

  return () => {
    if (onProgress) progressListeners.delete(onProgress);
  };
}

export function getBestLoadedFrame(targetIndex: number): HTMLImageElement | null {
  const clamped = Math.max(0, Math.min(VIDEO_FRAMES.length - 1, Math.round(targetIndex)));
  const exact = imageCache[clamped];
  if (exact && exact.complete && exact.naturalWidth > 0) {
    return exact;
  }

  for (let offset = 1; offset < VIDEO_FRAMES.length; offset += 1) {
    const before = clamped - offset;
    if (before >= 0 && imageCache[before]?.complete && imageCache[before]!.naturalWidth > 0) {
      return imageCache[before];
    }
    const after = clamped + offset;
    if (
      after < VIDEO_FRAMES.length &&
      imageCache[after]?.complete &&
      imageCache[after]!.naturalWidth > 0
    ) {
      return imageCache[after];
    }
  }
  return null;
}

export function drawCoverFrame(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth = canvasWidth;
  let drawHeight = canvasHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (canvasRatio > imgRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgRatio;
    offsetX = (canvasWidth - drawWidth) / 2;
  }

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}
