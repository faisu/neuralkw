export type ClusterId =
  | "electricity-bills"
  | "power-bill"
  | "bijli-bill"
  | "light-bill";

export type ClusterPath = "/" | "/power-bill" | "/bijli-bill" | "/light-bill";

export type ClusterClass =
  | "cluster-electricity"
  | "cluster-power"
  | "cluster-bijli"
  | "cluster-light";

export type ClusterConfig = {
  id: ClusterId;
  path: ClusterPath;
  clusterClass: ClusterClass;
  lang: "en-IN" | "hi-IN";
  tone: "formal" | "conversational" | "hinglish" | "colloquial";
  h1: string;
  sub: string;
  threeUp: { title: string; body: string }[];
  howItWorks: { title: string; body: string }[];
  contentBody: { h2: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
  title: string;
  description: string;
  toolDefaultTab: "autofetch" | "upload";
  toolHeading: string;
  ctaLabels: { high: string; mid: string; low: string };
  showWhatsAppShare: boolean;
  useCaseStrip?: { label: string; sampleConsumerNumber: string }[];
  /** Optional extra block id for power-bill before/after */
  showBeforeAfter?: boolean;
};

const para = (...lines: string[]) => lines;

export const CLUSTERS: Record<ClusterId, ClusterConfig> = {
  "electricity-bills": {
    id: "electricity-bills",
    path: "/",
    clusterClass: "cluster-electricity",
    lang: "en-IN",
    tone: "formal",
    h1: "Understand and reduce your electricity bills — across every state in India",
    sub: "Paste your consumer number or upload a bill. We'll explain every charge and show you exactly where you're overpaying.",
    threeUp: [
      {
        title: "Your bill, decoded",
        body: "Line-by-line charges with one-line plain-English notes. Example: Energy charge ₹4,18,200 — units you consumed this cycle at your tariff slab.",
      },
      {
        title: "What we noticed",
        body: "Up to four ranked findings — e.g. contract demand 250 kVA vs recorded max 138 kVA. Estimated savings ₹16,800/month when right-sized.",
      },
      {
        title: "Estimated monthly savings",
        body: "A single headline number from your bill plus current tariff orders. Footnoted: real savings depend on implementation and metering.",
      },
    ],
    howItWorks: [
      {
        title: "1. Fetch or upload",
        body: "DISCOM + consumer number, or PDF/JPG/PNG of your latest bill.",
      },
      {
        title: "2. We read the bill",
        body: "We identify DISCOM, tariff category, and billing period against published orders.",
      },
      {
        title: "3. You get the breakdown",
        body: "Decoded charges, findings, and a savings range you can share internally.",
      },
      {
        title: "4. Qualify in three taps",
        body: "Sites, spend band, email — we route high-spend multi-site businesses to the right next step.",
      },
    ],
    contentBody: [
      {
        h2: "Why electricity bills in India are uniquely complex",
        paragraphs: para(
          "DISCOMs operate under state regulators with different tariff schedules, pass-through charges, and time-of-day rules. Multi-site firms compound that with mixed LT/HT connections and open-access options.",
          "That complexity is why a structured bill read beats a one-line comparison from a broker.",
        ),
      },
      {
        h2: "The eight charges on every C&I electricity bill",
        paragraphs: para(
          "Most commercial and industrial bills bundle energy, wheeling, demand, reactive power, fuel adjustment, regulatory charges, duties, and arrears. Each has a defensible basis in your tariff order — and each is a place where mis-classification shows up.",
        ),
      },
      {
        h2: "How multi-site businesses are reducing electricity costs by 15–35%",
        paragraphs: para(
          "Typical levers: contract demand alignment, PF correction, time-of-day load shifting where TOU applies, and tariff-category audits after capex changes.",
          "We surface the signals from your bill; your facilities team and advisor decide the implementation path.",
        ),
      },
      {
        h2: "What changes with smart metering and Open Access",
        paragraphs: para(
          "Granular interval data and open-access procurement change which line items move month to month. The bill format stays the anchor — we still read it the same way.",
        ),
      },
    ],
    faqs: [
      {
        q: "What information do I need to check my electricity bill?",
        a: "Your DISCOM name, consumer or contract account number, and a recent bill PDF or photo. If you only have the SMS from your DISCOM, the consumer number there is usually enough for fetch where supported.",
      },
      {
        q: "How do NeuralKW savings estimates work?",
        a: "We compare your billed parameters to the tariff order in effect for your category and DISCOM, then apply conservative assumptions. Numbers are estimates for discussion — not a guarantee.",
      },
      {
        q: "Is my bill data safe?",
        a: "We process your bill for the explainer, retain files only as stated in our privacy policy, and do not sell your data. Bill data is handled with India residency in mind.",
      },
      {
        q: "Do you support every DISCOM?",
        a: "We maintain broad coverage across states. If a DISCOM is not yet mapped for automated savings rules, you still get charge decoding and we can notify you when deeper rules go live.",
      },
      {
        q: "Who is this for?",
        a: "Facility heads, finance controllers, and operations teams managing one or many sites. Residential users can read charges; the qualification flow targets businesses.",
      },
      {
        q: "How fast is the decoder?",
        a: "Most uploads return a structured read in seconds. If extraction is uncertain, we ask you to confirm fields before showing findings.",
      },
      {
        q: "Can I share the output with my CA or EPC vendor?",
        a: "Yes — export or copy the decoded sections. Methodology links sit beside each savings line so third parties can reproduce the math.",
      },
      {
        q: "What file types can I upload?",
        a: "PDF, JPG, PNG, WEBP, and HEIC up to 10 MB. On mobile you can capture directly from the camera.",
      },
    ],
    title: "Electricity Bills India — Decode & Reduce | NeuralKW",
    description:
      "Decode electricity bills across India: charges explained, savings signals, multi-site friendly. Paste consumer number or upload — start free.",
    toolDefaultTab: "autofetch",
    toolHeading: "Check your bill",
    ctaLabels: {
      high: "Book a call with the NeuralKW team",
      mid: "Get the full report + a call if you want one",
      low: "Email me the full report",
    },
    showWhatsAppShare: false,
  },
  "power-bill": {
    id: "power-bill",
    path: "/power-bill",
    clusterClass: "cluster-power",
    lang: "en-IN",
    tone: "conversational",
    h1: "Decode your power bill in 30 seconds",
    sub: "Drop your bill or enter your consumer number. We'll show you every charge in plain English — and the ones you can lower.",
    threeUp: [
      {
        title: "Read it like a human",
        body: "₹ fixed charges, ₹ energy, ₹ demand — each with a one-liner you can forward to your branch manager without a spreadsheet.",
      },
      {
        title: "Spot the leaks",
        body: "Example: FPPCA spike vs last month, or PF surcharge when your power factor slipped below 0.9.",
      },
      {
        title: "Know what you can save",
        body: "Headline ₹/month from realistic levers — demand correction, TOU shift, tariff category check.",
      },
    ],
    howItWorks: [
      { title: "Pick your DISCOM", body: "Search by state or acronym — we match what people actually type." },
      { title: "Paste or upload", body: "Consumer number from SMS, or a clear photo of the bill." },
      { title: "Get the plain-English read", body: "Charges, findings, savings headline — in that order." },
      { title: "Tell us your scale", body: "Connections + spend band — we follow up the way that fits." },
    ],
    contentBody: [
      {
        h2: "Why is my power bill so high?",
        paragraphs: para(
          "Six usual suspects: estimated reads when the meter reader missed a cycle; FPPCA or fuel surcharge spikes; demand charge creep when MD moved up; PF penalties; wrong LT vs HT category after load change; seasonal cooling or heating load without TOU planning.",
          "We flag which of these show up on your bill so you stop guessing.",
        ),
      },
      {
        h2: "SME owners: what to check first",
        paragraphs: para(
          "Start with billing period days, recorded MD, and whether the read is actual or estimated. Those three fields explain more disputes than anything else.",
        ),
      },
      {
        h2: "When to escalate to your DISCOM or forum",
        paragraphs: para(
          "If the bill shows an estimated read three cycles in a row, or a tariff label that does not match your sanctioned load, open a ticket with evidence from the decoder output.",
        ),
      },
    ],
    faqs: [
      {
        q: "Is this really free?",
        a: "Yes — the decoder and summary are free. We ask for email only to send your report and optional follow-up.",
      },
      {
        q: "My bill is messy — will a photo work?",
        a: "Usually yes. If confidence is low, we show uncertain fields and let you edit before we publish findings.",
      },
      {
        q: "Do you store my bill forever?",
        a: "No — see the privacy policy for retention. We delete uploaded files on the stated schedule.",
      },
      {
        q: "Can I use this for multiple shops?",
        a: "Run one bill at a time here; tell us how many connections you operate in the qualification step so we can route you correctly.",
      },
      {
        q: "What if my DISCOM portal is down?",
        a: "Switch to upload — we keep your typed consumer number so you do not retype.",
      },
      {
        q: "How accurate are the savings numbers?",
        a: "They are directional estimates from tariff math, not a signed savings guarantee.",
      },
      {
        q: "Do you cover rural feeders?",
        a: "If your DISCOM is listed, run it. Rural-specific riders still decode from the same bill layout family.",
      },
      {
        q: "Who built NeuralKW?",
        a: "Neural Kilowatt — built for teams that live inside electricity bills every month.",
      },
    ],
    title: "Power Bill Decoder India — Plain English | NeuralKW",
    description:
      "Decode your power bill fast: every charge explained, leaks flagged, savings headline. Upload or consumer number — try it free.",
    toolDefaultTab: "autofetch",
    toolHeading: "Decode your power bill",
    ctaLabels: {
      high: "Book a call with the NeuralKW team",
      mid: "Get the full report + a call if you want one",
      low: "Email me the full report",
    },
    showWhatsAppShare: false,
    showBeforeAfter: true,
  },
  "bijli-bill": {
    id: "bijli-bill",
    path: "/bijli-bill",
    clusterClass: "cluster-bijli",
    lang: "hi-IN",
    tone: "hinglish",
    h1: "बिजली बिल समझें, पैसे बचाएं",
    sub: "Apna consumer number daalein ya bill ki photo upload karein. Hum har charge ka matlab batayenge — aur kahan paise bach sakte hain.",
    threeUp: [
      {
        title: "Bill summary",
        body: "Total ₹12,480 · due date · 31 days supply · 420 kWh · effective ₹29.7/kWh — sab upar ek card mein.",
      },
      {
        title: "Har charge ka matlab",
        body: "Energy charge: ₹X (yeh aapke use kiye gaye units ka paisa hai) — har line ke niche ek line.",
      },
      {
        title: "Findings + savings",
        body: "Zaroori cheezein pehle: estimated reading, FPPCA spike, ya galat category — rang-coded cards.",
      },
    ],
    howItWorks: [
      { title: "1. DISCOM chuno", body: "State ya naam type karo — list se match." },
      { title: "2. Number ya photo", body: "SMS wala consumer number sabse fast; photo bhi chalega." },
      { title: "3. Result dekho", body: "Charges, findings, ek headline savings number." },
      { title: "4. Business ho to batao", body: "Kitni connections, kitna kharch — sahi team se connect." },
    ],
    contentBody: [
      {
        h2: "Bijli bill mein konsa charge kya hota hai?",
        paragraphs: para(
          "Fixed charge, energy charge, fuel surcharge, duty — har DISCOM alag naam se likhta hai par concept same hai. Hum har line ko simple Hinglish mein map karte hain.",
        ),
      },
      {
        h2: "Bijli bill kaise check karein — har DISCOM ke liye",
        paragraphs: para(
          "Pehle apna state aur DISCOM identify karo. Consumer number bill ke top ya SMS mein milta hai. Portal slow ho to photo upload best option.",
        ),
      },
      {
        h2: "Bijli bill galat ho to kya karein?",
        paragraphs: para(
          "Estimated reading lagatar aaye to meter reading ke liye ticket kholna better hota hai. Category galat ho to sanctioned load aur actual use ka proof collect karo.",
        ),
      },
      {
        h2: "Multi-shop owners ke liye: ek dashboard mein sab bill",
        paragraphs: para(
          "Qualification form mein sites aur spend band batao — hum multi-site teams ko organised follow-up dete hain.",
        ),
      },
    ],
    faqs: [
      {
        q: "Bijli bill kaise dekhe consumer number se?",
        a: "Yahan DISCOM select karke consumer number daalo — jahan portal fetch supported hai, summary turant milega. Warna photo upload karo.",
      },
      {
        q: "Bijli bill mein fixed charge kyun lagta hai?",
        a: "Yeh aapke connection size aur tariff category se juda hota hai — network ka fixed cost cover karne ke liye.",
      },
      {
        q: "Kya yeh free hai?",
        a: "Haan — decoder free hai. Email sirf report bhejne ke liye.",
      },
      {
        q: "Photo blur hai — chalega?",
        a: "Kabhi-kabhi hum uncertain fields mark karke aapse confirm karwa lete hain.",
      },
      {
        q: "WhatsApp pe bhej sakte hain?",
        a: "Haan — output ke niche share button se apne CA ya partner ko summary bhejo.",
      },
      {
        q: "Ghar ka bill chalega?",
        a: "Samajhne ke liye haan; business routing multi-site spend ke hisaab se hota hai.",
      },
      {
        q: "Data safe hai?",
        a: "Privacy policy mein retention likha hai — bechtein nahi.",
      },
      {
        q: "Hindi numerals?",
        a: "Abhi default Arabic numerals — future toggle possible.",
      },
    ],
    title: "Bijli Bill Check Karein, Samjhein, Bachayein | NeuralKW",
    description:
      "Bijli bill check: consumer number ya photo se har charge samjho, savings signal dekho. Free, fast, India-wide DISCOM list.",
    toolDefaultTab: "autofetch",
    toolHeading: "Apna bijli bill check karein",
    ctaLabels: {
      high: "NeuralKW team se call book karein",
      mid: "Full report + call option",
      low: "Mujhe email mein full report bhejo",
    },
    showWhatsAppShare: true,
  },
  "light-bill": {
    id: "light-bill",
    path: "/light-bill",
    clusterClass: "cluster-light",
    lang: "en-IN",
    tone: "colloquial",
    h1: "Light bill ka pura hisaab — har charge ka matlab",
    sub: "Consumer number daalo ya bill upload karo. Sab samajh aa jayega, aur paisa kahan bach sakta hai bhi.",
    threeUp: [
      {
        title: "Bill summary card",
        body: "Total, due date, units, effective rate per unit — pehle screen par hi clear.",
      },
      {
        title: "Har charge simple words mein",
        body: "Shop-friendly language — bina heavy jargon ke.",
      },
      {
        title: "Jo dikh raha hai wahi batayenge",
        body: "Agar bill clean hai to woh bhi clearly likha hoga — phir multi-site visibility ka soft next step.",
      },
    ],
    howItWorks: [
      { title: "DISCOM + number", body: "Ya to bill ki photo — jo aasaan lage." },
      { title: "Ek minute mein breakdown", body: "Charges + findings order mein." },
      { title: "Save option", body: "Jahan realistic lagta hai wahan range." },
      { title: "Business detail", body: "Kitni dukaan / kitna bill — taaki sahi team follow up kare." },
    ],
    contentBody: [
      {
        h2: "Domestic vs commercial: common mix-up",
        paragraphs: para(
          "Kirana ya salon kabhi domestic category mein aa jata hai, kabhi commercial zyada lag jata hai. Bill header par LT category code dekho — galat ho to DISCOM correction request open karna worth hai.",
        ),
      },
      {
        h2: "Light bill check karte waqt teen cheezein",
        paragraphs: para(
          "Billing period kitne din ka hai, reading actual hai ya estimated, aur fixed + energy dono line items change hue hain ya nahi.",
        ),
      },
      {
        h2: "Chhote business ke liye practical tip",
        paragraphs: para(
          "Agar MD (recorded demand) badh raha hai lekin machines same hain, to wiring ya PF issue bhi check karo — bill par PF surcharge dikh jata hai.",
        ),
      },
    ],
    faqs: [
      {
        q: "Light bill aur electricity bill same hai?",
        a: "Haan — yahan 'light bill' se matlab aapka DISCOM bill hi hai. Hum usi ko decode karte hain.",
      },
      {
        q: "Consumer number kahan hota hai?",
        a: "Top section ya SMS mein — DISCOM ke hisaab se thoda layout alag ho sakta hai.",
      },
      {
        q: "English weak hai — chalega?",
        a: "Hinglish mix use kiya gaya hai taaki padhna easy ho.",
      },
      {
        q: "Bill upload safe hai?",
        a: "Haan — privacy policy padho; files retention wahan likha hai.",
      },
      {
        q: "Kitni der mein result?",
        a: "Zyaada tar cases mein turant; agar doubt ho to confirm karwayenge.",
      },
      {
        q: "Multi-outlet chain ke liye?",
        a: "Form mein sites select karo — hum enterprise routing dekh sakte hain.",
      },
      {
        q: "Payment link milega?",
        a: "Decoder payment nahi karta — official DISCOM channels use karo.",
      },
      {
        q: "NeuralKW kya karta hai?",
        a: "Bill padhkar charges samjhata hai aur savings signals deta hai — numbers footnote ke saath.",
      },
    ],
    title: "Light Bill Check — Har Charge Samjho | NeuralKW",
    description:
      "Light bill check karo: consumer number ya upload, har charge simple words, savings signal. Free, mobile-friendly, India DISCOMs.",
    toolDefaultTab: "autofetch",
    toolHeading: "Apna light bill check karo",
    ctaLabels: {
      high: "NeuralKW team se call book karo",
      mid: "Full report + call agar chaho",
      low: "Email mein full report bhejo",
    },
    showWhatsAppShare: true,
    useCaseStrip: [
      { label: "Kirana store", sampleConsumerNumber: "123456789012" },
      { label: "Restaurant", sampleConsumerNumber: "987654321098" },
      { label: "Salon", sampleConsumerNumber: "456789012345" },
      { label: "Multi-shop owner", sampleConsumerNumber: "789012345678" },
    ],
  },
};

export function clusterIdFromPath(path: string): ClusterId | null {
  if (path === "/" || path === "") return "electricity-bills";
  if (path === "/power-bill") return "power-bill";
  if (path === "/bijli-bill") return "bijli-bill";
  if (path === "/light-bill") return "light-bill";
  return null;
}
