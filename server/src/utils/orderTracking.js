function generateTrackingSteps(status, createdAt) {
  const steps = [
    { status: 'Order Placed', date: createdAt.toLocaleDateString(), completed: true },
    { status: 'Processing', date: createdAt.toLocaleDateString(), completed: false },
    { status: 'Shipped', date: '', completed: false },
    { status: 'Out for Delivery', date: '', completed: false },
    { status: 'Delivered', date: '', completed: false },
  ];

  const statusIndex = {
    PENDING: 0,
    PROCESSING: 1,
    SHIPPED: 2,
    DELIVERED: 4,
    CANCELLED: -1,
  };

  const currentIndex = statusIndex[status] || 0;

  for (let index = 0; index < steps.length; index += 1) {
    steps[index].completed = index <= currentIndex;
    if (index > 0 && steps[index].completed && !steps[index].date) {
      const date = new Date(createdAt);
      date.setDate(date.getDate() + index);
      steps[index].date = date.toLocaleDateString();
    }
  }

  return steps;
}

module.exports = { generateTrackingSteps };
