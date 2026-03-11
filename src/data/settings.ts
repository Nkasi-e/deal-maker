import { Cloud, Box, Users, Truck, Megaphone } from "lucide-react";

export const SETTINGS_DEAL_TYPES = [
  { id: "saas", label: "SaaS", icon: Cloud },
  { id: "suppliers", label: "Suppliers", icon: Box },
  { id: "freelancers", label: "Freelancers", icon: Users },
  { id: "logistics", label: "Logistics", icon: Truck },
  { id: "marketing", label: "Marketing", icon: Megaphone },
] as const;
