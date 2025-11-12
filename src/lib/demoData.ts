export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  cost: number;
  price: number;
  supplier: string;
}

export interface Sale {
  id: string;
  date: string;
  client: string;
  products: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

export interface Client {
  id: string;
  name: string;
  contact: string;
  taxId: string;
  email: string;
  notes: string;
  type: "client" | "supplier";
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  taxId: string;
  paymentTerms: string;
  rating: number;
  notes: string;
  isActive: boolean;
  createdAt: string;
}

export interface Delivery {
  id: string;
  supplierId: string;
  supplierName: string;
  orderNumber: string;
  expectedDate: string;
  actualDate?: string;
  status: "pending" | "in_transit" | "delivered" | "cancelled";
  products: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  totalAmount: number;
  qualityRating?: number;
  qualityNotes?: string;
  deliveryNotes?: string;
}

export interface CashFlow {
  id: string;
  date: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  notes?: string;
}

export interface FinancialPeriod {
  period: string;
  income: number;
  expenses: number;
  netIncome: number;
  grossMargin: number;
  operatingMargin: number;
}

export type CashFlowCategory = 
  | "sales"
  | "services" 
  | "investments"
  | "other_income"
  | "purchases"
  | "salaries"
  | "rent"
  | "utilities"
  | "marketing"
  | "office_supplies"
  | "other_expenses";

export const demoProducts: Product[] = [
  {
    id: "1",
    code: "PROD001",
    name: "Notebook Lenovo ThinkPad",
    category: "Computadoras",
    stock: 15,
    minStock: 5,
    cost: 45000,
    price: 65000,
    supplier: "TechDist SA",
  },
  {
    id: "2",
    code: "PROD002",
    name: "Monitor Samsung 27\"",
    category: "Monitores",
    stock: 3,
    minStock: 8,
    cost: 25000,
    price: 35000,
    supplier: "ElectroPlus",
  },
  {
    id: "3",
    code: "PROD003",
    name: "Teclado Mecánico RGB",
    category: "Periféricos",
    stock: 45,
    minStock: 10,
    cost: 8000,
    price: 12000,
    supplier: "Gaming World",
  },
  {
    id: "4",
    code: "PROD004",
    name: "Mouse Logitech MX Master",
    category: "Periféricos",
    stock: 28,
    minStock: 15,
    cost: 5500,
    price: 8500,
    supplier: "TechDist SA",
  },
  {
    id: "5",
    code: "PROD005",
    name: "Router TP-Link AC1200",
    category: "Redes",
    stock: 12,
    minStock: 8,
    cost: 4200,
    price: 6500,
    supplier: "NetworkPro",
  },
  {
    id: "6",
    code: "PROD006",
    name: "Webcam Logitech C920",
    category: "Periféricos",
    stock: 2,
    minStock: 10,
    cost: 7000,
    price: 11000,
    supplier: "ElectroPlus",
  },
  {
    id: "7",
    code: "PROD007",
    name: "Disco SSD 1TB Samsung",
    category: "Almacenamiento",
    stock: 34,
    minStock: 12,
    cost: 12000,
    price: 18000,
    supplier: "TechDist SA",
  },
  {
    id: "8",
    code: "PROD008",
    name: "Auriculares Sony WH-1000XM4",
    category: "Audio",
    stock: 18,
    minStock: 10,
    cost: 28000,
    price: 42000,
    supplier: "AudioMax",
  },
];

export const demoSales: Sale[] = [
  {
    id: "S001",
    date: "2025-10-20",
    client: "Empresa TechSolutions",
    products: [
      { productId: "1", productName: "Notebook Lenovo ThinkPad", quantity: 3, price: 65000 },
      { productId: "4", productName: "Mouse Logitech MX Master", quantity: 3, price: 8500 },
    ],
    total: 220500,
  },
  {
    id: "S002",
    date: "2025-10-19",
    client: "Comercial Sur SA",
    products: [
      { productId: "2", productName: "Monitor Samsung 27\"", quantity: 5, price: 35000 },
    ],
    total: 175000,
  },
  {
    id: "S003",
    date: "2025-10-18",
    client: "Estudio Creativo Digital",
    products: [
      { productId: "8", productName: "Auriculares Sony WH-1000XM4", quantity: 2, price: 42000 },
      { productId: "3", productName: "Teclado Mecánico RGB", quantity: 2, price: 12000 },
    ],
    total: 108000,
  },
  {
    id: "S004",
    date: "2025-10-17",
    client: "Oficina Central",
    products: [
      { productId: "5", productName: "Router TP-Link AC1200", quantity: 4, price: 6500 },
    ],
    total: 26000,
  },
  {
    id: "S005",
    date: "2025-10-15",
    client: "Servicios IT Integral",
    products: [
      { productId: "7", productName: "Disco SSD 1TB Samsung", quantity: 8, price: 18000 },
      { productId: "6", productName: "Webcam Logitech C920", quantity: 6, price: 11000 },
    ],
    total: 210000,
  },
  {
    id: "S006",
    date: "2025-10-12",
    client: "Gaming Store",
    products: [
      { productId: "3", productName: "Teclado Mecánico RGB", quantity: 15, price: 12000 },
      { productId: "4", productName: "Mouse Logitech MX Master", quantity: 15, price: 8500 },
    ],
    total: 307500,
  },
];

export const demoClients: Client[] = [
  {
    id: "C001",
    name: "Empresa TechSolutions",
    contact: "+54 11 4567-8901",
    taxId: "30-71234567-8",
    email: "compras@techsolutions.com",
    notes: "Cliente corporativo - Descuento 10%",
    type: "client",
  },
  {
    id: "C002",
    name: "Comercial Sur SA",
    contact: "+54 11 4567-8902",
    taxId: "30-71234568-9",
    email: "ventas@comercialsur.com",
    notes: "Pago a 30 días",
    type: "client",
  },
  {
    id: "C003",
    name: "Estudio Creativo Digital",
    contact: "+54 11 4567-8903",
    taxId: "30-71234569-0",
    email: "estudio@creativodigital.com",
    notes: "Cliente nuevo - Seguimiento mensual",
    type: "client",
  },
];

export const demoSuppliers: Supplier[] = [
  {
    id: "S001",
    name: "TechDist SA",
    contact: "Juan Pérez",
    phone: "+54 11 5678-9012",
    email: "ventas@techdist.com",
    address: "Av. Corrientes 1234, CABA",
    taxId: "30-81234567-8",
    paymentTerms: "30 días",
    rating: 4.8,
    notes: "Proveedor principal - Mejores precios y calidad",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "S002",
    name: "ElectroPlus",
    contact: "María González",
    phone: "+54 11 5678-9013",
    email: "distribuidora@electroplus.com",
    address: "Av. Santa Fe 5678, CABA",
    taxId: "30-81234568-9",
    paymentTerms: "15 días",
    rating: 4.2,
    notes: "Proveedor secundario - Entrega rápida",
    isActive: true,
    createdAt: "2024-02-10",
  },
  {
    id: "S003",
    name: "Gaming World",
    contact: "Carlos Rodríguez",
    phone: "+54 11 5678-9014",
    email: "ventas@gamingworld.com",
    address: "Av. Rivadavia 9012, CABA",
    taxId: "30-81234569-0",
    paymentTerms: "45 días",
    rating: 3.9,
    notes: "Especialista en productos gaming",
    isActive: true,
    createdAt: "2024-03-05",
  },
  {
    id: "S004",
    name: "NetworkPro",
    contact: "Ana Martínez",
    phone: "+54 11 5678-9015",
    email: "comercial@networkpro.com",
    address: "Av. 9 de Julio 3456, CABA",
    taxId: "30-81234570-1",
    paymentTerms: "30 días",
    rating: 4.5,
    notes: "Especialista en equipos de red",
    isActive: true,
    createdAt: "2024-04-12",
  },
  {
    id: "S005",
    name: "AudioMax",
    contact: "Roberto Silva",
    phone: "+54 11 5678-9016",
    email: "ventas@audiomax.com",
    address: "Av. Córdoba 7890, CABA",
    taxId: "30-81234571-2",
    paymentTerms: "20 días",
    rating: 4.6,
    notes: "Proveedor de audio profesional",
    isActive: false,
    createdAt: "2024-05-20",
  },
];

export const demoDeliveries: Delivery[] = [
  {
    id: "D001",
    supplierId: "S001",
    supplierName: "TechDist SA",
    orderNumber: "ORD-2024-001",
    expectedDate: "2024-12-15",
    actualDate: "2024-12-14",
    status: "delivered",
    products: [
      {
        productId: "1",
        productName: "Notebook Lenovo ThinkPad",
        quantity: 10,
        unitPrice: 45000,
        totalPrice: 450000,
      },
      {
        productId: "4",
        productName: "Mouse Logitech MX Master",
        quantity: 20,
        unitPrice: 5500,
        totalPrice: 110000,
      },
    ],
    totalAmount: 560000,
    qualityRating: 5,
    qualityNotes: "Productos en perfecto estado, embalaje excelente",
    deliveryNotes: "Entrega puntual, personal muy profesional",
  },
  {
    id: "D002",
    supplierId: "S002",
    supplierName: "ElectroPlus",
    orderNumber: "ORD-2024-002",
    expectedDate: "2024-12-20",
    status: "in_transit",
    products: [
      {
        productId: "2",
        productName: "Monitor Samsung 27\"",
        quantity: 8,
        unitPrice: 25000,
        totalPrice: 200000,
      },
    ],
    totalAmount: 200000,
  },
  {
    id: "D003",
    supplierId: "S003",
    supplierName: "Gaming World",
    orderNumber: "ORD-2024-003",
    expectedDate: "2024-12-18",
    actualDate: "2024-12-18",
    status: "delivered",
    products: [
      {
        productId: "3",
        productName: "Teclado Mecánico RGB",
        quantity: 25,
        unitPrice: 8000,
        totalPrice: 200000,
      },
    ],
    totalAmount: 200000,
    qualityRating: 4,
    qualityNotes: "Buen producto, embalaje regular",
    deliveryNotes: "Entrega a tiempo",
  },
  {
    id: "D004",
    supplierId: "S004",
    supplierName: "NetworkPro",
    orderNumber: "ORD-2024-004",
    expectedDate: "2024-12-25",
    status: "pending",
    products: [
      {
        productId: "5",
        productName: "Router TP-Link AC1200",
        quantity: 15,
        unitPrice: 4200,
        totalPrice: 63000,
      },
    ],
    totalAmount: 63000,
  },
];

export const demoCashFlow: CashFlow[] = [
  // Ingresos
  {
    id: "CF001",
    date: "2024-12-20",
    type: "income",
    category: "sales",
    description: "Venta a Empresa TechSolutions",
    amount: 220500,
    paymentMethod: "Transferencia bancaria",
    notes: "Pago recibido en tiempo",
  },
  {
    id: "CF002",
    date: "2024-12-19",
    type: "income",
    category: "sales",
    description: "Venta a Comercial Sur SA",
    amount: 175000,
    paymentMethod: "Efectivo",
  },
  {
    id: "CF003",
    date: "2024-12-18",
    type: "income",
    category: "services",
    description: "Servicios de consultoría",
    amount: 50000,
    paymentMethod: "Transferencia bancaria",
  },
  {
    id: "CF004",
    date: "2024-12-17",
    type: "income",
    category: "sales",
    description: "Venta a Gaming Store",
    amount: 307500,
    paymentMethod: "Efectivo",
  },
  // Egresos
  {
    id: "CF005",
    date: "2024-12-16",
    type: "expense",
    category: "purchases",
    description: "Compra a TechDist SA - Notebooks y Mouses",
    amount: 560000,
    paymentMethod: "Transferencia bancaria",
    notes: "Orden ORD-2024-001",
  },
  {
    id: "CF006",
    date: "2024-12-15",
    type: "expense",
    category: "rent",
    description: "Alquiler oficina mensual",
    amount: 150000,
    paymentMethod: "Transferencia bancaria",
  },
  {
    id: "CF007",
    date: "2024-12-14",
    type: "expense",
    category: "salaries",
    description: "Nómina de empleados - Diciembre",
    amount: 320000,
    paymentMethod: "Transferencia bancaria",
  },
  {
    id: "CF008",
    date: "2024-12-13",
    type: "expense",
    category: "utilities",
    description: "Servicios (luz, agua, internet)",
    amount: 45000,
    paymentMethod: "Transferencia bancaria",
  },
  {
    id: "CF009",
    date: "2024-12-12",
    type: "expense",
    category: "marketing",
    description: "Campaña publicitaria digital",
    amount: 80000,
    paymentMethod: "Tarjeta de crédito",
  },
  {
    id: "CF010",
    date: "2024-12-11",
    type: "expense",
    category: "office_supplies",
    description: "Materiales de oficina",
    amount: 25000,
    paymentMethod: "Efectivo",
  },
  {
    id: "CF011",
    date: "2024-12-10",
    type: "expense",
    category: "purchases",
    description: "Compra a Gaming World - Teclados",
    amount: 200000,
    paymentMethod: "Transferencia bancaria",
    notes: "Orden ORD-2024-003",
  },
  {
    id: "CF012",
    date: "2024-12-09",
    type: "expense",
    category: "marketing",
    description: "Flyers y material gráfico",
    amount: 15000,
    paymentMethod: "Efectivo",
  },
];

export const demoFinancialPeriods: FinancialPeriod[] = [
  {
    period: "Enero 2024",
    income: 1850000,
    expenses: 1250000,
    netIncome: 600000,
    grossMargin: 38.5,
    operatingMargin: 32.4,
  },
  {
    period: "Febrero 2024",
    income: 2100000,
    expenses: 1320000,
    netIncome: 780000,
    grossMargin: 42.3,
    operatingMargin: 37.1,
  },
  {
    period: "Marzo 2024",
    income: 1950000,
    expenses: 1280000,
    netIncome: 670000,
    grossMargin: 36.9,
    operatingMargin: 34.4,
  },
  {
    period: "Abril 2024",
    income: 2450000,
    expenses: 1400000,
    netIncome: 1050000,
    grossMargin: 44.2,
    operatingMargin: 42.9,
  },
  {
    period: "Mayo 2024",
    income: 2300000,
    expenses: 1380000,
    netIncome: 920000,
    grossMargin: 41.8,
    operatingMargin: 40.0,
  },
  {
    period: "Junio 2024",
    income: 2650000,
    expenses: 1450000,
    netIncome: 1200000,
    grossMargin: 47.3,
    operatingMargin: 45.3,
  },
];
