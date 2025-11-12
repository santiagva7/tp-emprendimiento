import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { demoClients, Client } from "@/lib/demoData";
import { toast } from "@/hooks/use-toast";

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(demoClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [activeType, setActiveType] = useState<"client" | "supplier">("client");
  const [formData, setFormData] = useState<Partial<Client>>({});

  const filteredClients = clients.filter(
    (client) =>
      client.type === activeType &&
      (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.taxId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenDialog = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      setFormData(client);
    } else {
      setEditingClient(null);
      setFormData({ type: activeType });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingClient) {
      setClients(clients.map((c) => (c.id === editingClient.id ? { ...formData as Client } : c)));
      toast({
        title: activeType === "client" ? "Cliente actualizado" : "Proveedor actualizado",
        description: "Los cambios se guardaron correctamente.",
      });
    } else {
      const newClient: Client = {
        ...(formData as Client),
        id: Date.now().toString(),
        type: activeType,
      };
      setClients([...clients, newClient]);
      toast({
        title: activeType === "client" ? "Cliente agregado" : "Proveedor agregado",
        description: `El nuevo ${activeType === "client" ? "cliente" : "proveedor"} se agregó al sistema.`,
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
    toast({
      title: activeType === "client" ? "Cliente eliminado" : "Proveedor eliminado",
      description: `El ${activeType === "client" ? "cliente" : "proveedor"} se eliminó del sistema.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Clientes y Proveedores</h1>
          <p className="text-muted-foreground">Administre su red de contactos comerciales</p>
        </div>
      </div>

      <Tabs value={activeType} onValueChange={(v) => setActiveType(v as "client" | "supplier")}>
        <TabsList>
          <TabsTrigger value="client">Clientes</TabsTrigger>
          <TabsTrigger value="supplier">Proveedores</TabsTrigger>
        </TabsList>

        <TabsContent value={activeType} className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => handleOpenDialog()} className="gap-2">
              <Plus className="h-4 w-4" />
              {activeType === "client" ? "Nuevo Cliente" : "Nuevo Proveedor"}
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Contacto</TableHead>
                      <TableHead>CUIT/Tax ID</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Notas</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.contact}</TableCell>
                        <TableCell className="font-mono text-sm">{client.taxId}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell className="max-w-xs truncate">{client.notes}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenDialog(client)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(client.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingClient 
                ? `Editar ${activeType === "client" ? "Cliente" : "Proveedor"}` 
                : `Nuevo ${activeType === "client" ? "Cliente" : "Proveedor"}`}
            </DialogTitle>
            <DialogDescription>
              Complete los datos de contacto. Los campos marcados son obligatorios.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Teléfono *</Label>
                <Input
                  id="contact"
                  value={formData.contact || ""}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">CUIT/Tax ID *</Label>
                <Input
                  id="taxId"
                  value={formData.taxId || ""}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                value={formData.notes || ""}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
