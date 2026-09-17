export const studioCopy = {
  title: "Studio",
  eyebrow: "Preview",
  metaTitle: "Studio",
  metaDescription:
    "Upload a 2D floor plan and generate an interactive 3D property model, then preview walkthrough video, website, and pamphlet outputs.",
  back: "Back to site",
  waitlist: "Join waitlist",
  pipeline: {
    heading: "Pipeline",
    steps: [
      { id: "layout" as const, number: "01", label: "Layout" },
      { id: "model" as const, number: "02", label: "3D model" },
      { id: "assets" as const, number: "03", label: "Assets" },
    ],
  },
  upload: {
    heading: "Source layout",
    title: "Drop a floor plan",
    description: "or click to browse from your computer",
    formats: "PDF, PNG, JPG, or DXF · Max 25MB",
    sample: "Use sample layout",
    remove: "Remove",
    replace: "Replace",
    sampleName: "villa-12.png",
    sampleSize: "Sample plan",
  },
  config: {
    heading: "Project",
    name: "Project name",
    namePlaceholder: "Villa 12",
    unit: "Measurement unit",
    feet: "Feet",
    meters: "Meters",
    height: "Floor height",
  },
  convert: "Generate 3D model",
  converting: "Generating model…",
  regenerate: "Regenerate model",
  progress: [
    { id: "upload", at: 18, label: "Reading layout", detail: "Uploading and parsing the drawing." },
    { id: "analyze", at: 46, label: "Analyzing rooms", detail: "Detecting walls, rooms, and dimensions." },
    { id: "generate", at: 78, label: "Extruding 3D", detail: "Building the spatial model from the plan." },
    { id: "finalize", at: 100, label: "Finalizing", detail: "Preparing the interactive view." },
  ],
  result: {
    ready: "Model ready",
    from: "Generated from",
    rooms: "Rooms",
    view: "Interactive model",
  },
  rooms: [
    { name: "Living", ft: "428 sq ft", m: "40 m²" },
    { name: "Kitchen", ft: "186 sq ft", m: "17 m²" },
    { name: "Master suite", ft: "210 sq ft", m: "20 m²" },
    { name: "Study", ft: "92 sq ft", m: "9 m²" },
    { name: "Courtyard", ft: "164 sq ft", m: "15 m²" },
  ],
  viewer: {
    rotateLeft: "Rotate left",
    rotateRight: "Rotate right",
    reset: "Reset view",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    hint: "Drag to orbit",
  },
  assets: {
    heading: "Marketing assets",
    description: "Produce video, web, and print from the same model.",
    download: {
      title: "Download model",
      description: "Export the generated 3D property for sharing or downstream tools.",
      action: "Download",
    },
    video: {
      title: "Walkthrough video",
      description: "A presentation-ready film generated from this model.",
      action: "Generate video",
      pending: "Rendering walkthrough…",
      ready: "Walkthrough ready",
    },
    website: {
      title: "Property website",
      description: "An interactive listing site designed around the model.",
      action: "Create website",
      pending: "Assembling pages…",
      ready: "Site preview ready",
    },
    pamphlet: {
      title: "Pamphlet",
      description: "A professional leave-behind for print or digital packs.",
      action: "Generate pamphlet",
      pending: "Composing layout…",
      ready: "Pamphlet ready",
    },
  },
  gate: {
    title: "Exports open with early access",
    description:
      "Downloads and published assets ship with the full platform. Join the waitlist and we will write when they are available.",
    close: "Stay in studio",
  },
  errors: {
    type: "Use a PDF, PNG, JPG, or DXF file.",
    size: "File must be 25MB or smaller.",
  },
} as const;

export type StudioStepId = (typeof studioCopy.pipeline.steps)[number]["id"];
export type StudioAssetId = "video" | "website" | "pamphlet";
