import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { demoProducts, demoSales } from "@/lib/demoData";

const Reports = () => {
  // Calculate profit margin per product
  const productProfits = demoProducts.map(product => ({
    name: product.name.substring(0, 20),
    margin: ((product.price - product.cost) / product.price * 100).toFixed(1),
  })).slice(0, 6);

  // Sales by category
  const categoryData = demoProducts.reduce((acc, product) => {
    const existing = acc.find(item => item.name === product.category);
    if (existing) {
      existing.value += product.stock * product.price;
    } else {
      acc.push({ name: product.category, value: product.stock * product.price });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  // Monthly evolution
  const monthlyEvolution = [
    { month: "Ene", ventas: 450000, stock: 180, productos: 8 },
    { month: "Feb", ventas: 520000, stock: 165, productos: 8 },
    { month: "Mar", ventas: 480000, stock: 155, productos: 8 },
    { month: "Abr", ventas: 610000, stock: 145, productos: 9 },
    { month: "May", ventas: 580000, stock: 160, productos: 9 },
    { month: "Jun", ventas: 650000, stock: 175, productos: 10 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const totalRevenue = demoSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCost = demoSales.reduce((sum, sale) => {
    return sum + sale.products.reduce((pSum, p) => {
      const product = demoProducts.find(prod => prod.id === p.productId);
      return pSum + (product?.cost || 0) * p.quantity;
    }, 0);
  }, 0);
  const grossProfit = totalRevenue - totalCost;
  const avgMargin = ((grossProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Reportes y Métricas</h1>
        <p className="text-muted-foreground">Análisis detallado del desempeño del negocio</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ganancia Bruta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${grossProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Últimos 30 días</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Margen Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{avgMargin}%</div>
            <p className="text-xs text-muted-foreground mt-1">Sobre ventas totales</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tasa de Rotación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">2.4x</div>
            <p className="text-xs text-muted-foreground mt-1">Veces por mes</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Margen de Ganancia por Producto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productProfits}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" angle={-45} textAnchor="end" height={100} />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Bar dataKey="margin" fill="hsl(var(--accent))" name="Margen %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
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

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evolución Mensual del Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyEvolution}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis yAxisId="left" className="text-xs" />
                <YAxis yAxisId="right" orientation="right" className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="ventas" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Ventas ($)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="stock" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  name="Stock Total"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
