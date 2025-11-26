import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationMapProps {
  location: string;
  employeeName: string;
  className?: string;
}

export function LocationMap({ location, employeeName, className }: LocationMapProps) {
  const [mapUrl, setMapUrl] = useState<string>("");

  useEffect(() => {
    // Generate Google Maps embed URL
    const encodedLocation = encodeURIComponent(location);
    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedLocation}`;
    
    // For now, we'll use the basic embed without API key (limited functionality)
    const basicUrl = `https://maps.google.com/maps?q=${encodedLocation}&output=embed`;
    setMapUrl(basicUrl);
  }, [location]);

  const openInGoogleMaps = () => {
    const encodedLocation = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
  };

  const openDirections = () => {
    const encodedLocation = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`, '_blank');
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Location
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{employeeName}'s workplace</p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-0"
          >
            <MapPin className="w-3 h-3 mr-1" />
            {location}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Map Container */}
          <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-green-200/50 dark:border-green-800/50 shadow-lg">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${location}`}
              className="w-full h-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={openInGoogleMaps}
              variant="outline"
              className="w-full border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 group"
            >
              <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Open in Maps
            </Button>
            <Button
              onClick={openDirections}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 group"
            >
              <Navigation className="w-4 h-4 mr-2 group-hover:rotate-45 transition-transform" />
              Get Directions
            </Button>
          </div>

          {/* Location Info */}
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-800/50">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Address</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{location}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Compact version for smaller displays
export function CompactLocationMap({ location, className }: { location: string; className?: string }) {
  const openInGoogleMaps = () => {
    const encodedLocation = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
  };

  return (
    <button
      onClick={openInGoogleMaps}
      className={`flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-800/50 hover:shadow-lg transition-all group ${className}`}
    >
      <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg group-hover:scale-110 transition-transform">
        <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">Location</p>
        <p className="font-semibold text-gray-900 dark:text-white truncate">{location}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
