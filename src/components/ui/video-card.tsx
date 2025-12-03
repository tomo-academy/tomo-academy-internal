import React from 'react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, ThumbsUp, MessageSquare, Play, Clock, CheckCircle, 
  Calendar, MoreVertical, Video
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    status: 'published' | 'scheduled' | 'in_progress' | 'planned';
    publishedDate?: string;
    scheduledDate?: string;
    plannedDate?: string;
    duration?: string;
    views?: number;
    likes?: number;
    comments?: number;
    progress?: number;
    editor?: string;
    thumbnail_designer?: string;
    scriptWriter?: string;
  };
  onViewDetails?: (videoId: string) => void;
  onMenuClick?: (videoId: string) => void;
  className?: string;
}

export function VideoCard({ video, onViewDetails, onMenuClick, className }: VideoCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Published
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400">
            <Play className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        );
      case "planned":
        return (
          <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
            <Calendar className="w-3 h-3 mr-1" />
            Planned
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <AnimatedCard 
      hoverEffect="glow"
      clickable
      className={cn(
        "overflow-hidden bg-gradient-to-br from-background to-muted/20 border-2 border-transparent hover:border-primary/30",
        className
      )}
      onClick={() => onViewDetails?.(video.id)}
    >
      {/* Thumbnail Section */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        {video.thumbnail ? (
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Video className="w-12 h-12 text-muted-foreground/50" />
          </div>
        )}
        
        {/* Duration overlay */}
        {video.duration && (
          <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-3 py-1 rounded-md backdrop-blur-sm border border-white/10">
            {video.duration}
          </div>
        )}
        
        {/* Progress bar for in-progress videos */}
        {video.status === "in_progress" && video.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/30">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300"
              style={{ width: `${video.progress}%` }}
            />
          </div>
        )}
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center group">
          <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 backdrop-blur-sm">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        {/* Header: Status & ID */}
        <div className="flex items-center justify-between">
          {getStatusBadge(video.status)}
          <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
            {video.id}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base line-clamp-2 min-h-[48px] text-foreground leading-tight">
          {video.title}
        </h3>

        {/* Stats for published videos */}
        {video.status === "published" && (video.views || video.likes || video.comments) && (
          <div className="flex items-center gap-6 text-sm text-muted-foreground py-3 px-4 bg-muted/30 rounded-lg">
            {video.views && (
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="font-medium">{formatNumber(video.views)}</span>
              </div>
            )}
            {video.likes && (
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span className="font-medium">{formatNumber(video.likes)}</span>
              </div>
            )}
            {video.comments && (
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="font-medium">{formatNumber(video.comments)}</span>
              </div>
            )}
          </div>
        )}

        {/* Date Information */}
        <div className="text-sm text-muted-foreground">
          {video.publishedDate && (
            <p>📅 Published {new Date(video.publishedDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}</p>
          )}
          {video.scheduledDate && (
            <p>⏰ Scheduled for {new Date(video.scheduledDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}</p>
          )}
          {video.plannedDate && (
            <p>📋 Planned for {new Date(video.plannedDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}</p>
          )}
        </div>

        {/* Team Information */}
        <div className="space-y-2 pt-3 border-t border-border">
          {video.editor && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Editor:</span>
              <span className="font-medium text-foreground bg-muted/50 px-2 py-1 rounded text-xs">
                {video.editor}
              </span>
            </div>
          )}
          {video.thumbnail_designer && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Designer:</span>
              <span className="font-medium text-foreground bg-muted/50 px-2 py-1 rounded text-xs">
                {video.thumbnail_designer}
              </span>
            </div>
          )}
          {video.scriptWriter && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Writer:</span>
              <span className="font-medium text-foreground bg-muted/50 px-2 py-1 rounded text-xs">
                {video.scriptWriter}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-background/50 hover:bg-muted transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(video.id);
            }}
          >
            View Details
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick?.(video.id);
            }}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
}