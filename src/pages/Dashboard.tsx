import { TrendingUp, Package, DollarSign, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { demoProducts, demoSales } from "@/lib/demoData";

const Dashboard = () => {
  // Calculate metrics
  const totalSales = demoSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalStock = demoProducts.reduce((sum, product) => sum + product.stock, 0);
  const lowStockProducts = demoProducts.filter(p => p.stock < p.minStock).length;
  
  const totalCost = demoSales.reduce((sum, sale) => {
    return sum + sale.products.reduce((pSum, p) => {
      const product = demoProducts.find(prod => prod.id === p.productId);
      return pSum + (product?.cost || 0) * p.quantity;
    }, 0);
  }, 0);
  const profit = totalSales - totalCost;

  // Top selling products
  const productSales = demoSales.flatMap(sale => sale.products);
  const topProducts = demoProducts
    .map(product => ({
      name: product.name,
      quantity: productSales
        .filter(p => p.productId === product.id)
        .reduce((sum, p) => sum + p.quantity, 0),
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  // Monthly sales data
  const monthlySales = [
    { month: "Ene", sales: 450000, profit: 135000 },
    { month: "Feb", sales: 520000, profit: 156000 },
    { month: "Mar", sales: 480000, profit: 144000 },
    { month: "Abr", sales: 610000, profit: 183000 },
    { month: "May", sales: 580000, profit: 174000 },
    { month: "Jun", sales: 650000, profit: 195000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Vista general del negocio</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganancia Estimada</CardTitle>
            <TrendingUp className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${profit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Margen promedio: {((profit / totalSales) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Disponible</CardTitle>
            <Package className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock} unidades</div>
            <p className="text-xs text-muted-foreground mt-1">
              {demoProducts.length} productos registrados
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{lowStockProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Productos por debajo del mínimo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ventas y Ganancias Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Ventas"
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Ganancia"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
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
                <Bar dataKey="quantity" fill="hsl(var(--secondary))" name="Cantidad vendida" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Alerta de Stock Bajo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {demoProducts
                .filter(p => p.stock < p.minStock)
                .map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-card rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Stock actual: {product.stock} | Mínimo: {product.minStock}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-destructive">
                      Reponer {product.minStock - product.stock} unidades
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
