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
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950 dark:to-slate-950 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
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

              {/* Premium Profile Card */}
              <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-950/30 dark:to-pink-950/30 backdrop-blur-xl">
                {/* Animated Header Background */}
                <div className="relative h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-pink-600/80 to-blue-600/80 animate-gradient-x"></div>
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
                  </div>
                </div>
                
                <CardContent className="relative pt-16 pb-6 px-6">
                  {/* Profile Picture with Premium Effects */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                      <div className="relative">
                        <img
                          {...avatarProps}
                          className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-2xl bg-white relative z-10"
                        />
                        {/* Status Indicator */}
                        <div className={`absolute bottom-2 right-2 w-8 h-8 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center z-20 ${
                          employee.availability === 'available' ? 'bg-green-500' :
                          employee.availability === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}>
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Name & Title */}
                  <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-1">
                      {employee.name}
                    </h1>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{employee.role}</p>
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 border-0"
                    >
                      <Building2 className="w-3 h-3 mr-1" />
                      {employee.department}
                    </Badge>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-center text-gray-600 dark:text-gray-300 leading-relaxed mb-6 px-2">
                    {employee.bio}
                  </p>

                  <Separator className="my-4" />

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                      <Video className="w-5 h-5 mx-auto mb-1 text-purple-600 dark:text-purple-400" />
                      <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{employee.stats.videos}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Videos</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl border border-pink-200/50 dark:border-pink-700/50">
                      <Target className="w-5 h-5 mx-auto mb-1 text-pink-600 dark:text-pink-400" />
                      <p className="text-2xl font-bold text-pink-700 dark:text-pink-300">{employee.stats.tasks}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Tasks</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                      <Star className="w-5 h-5 mx-auto mb-1 text-yellow-600 dark:text-yellow-400" />
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{employee.stats.rating}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
                      <Briefcase className="w-5 h-5 mx-auto mb-1 text-green-600 dark:text-green-400" />
                      <p className="text-2xl font-bold text-green-700 dark:text-green-300">{employee.stats.projects}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Projects</p>
                    </div>
                  </div>

                  {/* Employee ID Badge */}
                  <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                    <Award className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    <span className="text-sm font-mono font-bold text-gray-700 dark:text-gray-200">{employee.employeeId}</span>
                  </div>
                </CardContent>
              </Card>

              {/* QR Code Card */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                <CardHeader className="text-center pb-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Share Profile
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <div className="relative bg-white p-4 rounded-2xl shadow-inner border-2 border-purple-100 dark:border-purple-800">
                        <SimpleQRCode 
                          value={typeof window !== 'undefined' ? window.location.href : ''}
                          size={100}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                    Scan to share profile
                  </p>
                  <div className="space-y-2">
                    <Button 
                      onClick={downloadVCard} 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download vCard
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={shareProfile} 
                      className="w-full border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
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

              {/* Performance Overview */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
                <CardContent className="relative p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Performance Overview</h2>
                      <p className="text-sm text-white/80">Excellence in every metric</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <Activity className="w-5 h-5 mb-2 text-yellow-300" />
                      <p className="text-3xl font-bold mb-1">{employee.stats.rating}⭐</p>
                      <p className="text-xs text-white/80">Average Rating</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <Video className="w-5 h-5 mb-2 text-blue-300" />
                      <p className="text-3xl font-bold mb-1">{employee.stats.videos}</p>
                      <p className="text-xs text-white/80">Total Videos</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <CheckCircle2 className="w-5 h-5 mb-2 text-green-300" />
                      <p className="text-3xl font-bold mb-1">{employee.stats.tasks}</p>
                      <p className="text-xs text-white/80">Tasks Completed</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <Briefcase className="w-5 h-5 mb-2 text-pink-300" />
                      <p className="text-3xl font-bold mb-1">{employee.stats.projects}</p>
                      <p className="text-xs text-white/80">Total Projects</p>
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