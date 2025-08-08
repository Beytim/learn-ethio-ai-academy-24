import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Clock, 
  Gift,
  Star,
  Heart,
  Coffee,
  Gem
} from "lucide-react";

interface EnergySystemProps {
  currentEnergy: number;
  maxEnergy: number;
  onEnergyChange: (newEnergy: number) => void;
}

export function EnergySystem({ currentEnergy, maxEnergy, onEnergyChange }: EnergySystemProps) {
  const [lastRegenTime, setLastRegenTime] = useState(Date.now());
  const [streak, setStreak] = useState(3);
  const [gems, setGems] = useState(150);

  // Energy regeneration (1 energy per 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - lastRegenTime;
      const minutesPassed = Math.floor(timeDiff / (1000 * 60));
      
      if (minutesPassed >= 5 && currentEnergy < maxEnergy) {
        const energyToAdd = Math.min(
          Math.floor(minutesPassed / 5),
          maxEnergy - currentEnergy
        );
        if (energyToAdd > 0) {
          onEnergyChange(currentEnergy + energyToAdd);
          setLastRegenTime(now);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [currentEnergy, maxEnergy, lastRegenTime, onEnergyChange]);

  const getNextRegenTime = () => {
    const timeSinceLastRegen = Date.now() - lastRegenTime;
    const minutesSinceRegen = Math.floor(timeSinceLastRegen / (1000 * 60));
    const minutesUntilNext = 5 - (minutesSinceRegen % 5);
    return minutesUntilNext;
  };

  const energyPercentage = (currentEnergy / maxEnergy) * 100;
  const nextRegenMinutes = currentEnergy < maxEnergy ? getNextRegenTime() : 0;

  const purchaseEnergy = (amount: number, cost: number) => {
    if (gems >= cost && currentEnergy < maxEnergy) {
      const newEnergy = Math.min(currentEnergy + amount, maxEnergy);
      onEnergyChange(newEnergy);
      setGems(gems - cost);
    }
  };

  const claimStreakBonus = () => {
    if (streak >= 3) {
      const bonus = Math.min(20, maxEnergy - currentEnergy);
      onEnergyChange(currentEnergy + bonus);
      setStreak(0); // Reset streak after claiming
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Energy Display */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-warning" />
            Energy System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Energy Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Energy</span>
              <span className="text-lg font-bold">
                {currentEnergy}/{maxEnergy}
              </span>
            </div>
            <Progress 
              value={energyPercentage} 
              className="h-3"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {currentEnergy < maxEnergy ? (
                  <>
                    <Clock className="h-3 w-3 inline mr-1" />
                    Next energy in {nextRegenMinutes}m
                  </>
                ) : (
                  "Energy Full!"
                )}
              </span>
              <span>1 energy = 5 minutes</span>
            </div>
          </div>

          {/* Energy Status */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="space-y-1">
              <div className="text-lg font-bold text-success">{currentEnergy}</div>
              <div className="text-xs text-muted-foreground">Available</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-warning">{maxEnergy - currentEnergy}</div>
              <div className="text-xs text-muted-foreground">Recharging</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-primary">{gems}</div>
              <div className="text-xs text-muted-foreground">Gems</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streak Bonus */}
      {streak >= 3 && (
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-warning" />
                <div>
                  <div className="font-medium">Streak Bonus!</div>
                  <div className="text-sm text-muted-foreground">
                    {streak} day streak - Claim +20 energy
                  </div>
                </div>
              </div>
              <Button 
                onClick={claimStreakBonus}
                size="sm"
                className="ml-2"
              >
                <Gift className="h-4 w-4 mr-1" />
                Claim
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Energy Shop */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Coffee className="h-5 w-5" />
            Energy Shop
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2">
            <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-destructive" />
                <div>
                  <div className="font-medium text-sm">Refill +10</div>
                  <div className="text-xs text-muted-foreground">Quick boost</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Gem className="h-3 w-3 mr-1" />
                  50
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => purchaseEnergy(10, 50)}
                  disabled={gems < 50 || currentEnergy >= maxEnergy}
                >
                  Buy
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-warning" />
                <div>
                  <div className="font-medium text-sm">Full Refill</div>
                  <div className="text-xs text-muted-foreground">Complete restore</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Gem className="h-3 w-3 mr-1" />
                  100
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => purchaseEnergy(maxEnergy - currentEnergy, 100)}
                  disabled={gems < 100 || currentEnergy >= maxEnergy}
                >
                  Buy
                </Button>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            Earn gems by completing lessons and maintaining streaks
          </div>
        </CardContent>
      </Card>
    </div>
  );
}