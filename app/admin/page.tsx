import { redirect } from "next/navigation";
import { AdminPanel } from "@/components/admin-panel";
import { getAdminSession } from "@/lib/auth";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!await getAdminSession()) redirect("/admin/login");
  return <AdminPanel initialProducts={await getAllProducts()} />;
}
