import { Card } from "@/components/ui/card";
import { VideoCard } from "@/components/ui/video-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { 
  Video, Search, Upload, Calendar, Eye, ThumbsUp, 
  MessageSquare, TrendingUp, Filter, MoreVertical,
  Play, Clock, CheckCircle, AlertCircle
} from "lucide-react";
import { useState } from "react";

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const videos = [
    {
      id: "VID001",
      title: "Complete Firebase Tutorial - Authentication & Firestore",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
      status: "published",
      publishedDate: "2025-09-28",
      duration: "15:34",
      views: 15420,
      likes: 892,
      comments: 134,
      editor: "Nithish",
      thumbnail_designer: "Raaj Nikitaa",
    },
    {
      id: "VID002",
      title: "React Hooks Deep Dive - useState, useEffect, Custom Hooks",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=450&fit=crop",
      status: "published",
      publishedDate: "2025-09-25",
      duration: "22:18",
      views: 23150,
      likes: 1245,
      comments: 289,
      editor: "Nithish",
      thumbnail_designer: "Kamesh",
    },
    {
      id: "VID003",
      title: "Building a Full-Stack App with Next.js 14",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop",
      status: "scheduled",
      scheduledDate: "2025-10-05",
      duration: "18:45",
      editor: "Ajay Krithick",
      thumbnail_designer: "Raaj Nikitaa",
    },
    {
      id: "VID004",
      title: "CSS Grid vs Flexbox - When to Use What",
      thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=450&fit=crop",
      status: "in_progress",
      progress: 65,
      editor: "Nithish",
      thumbnail_designer: "Kamesh",
    },
    {
      id: "VID005",
      title: "TypeScript for Beginners - Complete Guide",
      thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop",
      status: "published",
      publishedDate: "2025-09-20",
      duration: "25:12",
      views: 34280,
      likes: 1876,
      comments: 412,
      editor: "Ajay Krithick",
      thumbnail_designer: "Raaj Nikitaa",
    },
    {
      id: "VID006",
      title: "AI & Machine Learning Basics for Web Developers",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
      status: "planned",
      plannedDate: "2025-10-15",
      scriptWriter: "Haridharuson L.J",
    },
  ];



  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 px-4 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Video Management</h1>
              <p className="text-muted-foreground text-lg">
                Track, schedule, and analyze all YouTube content
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary-hover shadow-glow">
              <Upload className="mr-2 w-4 h-4" />
              Upload Video
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">234</p>
                  <p className="text-xs text-muted-foreground">Total Videos</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Eye className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5.6M</p>
                  <p className="text-xs text-muted-foreground">Total Views</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-success/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">+12%</p>
                  <p className="text-xs text-muted-foreground">Growth Rate</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8m 45s</p>
                  <p className="text-xs text-muted-foreground">Avg Duration</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search videos by title, ID, or team member..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Schedule
            </Button>
          </div>

          {/* Videos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard 
                key={video.id}
                video={video}
                onViewDetails={(videoId) => console.log('View details:', videoId)}
                onMenuClick={(videoId) => console.log('Menu clicked:', videoId)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
