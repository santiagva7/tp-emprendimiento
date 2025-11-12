import { useState } from "react";
import { Building2, DollarSign, Bell, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: "COBET",
    companyAddress: "Av. Corrientes 1234, CABA",
    currency: "ARS",
    vatRate: "21",
    lowStockThreshold: "10",
    enableNotifications: true,
    enableEmailAlerts: false,
  });

  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios se aplicaron correctamente.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Configuración</h1>
        <p className="text-muted-foreground">Administre las preferencias del sistema</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle>Información de la Empresa</CardTitle>
          </div>
          <CardDescription>
            Datos generales de su negocio que aparecerán en reportes y documentos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nombre de la Empresa</Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyAddress">Dirección</Label>
            <Input
              id="companyAddress"
              value={settings.companyAddress}
              onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <CardTitle>Configuración Comercial</CardTitle>
          </div>
          <CardDescription>
            Parámetros para cálculos financieros y gestión de stock
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Moneda</Label>
              <Input
                id="currency"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vatRate">IVA (%)</Label>
              <Input
                id="vatRate"
                type="number"
                value={settings.vatRate}
                onChange={(e) => setSettings({ ...settings, vatRate: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lowStockThreshold">Umbral de Stock Bajo</Label>
            <Input
              id="lowStockThreshold"
              type="number"
              value={settings.lowStockThreshold}
              onChange={(e) => setSettings({ ...settings, lowStockThreshold: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Se mostrará alerta cuando el stock esté por debajo de este valor
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notificaciones</CardTitle>
          </div>
          <CardDescription>
            Configure cómo desea recibir alertas del sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableNotifications">Notificaciones en pantalla</Label>
              <p className="text-sm text-muted-foreground">
                Recibir alertas de stock bajo y eventos importantes
              </p>
            </div>
            <Switch
              id="enableNotifications"
              checked={settings.enableNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, enableNotifications: checked })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableEmailAlerts">Alertas por email</Label>
              <p className="text-sm text-muted-foreground">
                Enviar resumen diario de ventas y stock crítico
              </p>
            </div>
            <Switch
              id="enableEmailAlerts"
              checked={settings.enableEmailAlerts}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, enableEmailAlerts: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            <CardTitle>Apariencia</CardTitle>
          </div>
          <CardDescription>
            Personalice el tema visual de la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              Tema Claro
            </Button>
            <Button variant="outline" className="flex-1">
              Tema Oscuro
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            El cambio de tema se implementará en futuras versiones
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={handleSave}>Guardar Cambios</Button>
      </div>
    </div>
  );
};

export default Settings;
