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
            url: "/orders/active",
          },
          {
            title: "Order History",
            url: "/orders/history",
          },
          {
            title: "Daily Stats",
            url: "/orders/stats",
          },
        ],
      },
      {
        title: "Kitchen",
        url: "/kitchen",
        icon: KanbanSquare,
        items: [
          {
            title: "Queue",
            url: "/kitchen/queue",
          },
          {
            title: "Inventory",
            url: "/kitchen/inventory",
          },
          {
            title: "Reports",
            url: "/kitchen/reports",
          },
        ],
      },
      {
        title: "Menu",
        url: "/menu",
        icon: BookOpen,
        items: [
          {
            title: "Categories",
            url: "/menu/categories",
          },
          {
            title: "Items",
            url: "/menu/items",
          },
          {
            title: "Specials",
            url: "/menu/specials",
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
        items: [
          {
            title: "General",
            url: "/settings/general",
          },
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
    ],
    projects: [
      {
        name: "Main Kitchen",
        url: "/locations/main-kitchen",
        icon: UtensilsCrossed,
      },
      {
        name: "Coffee Corner",
        url: "/locations/coffee-corner",
        icon: Coffee,
      },
      {
        name: "Campus Map",
        url: "/locations/map",
        icon: Map,
      },
    ],
  };
  
  export default data;