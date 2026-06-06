// Amtech Cranes - Complete Site Data
// All images sourced from amtechcranes.com

const IMG = "https://amtechcranes.com/wp-content/uploads";

export const company = {
  name: "Amtech",
  fullName: "Amtech Cranes",
  tagline: "Engineering Excellence Since 1990",
  description:
    "At Amtech, we are passionate about engineering excellence. Founded in 1990, Amtech has grown into a trusted leader in the manufacturing of Electric Overhead Travelling (EOT) cranes, serving industries across India and around the globe. With a strong focus on innovation, quality, and customer satisfaction, we have successfully commissioned over 3,500 cranes — many to repeat customers — a testament to the trust our clients place in us.",
  founded: 1990,
  cranesCommissioned: "3,500+",
  facility: "50,000+ sq. meters",
  phone: ["+91 80545-10055", "+91 94172-05580", "+91 86999-99302"],
  email: "amtechmetal@gmail.com",
  address: "Gaddo Lakhowal Road, Chandigarh Road, Ludhiana",
  landmark: "1.8 Km from Kohara Chowk",
  city: "Ludhiana, Punjab, India",
  hours: "Monday – Saturday: 9:00 AM – 8:00 PM",
  logo: `${IMG}/2026/02/cropped-admin-ajax-1.png`,
  banner: `${IMG}/2025/11/Website-Banner-1.jpg`,
};

// Images used across the site
export const images = {
  // Homepage
  banner: `${IMG}/2025/11/Website-Banner-1.jpg`,
  aboutPreview: `${IMG}/2025/09/20230419_170848-scaled.jpg`,
  homeCrane: `${IMG}/2026/01/Firefly_Gemini-Flash_put-amtech-logo-on-that-crane-and-remobe-the-previous-logos-which-afe-there-309682-1.png`,

  // About page
  aboutMain: `${IMG}/2026/01/1635926133955.jpg`,
  aboutGallery1: `${IMG}/2025/09/Screenshot-2025-09-18-143159.png`,
  aboutGallery2: `${IMG}/2025/09/Screenshot-2025-09-18-143208.png`,
  aboutGallery3: `${IMG}/2025/09/Screenshot-2025-09-18-143221.png`,
  aboutGallery4: `${IMG}/2025/09/Screenshot-2025-09-18-143231.png`,
  aboutGallery5: `${IMG}/2025/09/Screenshot-2025-09-18-143319.png`,
  aboutGallery6: `${IMG}/2025/09/Screenshot-2025-09-18-143333.png`,

  // Manufacturing
  factory1: `${IMG}/2025/09/IMG20250224172414-scaled.jpg`,
  factory2: `${IMG}/2025/09/IMG20250418154915-scaled.jpg`,
  factory3: `${IMG}/2025/09/IMG20250418154948-scaled.jpg`,
  factory4: `${IMG}/2025/11/WhatsApp-Image-2025-11-04-at-14.49.04_5c488450-scaled.jpg`,
  factory5: `${IMG}/2025/11/WhatsApp-Image-2025-11-04-at-14.49.02_067d46d5-scaled.jpg`,
  factory6: `${IMG}/2025/11/WhatsApp-Image-2025-11-04-at-14.49.04_886ef737.jpg`,
  factoryCrane: `${IMG}/2026/01/Firefly_Gemini-Flash_put-amtech-logo-on-that-crane-and-remobe-the-previous-logos-which-afe-there-309682-2.png`,

  // Design advantage photos
  design1: `${IMG}/2025/09/IMG-20240113-WA0020-1024x768.jpg`,
  design2: `${IMG}/2025/09/IMG-20240217-WA0064-1024x768.jpg`,
  design3: `${IMG}/2025/09/IMG20250224135321-1024x768.jpg`,
  design4: `${IMG}/2025/09/IMG20250306162512-1024x768.jpg`,
  design5: `${IMG}/2025/09/IMG20250418154834-1024x768.jpg`,

  // Production
  production1: `${IMG}/2025/09/IMG-20240113-WA0022-1024x768.jpg`,
  production2: `${IMG}/2025/09/IMG20250418154948-1024x768.jpg`,
  production3: `${IMG}/2025/11/WhatsApp-Image-2025-11-04-at-14.49.01_ec120ebd-1024x768.jpg`,
  production4: `${IMG}/2025/11/WhatsApp-Image-2025-11-04-at-14.49.02_fd53ac48-1024x768.jpg`,

  // Automation / CNC
  cnc1: `${IMG}/2025/09/IMG20250418154845-1024x768.jpg`,
  cnc2: `${IMG}/2025/09/IMG20250418154915-1024x768.jpg`,
  cncSoftware: `${IMG}/2025/09/Picture2-1024x470.png`,

  // Services
  services: `${IMG}/2025/12/93c70acd-9142-4985-bf61-a7846da720cc.jpg`,

  // Contact
  contact: `${IMG}/2025/09/Firefly-20250917135242.png`,

  // Home page sections
  homeIndustry1: `${IMG}/2026/01/38fbfcdf-c035-4c32-b88f-de14258a65b4-1024x768.jpg`,
  homeIndustry2: `${IMG}/2026/01/d45d987c-230c-46a8-839d-1f8309f8fd81-1024x571.jpg`,
  homeIndustry3: `${IMG}/2026/01/fdc0ad4c-75d3-4f57-9559-d08164105408-scaled.jpg`,
  homeIndustry4: `${IMG}/2026/01/sdfghjkl-1024x768.jpg`,

  // ChatGPT generated product images
  productGeneric: `${IMG}/2026/02/ChatGPT-Image-Feb-10-2026-09_17_15-PM.png`,
};

export const stats = [
  { value: "35+", label: "Years of Experience" },
  { value: "3,500+", label: "Cranes Commissioned" },
  { value: "50,000+", label: "Sq. Mt. Facility" },
  { value: "500+", label: "Happy Clients" },
];

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Value Proposition",
    path: "#",
    children: [
      { label: "Crane Configurator", path: "/configurator" },
      { label: "ROI Calculator", path: "/roi-calculator" },
      { label: "Solution Finder", path: "/solution-finder" },
    ]
  },
  {
    label: "Equipments",
    path: "/products",
    children: [
      {
        label: "Single Girder EOT Cranes",
        path: "/products/single-girder-overhead-cranes",
      },
      {
        label: "Double Girder EOT Cranes",
        path: "/products/double-girder-overhead-cranes",
      },
      {
        label: "Semi Goliath / Gantry Cranes",
        path: "/products/semi-goliath-gantry-cranes",
      },
      {
        label: "Goliath / Gantry Cranes",
        path: "/products/goliath-gantry-cranes",
      },
      { label: "Jib Crane", path: "/products/jib-crane" },
      {
        label: "Wire Rope Electric Hoists",
        path: "/products/wire-rope-electric-hoists",
      },
      { label: "Transfer Trolley", path: "/products/transfer-trolley" },
    ],
  },
  {
    label: "Manufacturing",
    path: "/manufacturing",
    children: [
      { label: "Production", path: "/manufacturing/production" },
      { label: "Design Advantage", path: "/manufacturing/design-advantage" },
      { label: "Automation & Computerisation", path: "/manufacturing/automation-computerisation" },
    ],
  },
  {
    label: "Application By Industry",
    path: "/industries",
    children: [
      { label: "Steel Plants", path: "/industries/steel-plants" },
      { label: "Power Plants", path: "/industries/power-plants" },
      { label: "Paper Industry", path: "/industries/paper-industry" },
      { label: "Heavy Industry", path: "/industries/heavy-industry" },
    ],
  },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

export const products = [
  {
    id: "single-girder-overhead-cranes",
    name: "Single Girder EOT Cranes",
    tagline: "Streamline Your Material Handling with Our Single Girder EOT Crane",
    shortDesc:
      "Durable and efficient Single Girder Overhead Cranes designed for smooth and safe material handling with lightweight construction, low maintenance, and customizable capacities.",
    description:
      "Unlock efficiency and versatility in your material handling operations with our Single Girder Electric Overhead Travelling (EOT) Crane. Designed for versatility and reliability, this crane offers a cost-effective solution without compromising performance.",
    image: `${IMG}/2026/02/ChatGPT-Image-Feb-10-2026-09_17_15-PM.png`,
    heroImage: `${IMG}/2026/01/Firefly_Gemini-Flash_put-amtech-logo-on-that-crane-and-remobe-the-previous-logos-which-afe-there-309682.png`,
    galleryImage: `${IMG}/2025/11/WhatsApp-Image-2025-11-04-at-14.49.02_520c86de-1024x768.jpg`,
    features: [
      {
        title: "Compact Design",
        desc: "Smaller footprint suitable for facilities with limited space while maintaining excellent lifting capabilities.",
      },
      {
        title: "Optimized Performance",
        desc: "Impressive lifting capacity and precise control for efficient load handling across your facility.",
      },
      {
        title: "Smooth Operation",
        desc: "Advanced controls and precision-engineered components ensure reliable, consistent movements.",
      },
      {
        title: "Customizable Options",
        desc: "Variable speed controls, specialized lifting attachments, and adaptable safety features.",
      },
      {
        title: "Safety Features",
        desc: "Overload protection, emergency stop functions, and comprehensive safety protocols.",
      },
      {
        title: "Low Maintenance",
        desc: "Designed for ease of maintenance, reducing downtime and operating costs over its lifespan.",
      },
    ],
  },
  {
    id: "double-girder-overhead-cranes",
    name: "Double Girder EOT Cranes",
    tagline: "Elevate Your Lifting Operations with Our Double Girder EOT Crane",
    shortDesc:
      "Heavy-duty Double Girder Overhead Cranes built for high lifting capacities and demanding industrial applications with robust construction and superior stability.",
    description:
      "Elevate your lifting operations with our Double Girder EOT Crane. Built to withstand the toughest industrial environments, this crane delivers unparalleled lifting power and precision for demanding material handling applications.",
    image: `${IMG}/2026/02/ab189e70-e751-4326-9711-0f1d0309000e.jpg`,
    features: [
      {
        title: "Robust Construction",
        desc: "Built to withstand the toughest industrial environments with high-quality materials ensuring long-lasting durability.",
      },
      {
        title: "Extensive Span Options",
        desc: "Available in spans ranging from 5 meters to over 60 meters, accommodating facilities of virtually any size.",
      },
      {
        title: "High Lifting Capacity",
        desc: "Dual girders providing enhanced stability and strength for handling substantial loads with precision.",
      },
      {
        title: "Smooth Operation",
        desc: "Advanced controls and precision-engineered mechanisms for reliable, efficient movements.",
      },
      {
        title: "Customizable Options",
        desc: "Variable speed controls, specialized lifting attachments, and configurable safety features.",
      },
      {
        title: "Safety First",
        desc: "Overload protection, emergency stop functions, and comprehensive safety protocols for personnel and equipment.",
      },
    ],
  },
  {
    id: "semi-goliath-gantry-cranes",
    name: "Semi Goliath / Gantry Cranes",
    tagline: "Versatile Material Handling with Semi Goliath Double Girder Crane",
    shortDesc:
      "Versatile cranes combining double girder stability with semi-goliath ground mobility for flexible facility operations.",
    description:
      "A versatile material handling solution combining double girder stability with semi-goliath mobility. One end is supported by the runway beam and the other travelling on wheels along the ground, enabling efficient operations across your facility.",
    image: `${IMG}/2026/02/ChatGPT-Image-Feb-10-2026-09_24_01-PM.png`,
    features: [
      {
        title: "Double Girder Stability",
        desc: "Two robust girders spanning the width of your workspace provide enhanced stability and lifting capacity.",
      },
      {
        title: "Wide Span Range",
        desc: "Available from 5 meters to over 60 meters for versatile facility coverage.",
      },
      {
        title: "Semi-Goliath Configuration",
        desc: "One end supported by runway beam, the other travelling on wheels along the ground for flexible maneuvering.",
      },
      {
        title: "High Load Capacity",
        desc: "Engineered for handling heavy, bulky materials with consistent reliability.",
      },
      {
        title: "Smooth Operation",
        desc: "Advanced controls with precision-engineered mechanisms for optimal performance.",
      },
      {
        title: "Safety Systems",
        desc: "Overload protection, emergency stop functions, and comprehensive safety protocols.",
      },
    ],
  },
  {
    id: "goliath-gantry-cranes",
    name: "Goliath / Gantry Cranes",
    tagline: "Maximize Efficiency and Mobility with Our Goliath Girder Crane",
    shortDesc:
      "Full gantry cranes combining stationary strength with mobile flexibility for facility-wide operations.",
    description:
      "The Goliath Girder Crane combines the stability of a single girder design with the mobility of a goliath configuration. This unique blend of stationary strength and mobile flexibility enables operations across facility areas without permanent runway infrastructure.",
    image: `${IMG}/2026/02/ChatGPT-Image-Feb-10-2026-09_22_08-PM.png`,
    heroImage: `${IMG}/2026/01/Firefly_Gemini-Flash_put-amtech-logo-on-that-crane-642265.png`,
    features: [
      {
        title: "Girder Stability",
        desc: "Robust girder spanning workspace width ensures reliable strength for varied loads.",
      },
      {
        title: "Goliath Configuration",
        desc: "Legs or rails on both ends providing exceptional mobility across facility areas.",
      },
      {
        title: "Versatile Lifting",
        desc: "Handles components ranging from small items to heavy machinery effortlessly.",
      },
      {
        title: "Smooth Operation",
        desc: "Advanced controls deliver precise, efficient movements minimizing downtime.",
      },
      {
        title: "Customizable Options",
        desc: "Variable speed controls, specialized attachments, and configurable safety features.",
      },
      {
        title: "Safety Features",
        desc: "Overload protection, emergency stop functions, and comprehensive safety protocols.",
      },
    ],
  },
  {
    id: "jib-crane",
    name: "Jib Crane",
    tagline: "Versatile and Precise Lifting for Any Workspace",
    shortDesc: "Versatile jib cranes designed to meet precise lifting needs with a rotating horizontal arm on a vertical mast, providing extensive movement and coverage.",
    description: "Amtech Cranes specializes in versatile jib cranes designed to meet precise lifting needs. These cranes feature a rotating horizontal arm on a vertical mast, providing extensive movement and coverage. With sturdy construction and various configurations like wall mounted or floor-mounted, our jib cranes accommodate different spaces. Equipped with reliable hoists and trolleys, they ensure smooth and accurate lifting operations. Compact and ideal for limited workstations, they efficiently handle tasks like loading/unloading, material transfers, and heavy machinery maneuvering. Easy to operate and maintain, they minimize downtime. Amtech Cranes delivers customized solutions for small workshops to large industrial facilities, prioritizing quality, productivity, and operational safety.",
    image: `${IMG}/2026/02/ChatGPT-Image-Feb-10-2026-09_17_15-PM.png`,
    heroImage: `${IMG}/2026/01/Firefly_Gemini-Flash_put-amtech-logo-on-that-crane-and-remobe-the-previous-logos-which-afe-there-309682.png`,
    features: [
      {
        title: "Extensive Movement",
        desc: "Rotating horizontal arm on a vertical mast provides exceptional coverage and flexibility."
      },
      {
        title: "Various Configurations",
        desc: "Available in wall-mounted or floor-mounted options to accommodate different spatial requirements."
      },
      {
        title: "Space Efficient",
        desc: "Compact design makes them ideal for limited workstations and targeted material handling."
      },
      {
        title: "Smooth Operations",
        desc: "Equipped with reliable hoists and trolleys ensuring accurate lifting and maneuvering."
      },
      {
        title: "Easy Maintenance",
        desc: "Designed for simple operation and low maintenance to minimize operational downtime."
      },
      {
        title: "Customized Solutions",
        desc: "Adaptable for small workshops up to large industrial facilities prioritizing safety and productivity."
      }
    ]
  },
  {
    id: "wire-rope-electric-hoists",
    name: "Wire Rope Electric Hoists",
    tagline: "Engineered for Superior Lifting Performance",
    shortDesc:
      "Engineered for superior lifting performance, precision, and reliability. Designed for smooth operation and long service life.",
    description:
      "Amtech's Electric Wire Rope Hoists are engineered for superior lifting performance, precision, and reliability. Designed for smooth operation and long service life, these hoists are ideal for industrial environments demanding consistent performance.",
    image: `${IMG}/2026/02/ChatGPT-Image-Feb-10-2026-09_29_50-PM.png`,
    heroImage: `${IMG}/2026/02/ChatGPT-Image-Feb-10-2026-09_25_38-PM.png`,
    features: [
      {
        title: "High Lifting Efficiency",
        desc: "Powerful motors ensure smooth and reliable lifting operations at all capacities.",
      },
      {
        title: "Heavy-Duty Construction",
        desc: "Built with robust steel frames for long-term durability in harsh environments.",
      },
      {
        title: "Smooth & Low-Noise Operation",
        desc: "Precision gear systems reduce vibration and noise for a better work environment.",
      },
      {
        title: "Enhanced Safety Mechanisms",
        desc: "Includes overload protection, limit switches, and emergency shut-off systems.",
      },
      {
        title: "Compact & Space-Saving Design",
        desc: "Ideal for warehouses, factories, and production units with limited overhead space.",
      },
      {
        title: "Easy Maintenance",
        desc: "Modular components for quick inspection, servicing, and part replacement.",
      },
    ],
  },
  {
    id: "transfer-trolley",
    name: "Transfer Trolley",
    tagline: "Streamline Your Steel Furnace Ladle Transfer Operations",
    shortDesc:
      "Specialized Steel Furnace Ladle Transfer Trolleys designed to streamline ladle transfer and optimize steel furnace operations.",
    description:
      "Our Steel Furnace Ladle Transfer Trolleys are designed to streamline ladle transfer operations and optimize steel furnace processes through efficient transportation of molten metal ladles within manufacturing facilities.",
    image: `${IMG}/2025/11/WhatsApp-Image-2025-11-06-at-08.18.58_92e8e36c.jpg`,
    features: [
      {
        title: "Robust Construction",
        desc: "Built with rugged construction and high-quality materials capable of handling extreme steel production environments.",
      },
      {
        title: "Safe Movement",
        desc: "Advanced control systems and precision mechanisms minimize the risk of accidents during ladle transportation.",
      },
      {
        title: "Versatile Configuration",
        desc: "Available in various configurations and sizes to accommodate different ladle sizes, weights, and facility layouts.",
      },
      {
        title: "User-Friendly Operation",
        desc: "Intuitive operation requiring minimal training for efficient handling by operators.",
      },
      {
        title: "Safety Systems",
        desc: "Emergency stop mechanisms, overload protection, and secure locking systems.",
      },
      {
        title: "Customizable Capacity",
        desc: "Tailored to your specific operational requirements for maximum efficiency.",
      },
    ],
  },
];

export const services = [
  {
    id: "amc",
    name: "Annual Maintenance Contract",
    shortName: "AMC",
    desc: "Comprehensive annual maintenance plans to keep your equipment running at peak performance year-round.",
    icon: "FileCheck",
  },
  {
    id: "health-check",
    name: "Health Check",
    shortName: "Health Check",
    desc: "Thorough equipment diagnostics and evaluation to identify potential issues before they become problems.",
    icon: "HeartPulse",
  },
  {
    id: "modifications",
    name: "Modifications",
    shortName: "Modifications",
    desc: "Equipment alterations and upgrades to enhance capabilities and adapt to evolving operational needs.",
    icon: "Wrench",
  },
  {
    id: "modernization",
    name: "Modernization",
    shortName: "Modernization",
    desc: "System updates and improvements to bring legacy equipment up to current standards and technology.",
    icon: "RefreshCw",
  },
  {
    id: "repairs",
    name: "Repairs",
    shortName: "Repairs",
    desc: "Fast problem-diagnosis and quick response to ensure minimal downtime and smooth restoration of operations.",
    icon: "Hammer",
  },
  {
    id: "relocation",
    name: "Relocation",
    shortName: "Relocation",
    desc: "Professional equipment moving and reinstallation services ensuring safe transport and precise setup.",
    icon: "Truck",
  },
  {
    id: "commissioning",
    name: "Commissioning",
    shortName: "Commissioning",
    desc: "Complete equipment setup, activation, and testing to ensure optimal performance from day one.",
    icon: "CheckCircle",
  },
  {
    id: "readily-spares",
    name: "Readily Available Spares",
    shortName: "Spares",
    desc: "Quick access to genuine parts and components, minimizing wait times and keeping your operations running.",
    icon: "Package",
  },
];

export const industries = [
  {
    id: "steel-plants",
    name: "Steel Plants",
    desc: "Specialized cranes for steel melting shops, scrap feeding, ladle handling, and raw material transport — built to withstand extreme temperatures and heavy loads.",
    image: `${IMG}/2026/01/38fbfcdf-c035-4c32-b88f-de14258a65b4-1024x768.jpg`,
    icon: "Factory",
    clientLogo: `${IMG}/2026/01/hindustan-hydraulics_logo_2x.png`,
    applications: [
      "Ladle Handling Cranes",
      "Scrap Feeding Cranes",
      "Raw Material Handling",
      "Furnace Charging",
      "Hot Metal Transport",
    ],
  },
  {
    id: "power-plants",
    name: "Power Plants",
    desc: "Reliable crane systems for power generation facilities — designed for turbine maintenance, coal handling, and heavy equipment installation.",
    image: `${IMG}/2026/01/d45d987c-230c-46a8-839d-1f8309f8fd81-1024x571.jpg`,
    icon: "Zap",
    clientLogo: `${IMG}/2026/01/light_logo_t4jyjk-scaled.png`,
    applications: [
      "Turbine Hall Cranes",
      "Coal Handling Systems",
      "Maintenance Cranes",
      "Equipment Installation",
      "Boiler House Operations",
    ],
  },
  {
    id: "paper-industry",
    name: "Paper Industry",
    desc: "Precision crane solutions for paper mills — from raw material handling to finished product management, ensuring safe and efficient operations.",
    image: `${IMG}/2026/01/fdc0ad4c-75d3-4f57-9559-d08164105408-scaled.jpg`,
    icon: "FileText",
    clientLogo: `${IMG}/2025/09/Screenshot-2025-09-18-143221.png`,
    applications: [
      "Roll Handling Cranes",
      "Pulp Processing",
      "Machine Room Operations",
      "Warehouse Management",
      "Raw Material Storage",
    ],
  },
  {
    id: "heavy-industry",
    name: "Heavy Industry",
    desc: "Robust crane systems for heavy manufacturing and industrial operations — engineered for maximum reliability under the most demanding conditions.",
    image: `${IMG}/2026/01/sdfghjkl-1024x768.jpg`,
    icon: "HardHat",
    clientLogo: `${IMG}/2025/09/Screenshot-2025-09-18-143319.png`,
    applications: [
      "Assembly Line Cranes",
      "Heavy Part Handling",
      "Workshop Operations",
      "Loading & Unloading",
      "General Manufacturing",
    ],
  },
];

export const designAdvantages = [
  {
    title: "In-House Design Department",
    desc: "Dedicated design team utilizing customized software, 2D & 3D tools for complete crane customization to exact operational requirements.",
  },
  {
    title: "IS-Standard Compliance",
    desc: "All cranes designed and manufactured according to Indian Standards with open winch type design for quality and regulatory compliance.",
  },
  {
    title: "Proprietary Gearbox Design",
    desc: "Gearbox designed in-house according to IS Standards. Casings and pulleys are profile-cut from plates — no castings used.",
  },
  {
    title: "Premium Imported Components",
    desc: "Brakes, Malmedie couplings, and hooks imported from Europe for higher capacity cranes, guaranteeing international quality standards.",
  },
  {
    title: "Seamless Pipe Drums",
    desc: "Drums are made from seamless pipes for enhanced durability and performance, reducing failure points.",
  },
  {
    title: "Pre-Dispatch Testing",
    desc: "Every crane is fully wired up and checked before dispatch, with Federal Engineers inspection and verification of each unit.",
  },
  {
    title: "Standardized Wear Parts",
    desc: "Wear and tear parts are commercially available standard components, reducing client dependency on single-source vendors.",
  },
  {
    title: "Export-Ready Designs",
    desc: "Special export crane designs enabling containerized transport, serving clients across India and globally.",
  },
];

export const manufacturing = {
  facility: "Our massive state-of-the-art manufacturing facility is spread over approximately 50,000 square meters, equipped with the latest machinery and technology.",
  overview: "With an in-house design team that uses automation and computerisation to ensure the highest level of precision in the manufacturing process, we have invested heavily in our manufacturing capabilities to deliver the best possible products and services to our clients.",
  production: {
    title: "Production",
    desc: "Our facility features large and heavy fabrication facilities, sub-assembly centers, and a heavy machine shop equipped with CNC machines. All cranes receive complete assembly including actual cabins and electrical cables.",
    qualityNote: "Federal Engineers inspect and verify each unit before shipment. Our dedicated QA/QC division maintains consistent manufacturing standards.",
  },
  automation: {
    title: "Automation & Computerisation",
    desc: "Amtech is a distinguished crane manufacturer in India featuring state-of-the-art CNC capabilities for producing components like gearboxes, wheel assemblies, and drum assemblies internally.",
    benefits: [
      "Superior product quality",
      "Better dimensional accuracy",
      "Increased productivity levels",
      "Improved surface finish quality",
    ],
    machines: [
      "HMC Machine",
      "VTL Machine",
      "VMC",
      "CNC Hobbing Machine",
      "CNC Lathe Machine",
      "CNC VTL Machine",
      "CNC Cutting Machine",
      "Doosan Horizontal Machine",
      "Boring Machine",
    ],
    softwareNote: "The organization has implemented computer-based systems since 1986 and continues developing tailored software for design and estimation departments. Currently implementing SAP enterprise resource planning solutions.",
  },
  capabilities: [
    {
      title: "Ladle Handling Cranes",
      desc: "High-capacity cranes designed to transport and manoeuvre ladles carrying molten metal in a safe and efficient manner.",
    },
    {
      title: "Scrap Feeding Cranes",
      desc: "Extra heavy duty EOT cranes specially designed for feeding scrap into the furnace for steel production.",
    },
    {
      title: "Raw Material Handling",
      desc: "Extra heavy duty cranes critical for handling the raw material fed into the furnace safely and efficiently.",
    },
    {
      title: "Custom Crane Solutions",
      desc: "Tailored crane designs for specific operational requirements across any industrial application.",
    },
  ],
};

export const clientLogos = [
  { 
    name: "Sunflag Steel", 
    image: `${IMG}/2026/01/1635926133955.jpg`,
    industry: "Steel Plants",
    context: "Leading manufacturer of high-grade steel relying on our heavy-duty overhead cranes for constant ladle handling in extreme conditions."
  },
  { 
    name: "Ambuja Cement", 
    image: `${IMG}/2026/01/light_logo_t4jyjk-scaled.png`,
    industry: "Heavy Industry",
    context: "Global cement manufacturer utilizing our high-capacity gantry cranes for bulk material handling and continuous plant maintenance."
  },
  { 
    name: "Hindustan Hydraulics", 
    image: `${IMG}/2026/01/hindustan-hydraulics_logo_2x.png`,
    industry: "Engineering",
    context: "Premier hydraulic systems supplier utilizing our precision EOT cranes for massive component assembly and testing."
  },
  { 
    name: "Tata Power", 
    image: `${IMG}/2025/09/Screenshot-2025-09-18-143221.png`,
    industry: "Power Plants",
    context: "Major energy provider using our specialized turbine-handling cranes for critical maintenance during power station turnarounds."
  },
  { 
    name: "JSW Steel", 
    image: `${IMG}/2025/09/Screenshot-2025-09-18-143231.png`,
    industry: "Steel Manufacturing",
    context: "Integrating our robust scrap charging cranes into their primary melting operations for increased daily output."
  },
  { 
    name: "BILT Paper", 
    image: `${IMG}/2025/09/Screenshot-2025-09-18-143319.png`,
    industry: "Paper Mills",
    context: "Utilizing highly synchronized, automated wet-end cranes for precise paper roll handling without product damage."
  },
  { 
    name: "L&T Heavy Engineering", 
    image: `${IMG}/2025/09/Screenshot-2025-09-18-143208.png`,
    industry: "Heavy Fabrication",
    context: "Deploying our 100+ ton capacity double-girder cranes for maneuvering massive pressure vessels safely."
  },
  { 
    name: "Vedanta Resources", 
    image: `${IMG}/2025/09/Screenshot-2025-09-18-143159.png`,
    industry: "Mining & Metals",
    context: "Operating our ruggedized outdoor gantry systems for bulk ore management in highly abrasive environments."
  },
  { 
    name: "NTPC", 
    image: `${IMG}/2025/09/Screenshot-2025-09-18-143333.png`,
    industry: "Power Generation",
    context: "Relying on our explosion-proof hoist systems for safe operations within their specialized thermal power sectors."
  },
];

export const testimonials = [
  {
    name: "Jai Bharat Construction Industry",
    text: "The Gantry Cranes and Jib Cranes from Amtech are designed to perfection. Easy to operate, strong, and highly efficient.",
    rating: 5,
  },
  {
    name: "Arora Iron and Steels",
    text: "Amtech's Overhead EOT Cranes have been a game-changer for our operations. Their reliability and durability make production seamless.",
    rating: 5,
  },
  {
    name: "Sunflag Steel, Steel Industry",
    text: "We've been using Amtech's Ladle Handling and Scrap Charging Cranes for years. Their after-sales service is unmatched in the industry.",
    rating: 5,
  },
];

export const reviewStats = {
  totalStars: '540+',
  tagline: 'Over 540 "5 Stars" reviews and climbing',
  justDial: { reviews: '248', label: 'Reviews on Just Dial' },
  google: { reviews: '1,248', label: 'Reviews on Google' },
};
