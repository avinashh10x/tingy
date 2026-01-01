import { Shield, Zap, Settings, Smartphone, Lock, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";
import HoverSwapText from "./ui/textAnimation1";
import { SettingsIcon } from "./SettingsIcon";
import { ZapIcon } from "./ZapIcon";
import { ShieldCheckIcon } from "./ShieldCheckIcon";
import { CodeXmlIcon } from "./CodeXmlIcon";
import { SnowflakeIcon } from "./SnowFlakeIcon";
import { LockIcon } from "./LockIcon";

const features = [
  {
    icon: <ZapIcon className="w-6 h-6" />,

    title: "Lightning Fast",
    description: "Compress images in seconds with our optimized algorithms",
  },
  {
    icon: <SettingsIcon className="w-6 h-6" />,
    title: "Smart Presets",
    description: "6 presets for web, social, email, print, and more",
  },
  {
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    title: "100% Secure",
    description: "Images are processed locally and never stored",
  },
  {
    icon: <CodeXmlIcon className="w-6 h-6" />,
    title: "Fully Responsive",
    description: "Works perfectly on desktop, tablet, and mobile",
  },
  {
    icon: <LockIcon className="w-6 h-6" />,
    title: "Privacy First",
    description: "All processing happens in your browser",
  },
  {
    icon: <SnowflakeIcon className="w-6 h-6" />,
    title: "Always Free",
    description: "No hidden fees, no subscriptions, 100% free forever",
  },
];

export const Features = () => {
  return (
    <div className="w-full mx-auto max-w-7xl  py-16 mt-16 ">
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Why Choose Tingy?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The smartest way to compress images without compromising quality
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 group">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="    p-6
    bg-card
    border-border
    transition-all duration-300
    animate-fade-in-up
    group-hover:opacity-40
    hover:opacity-100
  "
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 text-primary ">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              <HoverSwapText text={feature.title} />
            </h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
