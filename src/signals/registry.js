const safeString = (value, fallback = 'Unavailable') => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  return fallback;
};

const readCanvasFingerprint = () => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      return 'Canvas unavailable';
    }

    context.textBaseline = 'top';
    context.font = '18px Arial';
    context.fillStyle = '#f60';
    context.fillRect(60, 1, 62, 20);
    context.fillStyle = '#069';
    context.fillText('signal portrait', 2, 2);
    context.fillStyle = 'rgba(102, 204, 0, 0.7)';
    context.fillText('solarfriendsin0', 4, 22);

    return canvas.toDataURL('image/png').slice(0, 160);
  } catch (error) {
    return 'Canvas blocked';
  }
};

const readWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
      return {
        status: 'Unavailable',
        vendor: 'Unavailable',
        renderer: 'Unavailable',
      };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unavailable';
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unavailable';

    return {
      status: 'Available',
      vendor: safeString(vendor),
      renderer: safeString(renderer),
      extensions: Array.from(gl.getSupportedExtensions() || []),
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    };
  } catch (error) {
    return {
      status: 'Blocked',
      vendor: 'Unavailable',
      renderer: 'Unavailable',
    };
  }
};

const readAudioFingerprint = () => {
  try {
    const AudioCtor = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!AudioCtor) {
      return { status: 'Unavailable' };
    }

    const context = new AudioCtor(1, 44100, 44100);
    const oscillator = context.createOscillator();
    const compressor = context.createDynamicsCompressor();

    oscillator.type = 'triangle';
    oscillator.frequency.value = 420;
    oscillator.connect(compressor);
    compressor.connect(context.destination);
    oscillator.start(0);
    oscillator.stop(0.05);

    return {
      status: 'Available',
      sampleRate: context.sampleRate,
      channelCount: context.destination.channelCount,
      baseLatency: context.baseLatency || 'Unavailable',
    };
  } catch (error) {
    return { status: 'Blocked' };
  }
};

const readTypographyProfile = () => {
  const fontList = [
    'Arial', 'Helvetica', 'Verdana', 'Georgia', 'Times New Roman', 'Courier New',
    'Trebuchet MS', 'Tahoma', 'Palatino', 'Garamond', 'DM Mono', 'Segoe UI', 'Monaco',
  ];

  const fontChecks = fontList.map((font) => ({ font, present: document.fonts ? document.fonts.check(`12px ${font}`) : false }));

  return {
    candidateFonts: fontChecks,
    emojiWidth: (() => {
      const probe = document.createElement('span');
      probe.textContent = '🙂';
      probe.style.fontSize = '32px';
      document.body.appendChild(probe);
      const width = probe.getBoundingClientRect().width;
      probe.remove();
      return width;
    })(),
  };
};

const readDisplayProfile = () => {
  const screen = window.screen || {};
  const viewport = window.visualViewport || {};

  return {
    screenWidth: screen.width,
    screenHeight: screen.height,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    pixelRatio: window.devicePixelRatio,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth,
    orientation: screen.orientation ? screen.orientation.type : 'Unavailable',
    visualScale: viewport.scale,
    windowOffsetX: window.screenX,
    windowOffsetY: window.screenY,
  };
};

const readLocaleProfile = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unavailable';
  const dateFormat = new Intl.DateTimeFormat(undefined, {
    timeZone,
    dateStyle: 'full',
    timeStyle: 'long',
  });

  return {
    language: navigator.language,
    languages: navigator.languages || [],
    timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    formattedNow: dateFormat.format(new Date()),
    calendar: Intl.DateTimeFormat().resolvedOptions().calendar || 'Unavailable',
    numberingSystem: Intl.DateTimeFormat().resolvedOptions().numberingSystem || 'Unavailable',
  };
};

const readAccessibilityProfile = () => ({
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  reducedTransparency: window.matchMedia('(prefers-reduced-transparency: reduce)').matches,
  colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  contrast: window.matchMedia('(prefers-contrast: more)').matches ? 'more' : 'no-preference',
  pointer: window.matchMedia('(pointer: coarse)').matches ? 'coarse' : 'fine',
  hover: window.matchMedia('(hover: hover)').matches ? 'hover' : 'none',
});

const readHardwareProfile = () => ({
  hardwareConcurrency: navigator.hardwareConcurrency || 'Unavailable',
  deviceMemory: navigator.deviceMemory || 'Unavailable',
  maxTouchPoints: navigator.maxTouchPoints || 'Unavailable',
  platform: navigator.platform || 'Unavailable',
  userAgent: navigator.userAgent || 'Unavailable',
  battery: navigator.getBattery ? 'Battery API available' : 'Battery API unavailable',
  storageEstimate: navigator.storage ? 'Storage estimate available' : 'Storage estimate unavailable',
  memoryHeap: performance.memory ? performance.memory.jsHeapSizeLimit : 'Unavailable',
});

const readNetworkProfile = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};

  return {
    effectiveType: connection.effectiveType || 'Unavailable',
    downlink: connection.downlink || 'Unavailable',
    rtt: connection.rtt || 'Unavailable',
    saveData: connection.saveData || false,
    online: navigator.onLine,
    type: connection.type || 'Unavailable',
  };
};

const readGestureProfile = () => {
  const latestPointers = {
    pointerType: 'Unavailable',
    x: 'Unavailable',
    y: 'Unavailable',
    isCoarse: window.matchMedia('(pointer: coarse)').matches,
  };

  const handler = (event) => {
    latestPointers.pointerType = event.pointerType || latestPointers.pointerType;
    latestPointers.x = event.clientX;
    latestPointers.y = event.clientY;
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('pointermove', handler, { once: true });
  }

  return latestPointers;
};

export const signalGroups = [
  {
    id: 'display',
    label: 'Display',
    description: 'Window size, viewport scale, and screen geometry.',
    defaultOn: true,
    collect: readDisplayProfile,
  },
  {
    id: 'locale',
    label: 'Locale & time',
    description: 'Language, timezone, calendar defaults, and local clock skew.',
    defaultOn: true,
    collect: readLocaleProfile,
  },
  {
    id: 'accessibility',
    label: 'Accessibility posture',
    description: 'Motion, contrast, and pointer preferences.',
    defaultOn: true,
    collect: readAccessibilityProfile,
  },
  {
    id: 'hardware',
    label: 'Hardware & network',
    description: 'CPU, memory, touch support, and connection quality.',
    defaultOn: false,
    collect: () => ({
      ...readHardwareProfile(),
      network: readNetworkProfile(),
    }),
  },
  {
    id: 'rendering',
    label: 'Rendering',
    description: 'Canvas/WebGL results, GPU names, and surfacing details.',
    defaultOn: false,
    collect: () => ({
      canvasHash: readCanvasFingerprint(),
      webgl: readWebGL(),
    }),
  },
  {
    id: 'audio',
    label: 'Audio',
    description: 'Offline render fingerprint and audio subsystem characteristics.',
    defaultOn: false,
    collect: readAudioFingerprint,
  },
  {
    id: 'typography',
    label: 'Typography',
    description: 'Font and emoji rendering signatures.',
    defaultOn: false,
    collect: readTypographyProfile,
  },
  {
    id: 'gesture',
    label: 'Gesture',
    description: 'Pointer posture and motion habits while the panel is open.',
    defaultOn: false,
    collect: readGestureProfile,
  },
];

export const signalGroupMap = Object.fromEntries(signalGroups.map((group) => [group.id, group]));

export const defaultSignalSettings = Object.fromEntries(
  signalGroups.map((group) => [group.id, Boolean(group.defaultOn)]),
);

export function getSignalSummary(groupId, data) {
  const entries = Object.entries(data || {});
  const firstPairs = entries.slice(0, 3).map(([key, value]) => [key, safeString(value, 'Unavailable')]);

  return firstPairs.length ? Object.fromEntries(firstPairs) : { status: 'No data' };
}
