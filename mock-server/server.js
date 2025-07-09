import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// 取得當前檔案的目錄路徑
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// 中間件
app.use(cors());
app.use(express.json());

// 請求日誌中間件
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path} - Query:`, req.query);
  next();
});

// 讀取 JSON 檔案的函數
function readDB(filename) {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filePath}, returning empty array`);
      return [];
    }
    const data = fs.readJsonSync(filePath);
    console.log(`✅ Successfully read ${filename}, found ${data.length} items`);
    return data;
  } catch (error) {
    console.error(`❌ Error reading ${filename}:`, error.message);
    return [];
  }
}

// === API 路由 ===
// 用戶路由
app.get('/users', (req, res) => {
  //   const users = readDB('users.json');
  //   res.json(users);
  res.status(401).json({ error: 'User not found' });
});

// app.get('/users/:id', (req, res) => {
//   const users = readDB('users.json');
//   const user = users.find(u => u.id === req.params.id);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ error: 'User not found' });
//   }
// });

// app.post('/users', (req, res) => {
//   const users = readDB('users.json');
//   const newUser = {
//     id: Date.now().toString(),
//     ...req.body,
//     createdAt: new Date().toISOString(),
//   };
//   users.push(newUser);
// });

// // 票券路由
// app.get('/tickets', (req, res) => {
//   console.log('🎫 Getting tickets...');
//   const tickets = readDB('tickets.json');
//   const { category, status } = req.query;

//   let filteredTickets = tickets;

//   if (category) {
//     filteredTickets = filteredTickets.filter(t => t.category === category);
//     console.log(
//       `🔍 Filtered by category '${category}': ${filteredTickets.length} tickets`
//     );
//   }
//   if (status) {
//     filteredTickets = filteredTickets.filter(t => t.status === status);
//     console.log(
//       `🔍 Filtered by status '${status}': ${filteredTickets.length} tickets`
//     );
//   }

//   console.log(`📦 Returning ${filteredTickets.length} tickets`);
//   res.json(filteredTickets);
// });

// app.get('/tickets/:id', (req, res) => {
//   const tickets = readDB('tickets.json');
//   const ticket = tickets.find(t => t.id === req.params.id);
//   if (ticket) {
//     res.json(ticket);
//   } else {
//     res.status(404).json({ error: 'Ticket not found' });
//   }
// });

// // 訂單路由
// app.get('/orders', (req, res) => {
//   const orders = readDB('orders.json');
//   const { userId, status } = req.query;

//   let filteredOrders = orders;

//   if (userId) {
//     filteredOrders = filteredOrders.filter(o => o.userId === userId);
//   }
//   if (status) {
//     filteredOrders = filteredOrders.filter(o => o.status === status);
//   }

//   res.json(filteredOrders);
// });

// app.get('/orders/:id', (req, res) => {
//   const orders = readDB('orders.json');
//   const order = orders.find(o => o.id === req.params.id);
//   if (order) {
//     res.json(order);
//   } else {
//     res.status(404).json({ error: 'Order not found' });
//   }
// });

// app.post('/orders', (req, res) => {
//   const orders = readDB('orders.json');
//   const newOrder = {
//     id: `order_${Date.now()}`,
//     orderNumber: `CONF${Date.now()}`,
//     ...req.body,
//     status: 'pending',
//     createdAt: new Date().toISOString(),
//   };
//   orders.push(newOrder);
// });

// // 分部路由
// app.get('/branches', (req, res) => {
//   const branches = readDB('branches.json');
//   res.json(branches);
// });

// // 健康檢查路由
// app.get('/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//   });
// });

// 列出所有路由
app.get('/', (req, res) => {
  res.json({
    message: 'Conference Ticket API Server',
    routes: {
      'GET /test': 'Test endpoint',
      'GET /health': 'Health check',
      'GET /users': 'Get all users',
      'GET /users/:id': 'Get user by ID',
      'POST /users': 'Create user',
      'GET /tickets': 'Get tickets (supports ?category=&status= filters)',
      'GET /tickets/:id': 'Get ticket by ID',
      'GET /orders': 'Get orders (supports ?userId=&status= filters)',
      'GET /orders/:id': 'Get order by ID',
      'POST /orders': 'Create order',
      'GET /branches': 'Get all branches',
    },
  });
});

// 錯誤處理
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// 404 處理
app.use((req, res) => {
  console.log(`❌ 404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: 'Not found',
    path: req.path,
    method: req.method,
    available_routes: [
      'GET /',
      'GET /test',
      'GET /health',
      'GET /users',
      'GET /tickets',
      'GET /orders',
      'GET /branches',
    ],
  });
});

app.listen(PORT, () => {
  console.log('Conference Ticket API Server Started!');
});
