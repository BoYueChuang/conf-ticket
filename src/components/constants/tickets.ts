export interface TicketFeature {
  text: string;
}

export interface TicketInfo {
  id: string;
  name: string;
  price: number;
  image: string;
  features: TicketFeature[];
  remark?: string;
  isGroupPass?: boolean;
  isSpecialAccess?: boolean;
}

export const TICKET_TYPES: TicketInfo[] = [
  {
    id: 'regular',
    name: 'Regular Pass',
    price: 2800,
    image: '/src/assets/images/ticket-sample.png',
    features: [
      {
        text: '特會全場次 & WORKSHOP & 特會影片（一個月線上觀看權限）',
      },
    ],
  },
  {
    id: 'special-a',
    name: 'Special A Pass',
    price: 3200,
    image: '/src/assets/images/ticket-sample.png',
    features: [
      {
        text: '特會全場次 & WORKSHOP & 特會影片（一個月線上觀看權限）',
      },
      {
        text: '5/2 與 Wade Joye 牧師午餐及 Live QA',
      },
      {
        text: '會場深度配有即時翻譯',
      },
    ],
  },
  {
    id: 'special-b',
    name: 'Special B Pass',
    price: 3400,
    image: '/src/assets/images/ticket-sample.png',
    features: [
      {
        text: '特會全場次 & WORKSHOP & 特會影片（一個月線上觀看權限）',
      },
    ],
  },
  {
    id: 'group',
    name: 'Group Pass',
    price: 16800,
    image: '/src/assets/images/ticket-sample.png',
    remark: '※限牧者、傳道人、事工負責人報名參加',
    isGroupPass: true,
    isSpecialAccess: true,
    features: [
      {
        text: '特會全場次 & WORKSHOP & 特會影片（一個月線上觀看權限）',
      },
      {
        text: '5/2 與 Wade Joye 牧師午餐及 Live QA',
      },
      {
        text: '5/3 與 Pastors 午餐及 Live QA\n與談牧者：萬力豪牧師、周巽正牧師、柳子駿牧師、葉豪軒牧師',
      },
    ],
  },
  {
    id: 'leadership',
    name: 'Leadership Pass',
    price: 3400,
    image: '/src/assets/images/ticket-sample.png',
    remark: '※限牧者、傳道人、事工負責人報名參加',
    isSpecialAccess: true,
    features: [
      {
        text: '特會全場次 & WORKSHOP & 特會影片（一個月線上觀看權限）',
      },
      {
        text: '5/3 與 Pastors 午餐及 Live QA\n與談牧者：萬力豪牧師、周巽正牧師、柳子駿牧師、葉豪軒牧師',
      },
    ],
  },
];
