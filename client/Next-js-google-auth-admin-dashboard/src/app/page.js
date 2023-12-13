import DashboardLayout from "@/components/dashboard";

//get all products
async function extractAllProducts() {
  const res = await fetch("http://localhost:3000/api/product/all-products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    cache: "no-store",
  });

  const data = await res.json();

  return data;
}

//get all visitors list

async function extractAllVisitors() {
  const res = await fetch("http://localhost:3000/api/visitors/all-visitors", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    cache: "no-store",
  });

  const data = await res.json();

  return data;
}

async function extractAllHistory() {
  const res = await fetch("http://localhost:3000/api/history/all-history", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    cache: "no-store",
  });

  const data = await res.json();

  return data;
}

export default async function Home() {
  const allProducts = await extractAllProducts();
  const allVisitors = await extractAllVisitors();
  const allHistories = await extractAllHistory();

  return (
    <DashboardLayout
      allProducts={allProducts && allProducts.data}
      allVisitors={allVisitors && allVisitors.data}
      allHistories={allHistories && allHistories.data}
    />
  );
}
