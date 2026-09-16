export const homeCopy = {
  hero: {
    headline: "From floor plan",
    headlineMuted: "to a living",
    headlineEnd: "3D story.",
    subcopy:
      "An end-to-end visualization platform for property marketing. Precise 3D from 2D, then video, website, and pamphlet — connected, without the overhead.",
    primaryCta: "Join waitlist",
    primaryHref: "/#waitlist",
    secondaryCta: "See how it works",
    secondaryHref: "/#workflow",
    trust: "Early access for developers, architects, and agencies.",
  },
  product: {
    heading: "One layout. Multiple possibilities.",
    subheading:
      "Create everything you need to showcase and market a property from a single 2D layout.",
    features: [
      {
        number: "01",
        title: "Layout to 3D",
        description: "Upload a floor plan. Generate a detailed, interactive 3D model.",
        input: "Floor Plan / 2D Layout",
        output: "3D Property Model",
        visual: "plan" as const,
      },
      {
        number: "02",
        title: "Walkthrough video",
        description: "Turn the model into a presentation-ready property video.",
        input: "3D Model",
        output: "Marketing Video",
        visual: "video" as const,
      },
      {
        number: "03",
        title: "Property website",
        description: "Publish an interactive site designed to showcase the project.",
        input: "3D Model",
        output: "Interactive Website",
        visual: "website" as const,
      },
      {
        number: "04",
        title: "Marketing pamphlet",
        description: "Export a professional leave-behind for print or digital.",
        input: "3D Model",
        output: "Digital / Printable Pamphlet",
        visual: "pamphlet" as const,
      },
    ],
  },
  manifesto: {
    statement:
      "Something studios are missing sits between CAD drawings and a finished marketing kit. We are building that connection — one layout, then the model, the walkthrough, the site, and the leave-behind.",
    headlineLead: "neuralkw is the",
    headlineMuted: "radically simple, deeply connected",
    headlineEnd: "tool for modern property marketing.",
  },
  capabilities: {
    heading: "Everything you need",
    modes: [
      {
        id: "visualize" as const,
        label: "Visualize",
        items: [
          {
            title: "Accurate 3D from 2D",
            description: "Multilayer spaces. Rooms shaped with precision from the plan you already have.",
            visual: "plan" as const,
          },
          {
            title: "Interactive property model",
            description: "Walk the space. Camera framing built in, ready to reuse across deliverables.",
            visual: "model" as const,
          },
          {
            title: "Shareable views",
            description: "Lock an angle. Hand the same view to video, web, and print.",
            visual: "model" as const,
          },
          {
            title: "Connected geometry",
            description: "Change a wall or a finish. Downstream assets stay in step.",
            visual: "plan" as const,
          },
        ],
      },
      {
        id: "market" as const,
        label: "Market",
        items: [
          {
            title: "Walkthrough video",
            description: "A presentation-ready property film generated from the same model.",
            visual: "video" as const,
          },
          {
            title: "Property website",
            description: "An interactive site for listings, launches, and stakeholder review.",
            visual: "website" as const,
          },
          {
            title: "Pamphlet",
            description: "A professional leave-behind for print desks and digital packs.",
            visual: "pamphlet" as const,
          },
          {
            title: "Campaign kit",
            description: "Video, web, and print from one source — not three disconnected tools.",
            visual: "website" as const,
          },
        ],
      },
    ],
  },
  workflow: {
    heading: "Everything you need to market a property",
    statement: "One platform. One workflow. Multiple marketing outputs.",
    steps: [
      {
        title: "2D Layout",
        description: "Start with a floor plan or architectural drawing.",
      },
      {
        title: "3D Model",
        description: "Generate a detailed, interactive property model.",
      },
      {
        title: "Video + Website + Pamphlet",
        description: "Produce the marketing assets you need to showcase the project.",
      },
    ],
  },
  useCases: {
    heading: "Built for the working studio",
    items: [
      {
        title: "Real estate developers",
        description: "Visualize projects and assemble marketing assets from the same model.",
        icon: "building" as const,
      },
      {
        title: "Architects",
        description: "Turn drawings into presentations clients can walk through.",
        icon: "draft" as const,
      },
      {
        title: "Interior designers",
        description: "Show realistic spaces before a single finish is ordered.",
        icon: "interior" as const,
      },
      {
        title: "Real estate agencies",
        description: "Create listing materials that hold up on screen and in hand.",
        icon: "key" as const,
      },
      {
        title: "Property marketers",
        description: "Generate video, web, and print without rebuilding the campaign.",
        icon: "megaphone" as const,
      },
      {
        title: "Construction companies",
        description: "Present the project visually to clients and stakeholders.",
        icon: "helmet" as const,
      },
    ],
  },
  why: {
    heading: "A clearer path from plan to presentation",
    items: [
      {
        title: "One layout, multiple outputs",
        description:
          "Start with a single 2D layout and produce a 3D model plus the marketing assets around it.",
      },
      {
        title: "Faster property visualization",
        description:
          "Move from drawings to a shareable 3D view without assembling a separate tool for every format.",
      },
      {
        title: "Reduce repetitive marketing work",
        description:
          "Reuse the same model for video, web, and print instead of rebuilding campaigns from scratch.",
      },
      {
        title: "Professional marketing assets",
        description:
          "Create materials designed for listings, presentations, and project launches.",
      },
      {
        title: "Interactive 3D experiences",
        description:
          "Give buyers and stakeholders a spatial view of the property rather than a static floor plan.",
      },
      {
        title: "Ready for digital and print",
        description:
          "Publish online with a property website, or export pamphlets for print and handouts.",
      },
    ],
  },
  film: {
    sceneDurationMs: 14000,
    clips: [
      {
        id: "layout-to-model",
        kind: "scene" as const,
        number: "01",
        title: "Layout to model",
        overline: "The conversion",
        caption: "A floor plan becomes a spatial model. Same rooms, same dimensions.",
        label: "Floor plan extruding into a three-dimensional property model",
      },
      {
        id: "living",
        kind: "video" as const,
        number: "02",
        title: "Living space",
        caption:
          "A furnished room, camera-ready. The walkthrough is generated from the same model.",
        src: "/videos/living.mp4",
        poster: "/videos/living.jpg",
        label: "Furnished modern living room interior",
      },
      {
        id: "inhabited",
        kind: "video" as const,
        number: "03",
        title: "Inside the view",
        overline: "Made for buyers",
        caption: "Lock an angle. Show the light, the glass, and how the space is used.",
        src: "/videos/inhabited.mp4",
        poster: "/videos/inhabited.jpg",
        label: "Glass-walled residence with a person in the space",
      },
    ],
  },
  showcase: {
    heading: "Models, video, web, print. Connected.",
    fromLabel: "FROM",
    fromTitle: "2D floor plan",
    toLabel: "TO",
    outputs: [
      { title: "3D property", visual: "model" as const },
      { title: "Video", visual: "video" as const },
      { title: "Website", visual: "website" as const },
      { title: "Pamphlet", visual: "pamphlet" as const },
    ],
  },
  waitlist: {
    eyebrow: "Early access",
    headline: "Join the waitlist",
    description:
      "We are getting ready to launch. Leave your details and we will write when the platform is available.",
    supporting: "No spam. Launch updates and early access only.",
    submit: "Join waitlist",
    pending: "Joining…",
  },
};
