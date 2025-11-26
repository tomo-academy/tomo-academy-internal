import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnimatedCard, GlowCard } from "@/components/ui/animated-card";
import { LoadingSpinnerOverlay } from "@/components/ui/loading-spinner";
import { SEO } from "@/components/SEO";
import SimpleQRCode from "@/components/SimpleQRCode";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Download, 
  Share2,
  ExternalLink,
  User,
  Building2,
  Clock,
  Award,
  Star,
  TrendingUp,
  Target,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Facebook,
  Video,
  BarChart3,
  Activity
} from "lucide-react";

// Import employee data and GitHub photo service
import { employees, Employee } from "@/data/employees";
import { githubPhotoService } from "@/services/githubPhotoService";
import { CompactIDCard } from "@/components/ui/compact-id-card";
import { LocationMap } from "@/components/ui/location-map";

const EmployeeProfile = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadEmployee = async () => {
      console.log('🔄 Loading employee profile...');
      console.log('📋 Looking for employee ID:', employeeId);
      
      try {
        // Find employee in static data
        const foundEmployee = employees.find(emp => emp.id === employeeId);
        
        if (foundEmployee) {
          console.log('✅ Found employee:', foundEmployee);
          console.log('📸 Avatar path:', foundEmployee.avatar);
          
          setEmployee(foundEmployee);
        } else {
          console.log('❌ Employee not found');
        }
      } catch (error) {
        console.error('❌ Error loading employee:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployee();
  }, [employeeId]);

  // Handle image error and use GitHub photo service
  const handleImageError = () => {
    setImageError(true);
  };

  const getEmployeeAvatar = () => {
    if (!employee) return null;
    
    if (imageError) {
      return githubPhotoService.getAvatarProps(employee.name);
    }
    
    return {
      src: employee.avatar,
      alt: employee.name,
      onError: handleImageError
    };
  };

  const downloadVCard = () => {
    if (!employee) return;
    
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${employee.name}
ORG:TOMO Academy
TITLE:${employee.position}
EMAIL:${employee.email}
TEL:${employee.phone}
NOTE:${employee.bio}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${employee.name.replace(/\s+/g, '_')}.vcf`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const shareProfile = async () => {
    if (!employee) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${employee.name} - TOMO Academy`,
          text: `Check out ${employee.name}'s profile at TOMO Academy`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  if (isLoading) {
    return <LoadingSpinnerOverlay message="Loading employee profile..." />;
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AnimatedCard className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Employee Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The employee profile you're looking for doesn't exist.
          </p>
          <Link to="/team">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Button>
          </Link>
        </AnimatedCard>
      </div>
    );
  }

  const avatarProps = getEmployeeAvatar();

  return (
    <>
      <SEO 
        title={`${employee.name} - Employee Profile`}
        description={`View ${employee.name}'s profile at TOMO Academy. ${employee.role} with expertise in ${employee.skills.join(', ')}.`}
        canonical={`/profile/${employee.id}`}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 dark:from-black dark:via-purple-950 dark:to-indigo-950 relative overflow-hidden">
        {/* Advanced Animated Background with Multiple Layers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Mesh Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent"></div>
          
          {/* Animated Blobs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
          
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-50"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-50 animation-delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-50 animation-delay-4000"></div>
        </div>
        <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
          {/* Premium Header Navigation */}
          <div className="mb-6">
            <Link to="/team">
              <Button 
                variant="ghost" 
                className="mb-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Team
              </Button>
            </Link>
          </div>

          {/* Premium Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* LEFT COLUMN - Profile & Stats */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* ID Card Display */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden">
                <CardHeader className="text-center pb-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Official ID Card
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Click card to flip and see both sides</p>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <CompactIDCard employee={employee} />
                </CardContent>
              </Card>

              {/* Ultra Premium Profile Card with Glass Morphism */}
              <Card className="overflow-hidden border-0 shadow-[0_0_50px_rgba(168,85,247,0.3)] bg-gradient-to-br from-white/10 via-purple-500/5 to-pink-500/5 dark:from-white/5 dark:via-purple-500/10 dark:to-pink-500/10 backdrop-blur-2xl relative group">
                {/* Shimmer Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ animationDuration: '3s' }}></div>
                
                {/* Advanced Animated Header Background */}
                <div className="relative h-40 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-blue-600/90 animate-gradient-x"></div>
                  
                  {/* Mesh Gradient Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                  
                  {/* Animated Light Beams */}
                  <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-white/20 to-transparent rounded-full filter blur-2xl animate-spin" style={{ animationDuration: '10s' }}></div>
                  </div>
                  
                  {/* Sparkle Effects */}
                  <div className="absolute top-4 right-4">
                    <Sparkles className="w-6 h-6 text-white/80 animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Sparkles className="w-4 h-4 text-white/60 animate-pulse animation-delay-2000" />
                  </div>
                </div>
                
                <CardContent className="relative pt-16 pb-6 px-6">
                  {/* Ultra Premium Profile Picture with Advanced Effects */}
                  <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                    <div className="relative group">
                      {/* Multiple Animated Glow Rings */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse scale-110"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-all duration-500 animate-pulse animation-delay-2000 scale-105"></div>
                      
                      {/* Rotating Border */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-spin opacity-75 scale-110 group-hover:scale-115 transition-transform duration-500" style={{ animationDuration: '3s' }}></div>
                      
                      <div className="relative">
                        {/* Hexagonal Frame Effect */}
                        <div className="absolute inset-0 rounded-full border-4 border-white/20 dark:border-white/10 scale-110"></div>
                        
                        <img
                          {...avatarProps}
                          className="w-36 h-36 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-2xl bg-white relative z-10 group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Holographic Shine Effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer z-20 pointer-events-none" style={{ animationDuration: '2s' }}></div>
                        
                        {/* Status Indicator with Pulse */}
                        <div className={`absolute bottom-3 right-3 w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center z-20 shadow-lg ${
                          employee.availability === 'available' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                          employee.availability === 'busy' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-gray-400 to-gray-500'
                        }`}>
                          <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                          <div className={`absolute inset-0 rounded-full animate-ping ${
                            employee.availability === 'available' ? 'bg-green-400' :
                            employee.availability === 'busy' ? 'bg-yellow-400' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        
                        {/* Floating Badge */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                          <div className="px-3 py-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full text-white text-xs font-bold shadow-lg animate-bounce">
                            ⭐ Premium
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Name & Title with Advanced Typography */}
                  <div className="text-center mb-4">
                    <div className="relative inline-block">
                      <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-1 tracking-tight relative z-10 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                        {employee.name}
                      </h1>
                      {/* Text Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 blur-xl opacity-30 -z-10"></div>
                    </div>
                    
                    <p className="text-base font-bold text-white/90 mb-2 mt-1">{employee.role}</p>
                    
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-white border border-white/20 shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                    >
                      <Building2 className="w-3 h-3 mr-1" />
                      {employee.department}
                    </Badge>
                  </div>

                  {/* Bio with Glass Effect */}
                  <div className="relative mb-6 px-2">
                    <p className="text-sm text-center text-white/80 leading-relaxed relative z-10">
                      {employee.bio}
                    </p>
                  </div>

                  <Separator className="my-4 bg-white/10" />

                  {/* Advanced Quick Stats Grid with 3D Effect */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="group text-center p-4 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent backdrop-blur-sm rounded-2xl border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Video className="w-6 h-6 mx-auto mb-2 text-purple-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                      <p className="text-3xl font-black text-white drop-shadow-lg">{employee.stats.videos}</p>
                      <p className="text-xs text-white/60 mt-1">Videos</p>
                    </div>
                    <div className="group text-center p-4 bg-gradient-to-br from-pink-500/20 via-pink-500/10 to-transparent backdrop-blur-sm rounded-2xl border border-pink-400/30 hover:border-pink-400/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Target className="w-6 h-6 mx-auto mb-2 text-pink-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                      <p className="text-3xl font-black text-white drop-shadow-lg">{employee.stats.tasks}</p>
                      <p className="text-xs text-white/60 mt-1">Tasks</p>
                    </div>
                    <div className="group text-center p-4 bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-transparent backdrop-blur-sm rounded-2xl border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Star className="w-6 h-6 mx-auto mb-2 text-yellow-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
                      <p className="text-3xl font-black text-white drop-shadow-lg">{employee.stats.rating}</p>
                      <p className="text-xs text-white/60 mt-1">Rating</p>
                    </div>
                    <div className="group text-center p-4 bg-gradient-to-br from-green-500/20 via-green-500/10 to-transparent backdrop-blur-sm rounded-2xl border border-green-400/30 hover:border-green-400/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Briefcase className="w-6 h-6 mx-auto mb-2 text-green-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                      <p className="text-3xl font-black text-white drop-shadow-lg">{employee.stats.projects}</p>
                      <p className="text-xs text-white/60 mt-1">Projects</p>
                    </div>
                  </div>

                  {/* Premium Employee ID Badge */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300">
                      <Award className="w-5 h-5 text-yellow-300 animate-pulse" />
                      <span className="text-sm font-mono font-black text-white drop-shadow-lg tracking-wider">{employee.employeeId}</span>
                      <Sparkles className="w-4 h-4 text-purple-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ultra Premium QR Code Card with Holographic Effect */}
              <Card className="border-0 shadow-[0_0_50px_rgba(168,85,247,0.3)] bg-gradient-to-br from-white/10 via-purple-500/5 to-pink-500/5 backdrop-blur-2xl relative overflow-hidden group">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.3),transparent_50%)] animate-pulse"></div>
                </div>
                
                <CardHeader className="text-center pb-3 relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg animate-pulse">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                      Share Profile
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="relative group/qr">
                      {/* Multi-layer Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-2xl opacity-40 group-hover/qr:opacity-70 transition-opacity duration-500 animate-pulse scale-110"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30 group-hover/qr:opacity-60 transition-opacity duration-500 animate-pulse animation-delay-2000 scale-105"></div>
                      
                      {/* Rotating Border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-[2px] animate-spin opacity-50 scale-105" style={{ animationDuration: '3s' }}>
                        <div className="w-full h-full rounded-3xl bg-transparent"></div>
                      </div>
                      
                      <div className="relative bg-white p-5 rounded-3xl shadow-2xl border-2 border-white/30 backdrop-blur-sm group-hover/qr:scale-105 transition-transform duration-500">
                        <SimpleQRCode 
                          value={typeof window !== 'undefined' ? window.location.href : ''}
                          size={110}
                          className="rounded-xl"
                        />
                        
                        {/* Holographic Overlay */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover/qr:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" style={{ animationDuration: '2s' }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mb-4 font-medium">
                    ✨ Scan to share this premium profile
                  </p>
                  <div className="space-y-2">
                    <Button 
                      onClick={downloadVCard} 
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition-all duration-300 font-bold group/btn"
                    >
                      <Download className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                      Download vCard
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={shareProfile} 
                      className="w-full border-white/30 bg-white/5 hover:bg-white/10 text-white hover:border-white/50 backdrop-blur-sm transition-all duration-300 group/btn"
                    >
                      <Share2 className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Share Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              {employee.social && (
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                  <CardHeader>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      Social Links
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {employee.social.linkedin && (
                        <a 
                          href={employee.social.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-blue-200/50 dark:border-blue-800/50"
                        >
                          <Linkedin className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-medium text-blue-700 dark:text-blue-300">LinkedIn</span>
                        </a>
                      )}
                      {employee.social.github && (
                        <a 
                          href={employee.social.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200/50 dark:border-gray-700/50"
                        >
                          <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                        </a>
                      )}
                      {employee.social.twitter && (
                        <a 
                          href={employee.social.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 p-3 bg-sky-50 dark:bg-sky-900/20 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors border border-sky-200/50 dark:border-sky-800/50"
                        >
                          <Twitter className="w-4 h-4 text-sky-600" />
                          <span className="text-xs font-medium text-sky-700 dark:text-sky-300">Twitter</span>
                        </a>
                      )}
                      {employee.social.instagram && (
                        <a 
                          href={employee.social.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors border border-pink-200/50 dark:border-pink-800/50"
                        >
                          <Instagram className="w-4 h-4 text-pink-600" />
                          <span className="text-xs font-medium text-pink-700 dark:text-pink-300">Instagram</span>
                        </a>
                      )}
                      {employee.social.facebook && (
                        <a 
                          href={employee.social.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors border border-indigo-200/50 dark:border-indigo-800/50"
                        >
                          <Facebook className="w-4 h-4 text-indigo-600" />
                          <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Facebook</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* RIGHT COLUMN - Details & Content */}
            <div className="lg:col-span-2 space-y-6">

              {/* Ultra Premium Performance Overview with Neon Effects */}
              <Card className="border-0 shadow-[0_0_60px_rgba(168,85,247,0.4)] bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white overflow-hidden relative group">
                {/* Animated Mesh Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-blue-900/40"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                
                <CardContent className="relative p-6 z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-7 h-7 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black drop-shadow-lg">Performance Overview</h2>
                      <p className="text-sm text-white/90 font-medium">🏆 Excellence in every metric</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Activity className="w-6 h-6 mb-2 text-yellow-300 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] group-hover:scale-110 transition-transform duration-300 relative z-10" />
                      <p className="text-4xl font-black mb-1 drop-shadow-lg relative z-10">{employee.stats.rating}⭐</p>
                      <p className="text-xs text-white/80 font-semibold relative z-10">Average Rating</p>
                    </div>
                    <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Video className="w-6 h-6 mb-2 text-blue-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover:scale-110 transition-transform duration-300 relative z-10" />
                      <p className="text-4xl font-black mb-1 drop-shadow-lg relative z-10">{employee.stats.videos}</p>
                      <p className="text-xs text-white/80 font-semibold relative z-10">Total Videos</p>
                    </div>
                    <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <CheckCircle2 className="w-6 h-6 mb-2 text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] group-hover:scale-110 transition-transform duration-300 relative z-10" />
                      <p className="text-4xl font-black mb-1 drop-shadow-lg relative z-10">{employee.stats.tasks}</p>
                      <p className="text-xs text-white/80 font-semibold relative z-10">Tasks Completed</p>
                    </div>
                    <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Briefcase className="w-6 h-6 mb-2 text-pink-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] group-hover:scale-110 transition-transform duration-300 relative z-10" />
                      <p className="text-4xl font-black mb-1 drop-shadow-lg relative z-10">{employee.stats.projects}</p>
                      <p className="text-xs text-white/80 font-semibold relative z-10">Total Projects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Details */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                      <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Professional Details
                    </h2>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Location</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{employee.location || 'Remote'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Join Date</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{employee.joinDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl border border-pink-200/50 dark:border-pink-700/50">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Role</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{employee.role}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
                      <div className="flex items-start gap-3">
                        <Activity className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Status</p>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              employee.availability === 'available' ? 'bg-green-500 animate-pulse' :
                              employee.availability === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                            }`}></div>
                            <p className="font-semibold text-gray-900 dark:text-white capitalize">{employee.availability}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Map */}
              {employee.location && (
                <LocationMap 
                  location={employee.location} 
                  employeeName={employee.name}
                  className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
                />
              )}

              {/* Contact Information */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Contact Information
                    </h2>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a 
                      href={`mailto:${employee.email}`}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-all group"
                    >
                      <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">Email Address</p>
                        <p className="font-semibold text-blue-600 dark:text-blue-400 break-all">{employee.email}</p>
                      </div>
                    </a>
                    
                    {employee.phone && (
                      <a 
                        href={`tel:${employee.phone}`}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-800/50 hover:shadow-lg transition-all group"
                      >
                        <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg group-hover:scale-110 transition-transform">
                          <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">Phone Number</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">{employee.phone}</p>
                        </div>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Expertise */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full filter blur-3xl opacity-50"></div>
                <CardHeader className="relative">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                      <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Skills & Expertise
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Core competencies & specializations</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {employee.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-[2px] rounded-xl hover:scale-105 transition-all duration-300"
                      >
                        <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl flex items-center justify-center gap-2 h-full">
                          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                          <span className="font-semibold text-gray-900 dark:text-white text-sm text-center">
                            {skill}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity rounded-xl"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Work Timeline */}
              {employee.recentWork && employee.recentWork.length > 0 && (
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
                        <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          Recent Work
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Latest projects and activities</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {employee.recentWork.map((work, index) => (
                        <div 
                          key={index} 
                          className="relative pl-8 pb-4 border-l-2 border-purple-200 dark:border-purple-800 last:border-0 last:pb-0 group hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
                        >
                          <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-white dark:border-gray-900 group-hover:scale-125 transition-transform"></div>
                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h4 className="font-bold text-gray-900 dark:text-white">{work.title}</h4>
                              <Badge 
                                variant="secondary" 
                                className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs flex-shrink-0"
                              >
                                {work.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span>{work.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Achievement Highlights */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/50 dark:via-yellow-950/50 dark:to-orange-950/50 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg">
                      <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                        Achievement Highlights
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Outstanding contributions</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-xl border border-yellow-200/50 dark:border-yellow-800/50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                          <Star className="w-5 h-5 text-yellow-600" />
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">Top Performer</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Consistently delivering high-quality work with a {employee.stats.rating} rating
                      </p>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-xl border border-orange-200/50 dark:border-orange-800/50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">Productivity Leader</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Completed {employee.stats.tasks} tasks and contributed to {employee.stats.projects} projects
                      </p>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-xl border border-purple-200/50 dark:border-purple-800/50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <Video className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">Content Creator</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Produced {employee.stats.videos} educational videos for the platform
                      </p>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-xl border border-green-200/50 dark:border-green-800/50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">Team Player</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Active member of {employee.department} since {employee.joinDate}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Premium Footer */}
          <div className="mt-12 text-center py-8 border-t border-purple-200/50 dark:border-purple-800/50">
            <div className="max-w-2xl mx-auto px-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  TOMO ACADEMY
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                © 2025 TOMO Academy. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Premium Employee Profile System • Education Elevated
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;