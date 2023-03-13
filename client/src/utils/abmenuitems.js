import { dashboard, expenses, transactions, trend } from "./abicons";

export const menuItems = [
  {
    id: 1,
    title: "Genel Durumu",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "İşlemler",
    icon: transactions,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "Gelir",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "Gider",
    icon: expenses,
    link: "/dashboard",
  },
];
