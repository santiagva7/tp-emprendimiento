import { useState } from "react";
import { Plus, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { demoCashFlow, demoFinancialPeriods, demoProducts, demoSales, CashFlow } from "@/lib/demoData";
import { toast } from "@/hooks/use-toast";

const Finance = () => {
  const [cashFlow, setCashFlow] = useState<CashFlow[]>(demoCashFlow);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<CashFlow | null>(null);
  const [formData, setFormData] = useState<Partial<CashFlow>>({});

  // Cálculos financieros
  const totalIncome = cashFlow.filter(cf => cf.type === "income").reduce((sum, cf) => sum + cf.amount, 0);
  const totalExpenses = cashFlow.filter(cf => cf.type === "expense").reduce((sum, cf) => sum + cf.amount, 0);
  const netCashFlow = totalIncome - totalExpenses;
  const recentTransactions = cashFlow.slice(0, 10);

  // Cálculo de costos y márgenes por producto
  const productMargins = demoProducts.map(product => ({
    name: product.name.substring(0, 20),
    cost: product.cost,
    price: product.price,
    margin: product.price - product.cost,
    marginPercentage: ((product.price - product.cost) / product.price * 100).toFixed(1),
  }));

  // Distribución de ingresos por categoría
  const incomeByCategory = cashFlow
    .filter(cf => cf.type === "income")
    .reduce((acc, cf) => {
      const category = cf.category;
      if (!acc[category]) acc[category] = 0;
      acc[category] += cf.amount;
      return acc;
    }, {} as Record<string, number>);

  const incomeChartData = Object.entries(incomeByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  // Distribución de gastos por categoría
  const expenseByCategory = cashFlow
    .filter(cf => cf.type === "expense")
    .reduce((acc, cf) => {
      const category = cf.category;
      if (!acc[category]) acc[category] = 0;
      acc[category] += cf.amount;
      return acc;
    }, {} as Record<string, number>);

  const expenseChartData = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--chart-6))'];

  const handleOpenDialog = (transaction?: CashFlow) => {
    if (transaction) {
      setEditingTransaction(transaction);
      setFormData(transaction);
    } else {
      setEditingTransaction(null);
      setFormData({ type: "income" });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingTransaction) {
      setCashFlow(cashFlow.map((cf) => (cf.id === editingTransaction.id ? { ...formData as CashFlow } : cf)));
      toast({
        title: "Transacción actualizada",
        description: "Los cambios se guardaron correctamente.",
      });
    } else {
      const newTransaction: CashFlow = {
        ...(formData as CashFlow),
        id: `CF${String(cashFlow.length + 1).padStart(3, '0')}`,
        amount: Number(formData.amount) || 0,
      };
      setCashFlow([...cashFlow, newTransaction]);
      toast({
        title: "Transacción agregada",
        description: "La nueva transacción se agregó al sistema.",
      });
    }
    setIsDialogOpen(false);
  };

  // Estados contables simplificados
  const currentPeriod = demoFinancialPeriods[demoFinancialPeriods.length - 1];
  const totalAssets = 8500000; // Activos estimados
  const totalLiabilities = 1200000; // Pasivos estimados
  const equity = totalAssets - totalLiabilities;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Finanzas</h1>
          <p className="text-muted-foreground">Gestión financiera completa y estados contables</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Transacción
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ingresos Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Este período
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gastos Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              Este período
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Flujo de Caja Neto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(netCashFlow).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {netCashFlow >= 0 ? 'Positivo' : 'Negativo'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Margen Bruto Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPeriod.grossMargin}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Último período
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cashflow" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cashflow">Flujo de Caja</TabsTrigger>
          <TabsTrigger value="statements">Estados Contables</TabsTrigger>
          <TabsTrigger value="margins">Costos y Márgenes</TabsTrigger>
        </TabsList>

        <TabsContent value="cashflow" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Ingresos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={incomeChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {incomeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                      formatter={(value: number) => `$${value.toLocaleString()}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución de Gastos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                      formatter={(value: number) => `$${value.toLocaleString()}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Movimientos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{new Date(transaction.date).toLocaleDateString('es-AR')}</TableCell>
                        <TableCell>
                          <Badge variant={transaction.type === "income" ? "success" : "destructive"}>
                            {transaction.type === "income" ? "Ingreso" : "Gasto"}
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize">{transaction.category}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.paymentMethod}</TableCell>
                        <TableCell className={`text-right font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statements" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Balance General Simplificado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">ACTIVOS</h3>
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Efectivo</span>
                        <span className="font-medium">${(totalAssets * 0.15).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cuentas por cobrar</span>
                        <span className="font-medium">${(totalAssets * 0.10).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Inventario</span>
                        <span className="font-medium">${(totalAssets * 0.45).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Activos fijos</span>
                        <span className="font-medium">${(totalAssets * 0.30).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                        <span>Total Activos</span>
                        <span>${totalAssets.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">PASIVOS</h3>
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cuentas por pagar</span>
                        <span className="font-medium">${(totalLiabilities * 0.60).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deuda a corto plazo</span>
                        <span className="font-medium">${(totalLiabilities * 0.30).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Otros pasivos</span>
                        <span className="font-medium">${(totalLiabilities * 0.10).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                        <span>Total Pasivos</span>
                        <span>${totalLiabilities.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">PATRIMONIO</h3>
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capital social</span>
                        <span className="font-medium">${(equity * 0.50).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Utilidades retenidas</span>
                        <span className="font-medium">${(equity * 0.50).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                        <span>Total Patrimonio</span>
                        <span>${equity.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado de Resultados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">INGRESOS</h3>
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ventas</span>
                        <span className="font-medium">${currentPeriod.income.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Otros ingresos</span>
                        <span className="font-medium">${(currentPeriod.income * 0.05).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                        <span>Total Ingresos</span>
                        <span>${(currentPeriod.income * 1.05).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">GASTOS</h3>
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Costo de ventas</span>
                        <span className="font-medium">${(currentPeriod.income * 0.55).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gastos operativos</span>
                        <span className="font-medium">${(currentPeriod.expenses * 0.60).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                        <span>Total Gastos</span>
                        <span>${currentPeriod.expenses.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 pt-4">
                    <div className="flex justify-between text-xl font-bold text-green-600">
                      <span>Utilidad Neta</span>
                      <span>${currentPeriod.netIncome.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Margen operativo: {currentPeriod.operatingMargin}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Evolución Financiera por Período</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={demoFinancialPeriods}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="period" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Ingresos"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                    name="Gastos"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="netIncome" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    name="Utilidad Neta"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="margins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Márgenes por Producto</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productMargins}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" angle={-45} textAnchor="end" height={100} />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="cost" fill="hsl(var(--destructive))" name="Costo" />
                  <Bar dataKey="price" fill="hsl(var(--primary))" name="Precio Venta" />
                  <Bar dataKey="margin" fill="hsl(var(--success))" name="Margen" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tabla de Costos y Márgenes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-right">Costo</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                      <TableHead className="text-right">Margen ($)</TableHead>
                      <TableHead className="text-right">Margen (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productMargins.map((product, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-right">${product.cost.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium">${product.price.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-green-600 font-bold">
                          ${product.margin.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="success">{product.marginPercentage}%</Badge>
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

      {/* Dialog para nueva transacción */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Transacción</DialogTitle>
            <DialogDescription>
              Registre un ingreso o gasto en el flujo de caja.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={formData.type || "income"}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as "income" | "expense" })}
              >
                <option value="income">Ingreso</option>
                <option value="expense">Gasto</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input
                id="date"
                type="date"
                value={formData.date || ""}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Seleccionar categoría</option>
                {formData.type === "income" ? (
                  <>
                    <option value="sales">Ventas</option>
                    <option value="services">Servicios</option>
                    <option value="investments">Inversiones</option>
                    <option value="other_income">Otros Ingresos</option>
                  </>
                ) : (
                  <>
                    <option value="purchases">Compras</option>
                    <option value="salaries">Salarios</option>
                    <option value="rent">Alquiler</option>
                    <option value="utilities">Servicios</option>
                    <option value="marketing">Marketing</option>
                    <option value="office_supplies">Materiales de Oficina</option>
                    <option value="other_expenses">Otros Gastos</option>
                  </>
                )}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Monto</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount || ""}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Método de Pago</Label>
                <select
                  id="paymentMethod"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.paymentMethod || ""}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                >
                  <option value="">Seleccionar método</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Transferencia bancaria">Transferencia bancaria</option>
                  <option value="Tarjeta de débito">Tarjeta de débito</option>
                  <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                value={formData.notes || ""}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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

export default Finance;

