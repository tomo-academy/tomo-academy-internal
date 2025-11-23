// src/components/ui/compact-id-card.tsx
import { useState } from "react";
import QRCode from "react-qr-code";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AdminOnly } from "@/components/ui/admin-only";
import { githubPhotoService } from "@/services/githubPhotoService";
import { generateProfileUrl } from "@/config/constants";
import { 
  Download, Share2, Mail, Phone, MapPin, Calendar, Star, Shield,
  Verified, Eye, Camera, Sparkles, Video, Briefcase, Globe,
  Linkedin, Twitter, Github, Instagram, ExternalLink, Edit
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CompactIDCardProps {
  employee: {
    id: string;
    name: string;
    role: string;
    department: string;
    email: string;
    phone?: string;
    employeeId: string;
    joinDate: string;
    avatar?: string;
    avatar_url?: string;
    location?: string;
    availability: 'available' | 'busy' | 'offline';
    bio?: string;
    skills?: string[];
    stats: {
      videos: number;
      tasks: number;
      rating: number;
      projects: number;
    };
    social?: {
      linkedin?: string;
      twitter?: string;
      github?: string;
      instagram?: string;
    };
  };
  onPhotoUpdate?: (file: File) => Promise<void>;
}

export function CompactIDCard({ employee, onPhotoUpdate }: CompactIDCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();

  const profileUrl = generateProfileUrl(employee.id);

  // Function to get the correct image path using GitHub photo service
  const getImagePath = (avatar?: string, avatar_url?: string) => {
    return githubPhotoService.getEmployeePhotoUrl({ avatar, avatar_url, name: employee.name });
  };

  // Function to render avatar with fallback
  const renderAvatar = () => {
    const avatarProps = githubPhotoService.getAvatarProps(employee);
    
    if (avatarProps.src && !imageError) {
      return (
        <img 
          key={avatarProps.src}
          src={avatarProps.src}
          alt={avatarProps.alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.warn(`❌ Failed to load image: ${avatarProps.src}`);
            setImageError(true);
          }}
        />
      );
    } else {
      // Fallback to initials
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-accent text-white font-bold text-2xl">
          {avatarProps.fallback}
        </div>
      );
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setImageError(false);
    
    try {
      // Validate the image
      const validation = githubPhotoService.validateImage(file);
      if (!validation.valid) {
        toast({
          title: "❌ Invalid Image",
          description: validation.error,
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      if (onPhotoUpdate) {
        await onPhotoUpdate(file);
        toast({
          title: "✅ Photo Updated",
          description: "Profile photo updated successfully!",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Photo upload error:', error);
      toast({
        title: "❌ Upload Failed",
        description: "Failed to update photo. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const downloadVCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${employee.name}
ORG:TOMO Academy
TITLE:${employee.role}
EMAIL:${employee.email}
 ${employee.phone ? `TEL:${employee.phone}` : ''}
 ${employee.location ? `ADR:;;${employee.location};;;;` : ''}
URL:${profileUrl}
NOTE:${employee.bio || ''}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${employee.name.replace(/\s+/g, '_')}_TOMO.vcf`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "📥 Contact Downloaded",
      description: "vCard saved successfully!",
      duration: 2000,
    });
  };

  const shareProfile = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${employee.name} - TOMO Academy`,
          text: `Check out ${employee.name}'s profile`,
          url: profileUrl
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(profileUrl);
      toast({
        title: "🔗 Link Copied",
        description: "Profile link copied to clipboard!",
        duration: 2000,
      });
    }
  };

  const getAvailabilityColor = () => {
    switch (employee.availability) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const yearsSince = new Date().getFullYear() - new Date(employee.joinDate).getFullYear();

  return (
    <div className="w-full max-w-sm mx-auto perspective-1000 group/card">
      <div 
        className={cn(
          "relative w-full h-[260px] transition-all duration-700 transform-style-preserve-3d cursor-pointer",
          isFlipped && "rotate-y-180"
        )}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* FRONT SIDE - Stylish Premium Design */}
        <Card className={cn(
          "absolute inset-0 backface-hidden overflow-hidden",
          "bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900",
          "border-2 shadow-2xl hover:shadow-pink-500/20 transition-all duration-500",
          "border-pink-200/50 dark:border-pink-900/50"
        )}>
          {/* Animated Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pink-500 to-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          </div>

          {/* Premium Header with Shine Effect */}
          <div className="relative h-14 bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 flex items-center justify-between px-4 overflow-hidden">
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ animationDuration: '3s' }} />
            
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-lg p-1 ring-2 ring-white/50 hover:ring-white transition-all hover:scale-110">
                <img src="/logo.png" alt="TOMO Academy" className="w-full h-full object-cover rounded-full" onError={(e) => {
                  e.currentTarget.src = '/TOMO.jpg';
                }} />
              </div>
              <div className="text-white">
                <p className="font-bold text-sm leading-none flex items-center gap-1">
                  TOMO ACADEMY
                  <Verified className="w-3.5 h-3.5 drop-shadow-lg" />
                </p>
                <p className="text-[10px] opacity-95 leading-tight font-medium">EDUCATION ELEVATED</p>
              </div>
            </div>
            <Badge className="bg-white/30 backdrop-blur-sm text-white border-white/40 text-[10px] px-2 py-0.5 shadow-lg relative z-10">
              <Shield className="w-3 h-3 mr-0.5" />
              ID
            </Badge>
          </div>

          {/* Main Content - Premium Horizontal Layout */}
          <div className="relative h-[calc(260px-56px)] flex items-center px-5 py-5 gap-5">
            {/* Left Side - Photo with Glow */}
            <div className="flex-shrink-0">
              <div className="relative group/photo">
                {/* Glow effect behind photo */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover/photo:opacity-50 transition-opacity" />
                
                <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-white font-bold text-3xl border-3 border-white dark:border-slate-600 shadow-2xl overflow-hidden ring-2 ring-pink-400/40 hover:ring-pink-500/60 transition-all duration-300 transform group-hover/photo:scale-105">
                  {renderAvatar()}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                
                {onPhotoUpdate && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById(`photo-${employee.id}`)?.click();
                    }}
                    disabled={isUploading}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-all shadow-lg hover:scale-110 border-2 border-white"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
                <input
                  id={`photo-${employee.id}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                  disabled={isUploading}
                />
              </div>
            </div>

            {/* Right Side - Info and Actions */}
            <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
              {/* Top - Member Info with Gradient */}
              <div className="space-y-2.5">
                <div>
                  <h2 className="font-black text-2xl leading-tight bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{employee.name}</h2>
                  <p className="text-sm text-muted-foreground font-bold mt-1 tracking-wide">{employee.role}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-pink-50/50 dark:bg-pink-950/20 px-2.5 py-1.5 rounded-lg border border-pink-200/50">
                    <Shield className="w-4 h-4 text-pink-600 flex-shrink-0" />
                    <span className="text-xs font-mono font-bold text-pink-900 dark:text-pink-100">{employee.employeeId}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50/50 dark:bg-green-950/20 px-2.5 py-1.5 rounded-lg border border-green-200/50">
                    <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-green-900 dark:text-green-100 truncate">{employee.location || 'Remote'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom - QR Code and NFC Tap with Glow */}
              <div className="flex items-end justify-between gap-4 mt-3">
                {/* QR Code with Premium Frame */}
                <div className="flex flex-col items-center gap-1.5 group/qr">
                  <div className="p-2 bg-white rounded-xl shadow-lg border-2 border-pink-200/50 hover:border-pink-400/50 transition-all hover:scale-105 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-xl opacity-0 group-hover/qr:opacity-100 transition-opacity" />
                    <QRCode value={profileUrl} size={52} />
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center leading-tight font-bold flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Scan Me
                  </p>
                </div>

                {/* NFC Tap Icon with Animation */}
                <div className="flex flex-col items-center gap-1.5 group/nfc">
                  <div className="relative">
                    {/* Animated rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-pink-400/20 animate-ping" style={{ animationDuration: '2s' }} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-purple-400/30 animate-pulse" />
                    </div>
                    
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-xl hover:shadow-pink-500/50 transition-all hover:scale-110 cursor-pointer">
                      <svg className="w-8 h-8 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" />
                        <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" />
                        <path d="M12.91 4.1a15.91 15.91 0 0 1 0 15.8" />
                        <path d="M16.37 2a20.16 20.16 0 0 1 0 20" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center leading-tight font-bold flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Tap Here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* BACK SIDE - Stylish Premium Layout */}
        <Card className={cn(
          "absolute inset-0 backface-hidden rotate-y-180 overflow-hidden",
          "bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-slate-900 dark:via-purple-950 dark:to-slate-900",
          "border-2 border-purple-200/50 dark:border-purple-900/50 shadow-2xl hover:shadow-purple-500/20"
        )}>
          {/* Animated Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-400 to-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pink-500 to-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-2xl opacity-30" />
          </div>

          {/* Main Content - Premium Layout */}
          <div className="relative flex flex-col h-full p-6 justify-between">
            {/* Top Section - Instruction with Gradient */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-pink-300/50 shadow-lg">
                <Eye className="w-4 h-4 text-pink-600" />
                <p className="font-black text-sm bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Tap or Scan to View Profile</p>
              </div>
            </div>

            {/* Center Section - Large Stylish NFC Icon */}
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="relative group/nfc-back">
                {/* Multiple Pulsing Rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-pink-400/20 animate-ping" style={{ animationDuration: '2s' }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-purple-400/20 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-pink-500/30 animate-pulse" />
                </div>
                
                {/* Main NFC Icon with Glow */}
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 flex items-center justify-center shadow-2xl hover:shadow-pink-500/50 transition-all group-hover/nfc-back:scale-110 cursor-pointer border-4 border-white/20">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                  <svg className="w-16 h-16 text-white drop-shadow-2xl relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" />
                    <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" />
                    <path d="M12.91 4.1a15.91 15.91 0 0 1 0 15.8" />
                    <path d="M16.37 2a20.16 20.16 0 0 1 0 20" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-4">
                <Sparkles className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
                <p className="text-sm text-muted-foreground font-bold">Tap your device here</p>
                <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>

            {/* Bottom Section - Contact & Social with Cards */}
            <div className="space-y-3">
              {/* Website & Email in Cards */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border border-blue-200/50 hover:border-blue-400/50 transition-all">
                  <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="font-bold text-xs text-blue-900 dark:text-blue-100">www.tomoacademy.com</span>
                </div>
                <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 rounded-lg border border-pink-200/50 hover:border-pink-400/50 transition-all">
                  <Mail className="w-4 h-4 text-pink-600 flex-shrink-0" />
                  <span className="font-bold text-xs text-pink-900 dark:text-pink-100">support@tomoacademy.com</span>
                </div>
              </div>

              {/* Social Icons with Glow */}
              <div className="flex justify-center items-center gap-3">
                <a href="https://youtube.com/@tomoacademy" target="_blank" rel="noopener noreferrer" 
                   onClick={(e) => e.stopPropagation()}
                   className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center hover:from-red-500/30 hover:to-red-600/30 transition-all border border-red-300/50 hover:border-red-400 hover:scale-110 shadow-lg hover:shadow-red-500/50">
                  <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/tomoacademy" target="_blank" rel="noopener noreferrer"
                   onClick={(e) => e.stopPropagation()}
                   className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center hover:from-pink-500/30 hover:to-purple-600/30 transition-all border border-pink-300/50 hover:border-pink-400 hover:scale-110 shadow-lg hover:shadow-pink-500/50">
                  <Instagram className="w-5 h-5 text-pink-600" />
                </a>
              </div>

              {/* Disclaimer with Gradient Border */}
              <div className="text-center pt-2 border-t-2 border-gradient-to-r from-pink-200 via-purple-200 to-pink-200">
                <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
                  <span className="font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Official Member Identity Card</span><br />
                  <span className="text-[9px]">Unauthorized use prohibited</span>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Flip Hint */}
      <div className="text-center mt-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
        <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          Click to flip
        </p>
      </div>
    </div>
  );
}

// Grid Component for Compact Cards
export function CompactIDCardGrid({ 
  employees,
  onPhotoUpdate,
  onEdit
}: { 
  employees: CompactIDCardProps['employee'][];
  onPhotoUpdate?: (employeeId: string, file: File) => Promise<void>;
  onEdit?: (employee: CompactIDCardProps['employee']) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {employees.map((employee) => (
        <div key={employee.id} className="relative group/container">
          <CompactIDCard
            employee={employee}
            onPhotoUpdate={onPhotoUpdate ? (file) => onPhotoUpdate(employee.id, file) : undefined}
          />
          {onEdit && (
            <AdminOnly>
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2 opacity-0 group-hover/container:opacity-100 transition-all shadow-lg z-10 gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(employee);
                }}
              >
                <Edit className="w-3 h-3" />
                Edit
              </Button>
            </AdminOnly>
          )}
        </div>
      ))}
    </div>
  );
}
