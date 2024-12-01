import { 
    ShoppingBag,
    KanbanSquare,
    BookOpen,
    Settings2,
    LifeBuoy,
    Send,
    UtensilsCrossed,
    Coffee,
    Map
  } from 'lucide-react';
  
  const data = {
    user: {
      name: "wufu",
      email: "wufu@usms.ac.ma",
      avatar: "/avatars/frew.jpg",
    },
    navMain: [
      {
        title: "Orders",
        url: "/orders",
        icon: ShoppingBag,
        isActive: true,
        items: [
          {
            title: "Active Orders",
            url: "/user/orders/active",
          },
          {
            title: "Order History",
            url: "/user/orders/history",
          },
          {
            title: "Daily Stats",
            url: "/user/orders/stats",
          },
        ],
      },
      {
        title: "Kitchen",
        url: "/kitchen",
        icon: KanbanSquare,
        isActive: true,
        items: [
          {
            title: "Staff",
            url: "/kitchen/staff",
          },
          {
            title: "Inventory",
            url: "/kitchen/inventory",
          }
        ],
      },
      {
        title: "Menu",
        url: "/menu",
        icon: BookOpen,
        isActive: true,
        items: [
          {
            title: "Items",
            url: "/user",
          },
          {
            title: "Availability",
            url: "/menu/availability",
          },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        isActive: true,
        items: [
          {
            title: "Staff",
            url: "/settings/staff",
          },
          {
            title: "Pricing",
            url: "/settings/pricing",
          },
          {
            title: "Hours",
            url: "/settings/hours",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "/support",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "/feedback",
        icon: Send,
      },
    ]
  };
  
  export default data;