import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
  
  const orders = [
    {
      id: "ORD001",
      date: "2023-05-01",
      total: "$129.99",
      status: "Delivered",
    },
    {
      id: "ORD002",
      date: "2023-05-15",
      total: "$79.99",
      status: "Processing",
    },
    {
      id: "ORD003",
      date: "2023-06-02",
      total: "$199.99",
      status: "Shipped",
    },
  ]
  
  export function OrderHistory() {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Order History</h2>
          <p className="text-sm text-muted-foreground">
            View and manage your past orders.
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  
  