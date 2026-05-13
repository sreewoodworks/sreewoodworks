import React from 'react';
import { 
  ChefHat, 
  DoorClosed, 
  Briefcase, 
  Sofa, 
  Tv, 
  Trees, 
  Home, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Trophy, 
  TreePine, 
  Mail,
  Hammer,
  PenTool,
  Leaf,
  Calendar,
  Wrench,
  Check,
  ShieldCheck,
  Phone,
  MapPin,
  MessageCircle,
  LayoutDashboard
} from 'lucide-react';

const iconMap = {
  kitchen: ChefHat,
  wardrobe: DoorClosed,
  office: Briefcase,
  custom: Sofa,
  carpentry: Hammer,
  tv: Tv,
  windows: LayoutDashboard,
  home: Home,
  books: BookOpen,
  success: CheckCircle2,
  check: ShieldCheck,
  clock: Clock,
  trophy: Trophy,
  tree: TreePine,
  email: Mail,
  phone: Phone,
  location: MapPin,
  whatsapp: MessageCircle,
  leaf: Leaf,
  calendar: Calendar,
  install: Wrench,
  design: PenTool,
  material: Trees,
  craft: Hammer,
  default: Check
};

export default function BorderedIcon({ icon, size = 60 }) {
  const IconComponent = iconMap[icon] || iconMap.default;
  const iconSize = Math.max(Math.floor(size * 0.43), 16);

  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      border: '1.5px solid rgba(200,146,42,0.35)',
      borderRadius: size >= 60 ? '14px' : '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--accent, #C8922A)', // Fallback to their accent color
      background: 'transparent',
      flexShrink: 0
    }}>
      <IconComponent size={iconSize} strokeWidth={1.8} />
    </div>
  );
}
