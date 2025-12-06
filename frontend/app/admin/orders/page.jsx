export default function OrdersPage() {
  const dummyOrders = [
    { id: 1, customer: "Brian", status: "Pending" },
    { id: 2, customer: "Alice", status: "Delivered" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders / Delivery</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {dummyOrders.map((order) => (
          <div key={order.id} className="p-4 border border-grayish rounded-lg shadow-md">
            <h2 className="font-bold text-lg">{order.customer}</h2>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
