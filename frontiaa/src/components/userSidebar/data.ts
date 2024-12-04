import { user } from '@/lib/utils';
import { 
  CreditCard,
  UtensilsCrossed,
  Clock,
  LifeBuoy,
  Send,
  Home,
  Settings
} from 'lucide-react';

const data = {
  user: {
    name: user.firstName,
    email: user.email,
    avatar: "/avatars/frew.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/user",
      icon: Home,
      isActive: true,
    },
    {
      title: "Card",
      url: "/user/card",
      icon: CreditCard,
      isActive: true,
      items: [
        {
          title: "Balance",
          url: "/user/card",
        },
        {
          title: "Transaction History",
          url: "/user/card",
        }
      ],
    },
    {
      title: "Menu",
      url: "/user/menu",
      icon: UtensilsCrossed,
      isActive: true,
      items: [
        {
          title: "Today's Menu",
          url: "/user",
        },
        {
          title: "Weekly Menu",
          url: "/user",
        }
      ],
    },
    {
      title: "Orders",
      url: "/user/orders/active",
      icon: Clock,
      isActive: true,
      items: [
        {
          title: "Active Orders",
          url: "/user/orders/active",
        },
        {
          title: "Order History",
          url: "/user/orders/history",
        }
      ],
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/user/settings",
      icon: Settings,
    },
    {
      title: "Support",
      url: "/user/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/user/feedback",
      icon: Send,
    },
  ]
};

export default data;