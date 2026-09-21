import {
  // product engineering
  LayoutGrid, Compass, PenTool, Globe, Smartphone, FlaskConical, Replace, TestTube,
  // ai engineering
  Waypoints, Map, MessagesSquare, Workflow, Library, Sigma, Gauge, ScrollText,
  // data & cloud
  Database, ChartColumn, Cloud, ArrowRightLeft, Boxes, Activity, Coins,
  // teams & delivery
  Users, UserPlus, Building2, Lightbulb, LifeBuoy, FileLock2,
  // industries
  Landmark, HeartPulse, ShoppingCart, Truck, Layers, Zap,
  // how we work / company
  Route, Handshake, CalendarClock, Info, Briefcase, MapPin,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons live here, not in content/. The taxonomy should not know that a
 * navigation surface exists, let alone which icon set it uses.
 *
 * Keyed by slug. A missing key renders no icon rather than a fallback
 * glyph — a wrong icon is worse than none.
 */
export const categoryIcons: Record<string, LucideIcon> = {
  "product-engineering": LayoutGrid,
  "ai-engineering": Waypoints,
  "data-cloud": Database,
  "teams-delivery": Users,
};

export const leafIcons: Record<string, LucideIcon> = {
  // Product Engineering
  "product-strategy-discovery": Compass,
  "ux-ui-design": PenTool,
  "web-application-development": Globe,
  "mobile-application-development": Smartphone,
  "mvp-and-0-1": FlaskConical,
  "platform-modernisation": Replace,
  "qa-test-automation": TestTube,
  // AI Engineering
  "ai-readiness-roadmap": Map,
  "llm-application-development": MessagesSquare,
  "ai-agents-workflow-automation": Workflow,
  "rag-knowledge-systems": Library,
  "machine-learning-data-science": Sigma,
  "mlops-evaluation": Gauge,
  "ai-governance": ScrollText,
  // Data & Cloud
  "data-engineering": Database,
  "analytics-bi": ChartColumn,
  "cloud-architecture": Cloud,
  "cloud-migration": ArrowRightLeft,
  "devops-platform-engineering": Boxes,
  "reliability-observability": Activity,
  finops: Coins,
  // Teams & Delivery
  "dedicated-squads": Users,
  "embedded-engineers": UserPlus,
  "offshore-delivery-centre": Building2,
  "technical-advisory": Lightbulb,
  "support-maintenance": LifeBuoy,
  "security-compliance-engineering": FileLock2,
};

/** Dropdown menus are keyed by href — they have no slugs. */
export const menuIcons: Record<string, LucideIcon> = {
  "/industries/financial-services/": Landmark,
  "/industries/healthcare/": HeartPulse,
  "/industries/retail-commerce/": ShoppingCart,
  "/industries/logistics/": Truck,
  "/industries/saas-technology/": Layers,
  "/industries/energy-utilities/": Zap,
  "/how-we-work/": Route,
  "/how-we-work/engagement-models/": Handshake,
  "/how-we-work/delivery/": CalendarClock,
  "/company/": Info,
  "/company/team/": Users,
  "/company/careers/": Briefcase,
  "/company/locations/": MapPin,
};
