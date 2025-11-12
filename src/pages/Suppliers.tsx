import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Star, Phone, Mail, MapPin, Truck, Package } from "lucide-react";
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
import { demoSuppliers, demoDeliveries, Supplier, Delivery } from "@/lib/demoData";
import { toast } from "@/hooks/use-toast";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(demoSuppliers);
  const [deliveries, setDeliveries] = useState<Delivery[]>(demoDeliveries);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [editingDelivery, setEditingDelivery] = useState<Delivery | null>(null);

  const [supplierFormData, setSupplierFormData] = useState<Partial<Supplier>>({});
  const [deliveryFormData, setDeliveryFormData] = useState<Partial<Delivery>>({});

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenSupplierDialog = (supplier?: Supplier) => {
    if (supplier) {
      setEditingSupplier(supplier);
      setSupplierFormData(supplier);
    } else {
      setEditingSupplier(null);
      setSupplierFormData({});
    }
    setIsSupplierDialogOpen(true);
  };

  const handleOpenDeliveryDialog = (delivery?: Delivery) => {
    if (delivery) {
      setEditingDelivery(delivery);
      setDeliveryFormData(delivery);
    } else {
      setEditingDelivery(null);
      setDeliveryFormData({});
    }
    setIsDeliveryDialogOpen(true);
  };

  const handleSaveSupplier = () => {
    if (editingSupplier) {
      setSuppliers(suppliers.map((s) => (s.id === editingSupplier.id ? { ...supplierFormData as Supplier } : s)));
      toast({
        title: "Proveedor actualizado",
        description: "Los cambios se guardaron correctamente.",
      });
    } else {
      const newSupplier: Supplier = {
        ...(supplierFormData as Supplier),
        id: `S${String(suppliers.length + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString().split('T')[0],
        isActive: true,
      };
      setSuppliers([...suppliers, newSupplier]);
      toast({
        title: "Proveedor agregado",
        description: "El nuevo proveedor se agregó al sistema.",
      });
    }
    setIsSupplierDialogOpen(false);
  };

  const handleSaveDelivery = () => {
    if (editingDelivery) {
      setDeliveries(deliveries.map((d) => (d.id === editingDelivery.id ? { ...deliveryFormData as Delivery } : d)));
      toast({
        title: "Entrega actualizada",
        description: "Los cambios se guardaron correctamente.",
      });
    } else {
      const newDelivery: Delivery = {
        ...(deliveryFormData as Delivery),
        id: `D${String(deliveries.length + 1).padStart(3, '0')}`,
        status: "pending",
      } as Delivery;
      setDeliveries([...deliveries, newDelivery]);
      toast({
        title: "Entrega registrada",
        description: "La nueva entrega se agregó al sistema.",
      });
    }
    setIsDeliveryDialogOpen(false);
  };

  const handleDeleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
    toast({
      title: "Proveedor eliminado",
      description: "El proveedor se eliminó del sistema.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: Delivery['status']) => {
    const statusConfig = {
      pending: { label: "Pendiente", variant: "secondary" as const },
      in_transit: { label: "En Tránsito", variant: "default" as const },
      delivered: { label: "Entregado", variant: "success" as const },
      cancelled: { label: "Cancelado", variant: "destructive" as const },
    };
    return statusConfig[status];
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const activeSuppliers = suppliers.filter(s => s.isActive).length;
  const totalDeliveries = deliveries.length;
  const pendingDeliveries = deliveries.filter(d => d.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestión de Proveedores</h1>
          <p className="text-muted-foreground">Administre sus proveedores y control de entregas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleOpenDeliveryDialog()} className="gap-2">
            <Truck className="h-4 w-4" />
            Nueva Entrega
          </Button>
          <Button onClick={() => handleOpenSupplierDialog()} className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Proveedor
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Proveedores Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSuppliers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              de {suppliers.length} totales
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Entregas Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeliveries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Este mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Entregas Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingDeliveries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requieren seguimiento
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suppliers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suppliers">Proveedores</TabsTrigger>
          <TabsTrigger value="deliveries">Control de Entregas</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, contacto o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Proveedor</TableHead>
                      <TableHead>Contacto</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Condiciones</TableHead>
                      <TableHead>Calificación</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell>{supplier.contact}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {supplier.phone}
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {supplier.email}
                        </TableCell>
                        <TableCell>{supplier.paymentTerms}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getRatingStars(supplier.rating)}
                            <span className="text-sm text-muted-foreground ml-1">
                              ({supplier.rating})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={supplier.isActive ? "success" : "secondary"}>
                            {supplier.isActive ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenSupplierDialog(supplier)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteSupplier(supplier.id)}
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

        <TabsContent value="deliveries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Control de Entregas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Orden</TableHead>
                      <TableHead>Proveedor</TableHead>
                      <TableHead>Fecha Esperada</TableHead>
                      <TableHead>Fecha Real</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Productos</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Calidad</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliveries.map((delivery) => {
                      const status = getStatusBadge(delivery.status);
                      return (
                        <TableRow key={delivery.id}>
                          <TableCell className="font-mono text-sm">{delivery.orderNumber}</TableCell>
                          <TableCell className="font-medium">{delivery.supplierName}</TableCell>
                          <TableCell>{new Date(delivery.expectedDate).toLocaleDateString('es-AR')}</TableCell>
                          <TableCell>
                            {delivery.actualDate ? new Date(delivery.actualDate).toLocaleDateString('es-AR') : '-'}
                          </TableCell>
                          <TableCell>
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {delivery.products.map((product, idx) => (
                                <div key={idx} className="text-sm">
                                  {product.productName} × {product.quantity}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            ${delivery.totalAmount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {delivery.qualityRating ? (
                              <div className="flex items-center gap-1">
                                {getRatingStars(delivery.qualityRating)}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOpenDeliveryDialog(delivery)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Supplier Dialog */}
      <Dialog open={isSupplierDialogOpen} onOpenChange={setIsSupplierDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSupplier ? "Editar Proveedor" : "Nuevo Proveedor"}
            </DialogTitle>
            <DialogDescription>
              Complete los datos del proveedor. Todos los campos son obligatorios.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Proveedor</Label>
                <Input
                  id="name"
                  value={supplierFormData.name || ""}
                  onChange={(e) => setSupplierFormData({ ...supplierFormData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Persona de Contacto</Label>
                <Input
                  id="contact"
                  value={supplierFormData.contact || ""}
                  onChange={(e) => setSupplierFormData({ ...supplierFormData, contact: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={supplierFormData.phone || ""}
                  onChange={(e) => setSupplierFormData({ ...supplierFormData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={supplierFormData.email || ""}
                  onChange={(e) => setSupplierFormData({ ...supplierFormData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={supplierFormData.address || ""}
                onChange={(e) => setSupplierFormData({ ...supplierFormData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxId">CUIT/CUIL</Label>
                <Input
                  id="taxId"
                  value={supplierFormData.taxId || ""}
                  onChange={(e) => setSupplierFormData({ ...supplierFormData, taxId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Condiciones de Pago</Label>
                <Input
                  id="paymentTerms"
                  value={supplierFormData.paymentTerms || ""}
                  onChange={(e) => setSupplierFormData({ ...supplierFormData, paymentTerms: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                value={supplierFormData.notes || ""}
                onChange={(e) => setSupplierFormData({ ...supplierFormData, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSupplierDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveSupplier}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delivery Dialog */}
      <Dialog open={isDeliveryDialogOpen} onOpenChange={setIsDeliveryDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingDelivery ? "Editar Entrega" : "Nueva Entrega"}
            </DialogTitle>
            <DialogDescription>
              Registre una nueva entrega o actualice los datos de una existente.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Número de Orden</Label>
                <Input
                  id="orderNumber"
                  value={deliveryFormData.orderNumber || ""}
                  onChange={(e) => setDeliveryFormData({ ...deliveryFormData, orderNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplierId">Proveedor</Label>
                <select
                  id="supplierId"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={deliveryFormData.supplierId || ""}
                  onChange={(e) => {
                    const supplier = suppliers.find(s => s.id === e.target.value);
                    setDeliveryFormData({ 
                      ...deliveryFormData, 
                      supplierId: e.target.value,
                      supplierName: supplier?.name || ""
                    });
                  }}
                >
                  <option value="">Seleccionar proveedor</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expectedDate">Fecha Esperada</Label>
                <Input
                  id="expectedDate"
                  type="date"
                  value={deliveryFormData.expectedDate || ""}
                  onChange={(e) => setDeliveryFormData({ ...deliveryFormData, expectedDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actualDate">Fecha Real</Label>
                <Input
                  id="actualDate"
                  type="date"
                  value={deliveryFormData.actualDate || ""}
                  onChange={(e) => setDeliveryFormData({ ...deliveryFormData, actualDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={deliveryFormData.status || ""}
                onChange={(e) => setDeliveryFormData({ ...deliveryFormData, status: e.target.value as Delivery['status'] })}
              >
                <option value="pending">Pendiente</option>
                <option value="in_transit">En Tránsito</option>
                <option value="delivered">Entregado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualityNotes">Notas de Calidad</Label>
              <Textarea
                id="qualityNotes"
                value={deliveryFormData.qualityNotes || ""}
                onChange={(e) => setDeliveryFormData({ ...deliveryFormData, qualityNotes: e.target.value })}
                placeholder="Evaluación de la calidad de los productos recibidos..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryNotes">Notas de Entrega</Label>
              <Textarea
                id="deliveryNotes"
                value={deliveryFormData.deliveryNotes || ""}
                onChange={(e) => setDeliveryFormData({ ...deliveryFormData, deliveryNotes: e.target.value })}
                placeholder="Comentarios sobre la entrega..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeliveryDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveDelivery}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Suppliers;
