
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { UserAvatar } from "@/components/UserAvatar";

export function AccountSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false
  });

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));

    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved."
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <UserAvatar 
              src={undefined} 
              name={user?.name || "User"}
              size="lg"
            />
            <div>
              <h3 className="font-medium">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form>
            <div className="space-y-4">
              <FormField
                name="emailNotifications"
                render={() => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={notifications.email}
                        onCheckedChange={() => handleNotificationChange('email')}
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel>Email notifications</FormLabel>
                      <FormDescription>
                        Receive emails about your orders and rides.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                name="pushNotifications"
                render={() => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={notifications.push}
                        onCheckedChange={() => handleNotificationChange('push')}
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel>Push notifications</FormLabel>
                      <FormDescription>
                        Get real-time updates about your orders and rides.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                name="marketingNotifications"
                render={() => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={notifications.marketing}
                        onCheckedChange={() => handleNotificationChange('marketing')}
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel>Marketing emails</FormLabel>
                      <FormDescription>
                        Receive updates about special offers and promotions.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
