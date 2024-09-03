const DispatchNote = require("../../modals/DispatchNote");
const Order = require("../../modals/order");

const createOrder = async (req, res) => {
  const {
    userId,
    orderId,
    senderName,
    senderPhoneNumber,
    receiverName,
    receiverPhoneNumber,
    cakeName,
    cakeType,
    flavor,
    weight,
    messageOnCard,
    specialInstructions,
    date,
    time,
    shippingAddress,
    deliveryDate, // If this field is still relevant
    status,
    quantity,
    price,
    shippingInfo,
    // paymentType,
    order_date,
    agentName,
    advance_payment,
      balance_payment,
  } = req.body;

  // Generate the postedDate in DD-MM-YY format
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
  const year = currentDate.getFullYear().toString().slice(-2); // Get last 2 digits of the year

  // const postedDate = `${day}-${month}-${year}`;

  try {
    const newOrder = new Order({
      userId,
      orderId,
      senderName,
      senderPhoneNumber,
      receiverName,
      receiverPhoneNumber,
      shippingAddress,
      cakeName,
      cakeType,
      flavor,
      weight,
      messageOnCard,
      specialInstructions,
      time,
      quantity,
      deliveryDate, // Include if this is still relevant
      status,
      price,
      shippingInfo,
      // paymentType,
      order_date,
      agentName,
      advance_payment,
      balance_payment,
    });
    const savedOrder = await newOrder.save();
    console.log("savedOrder", savedOrder);
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const orderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchByDate = async (req, res) => {
  const { postedDate } = req.params;

  try {
    // Find orders with the specified postedDate
    const orders = await Order.find({ postedDate: postedDate });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for the specified date" });
    }

    res.status(200).json({ count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const byDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;

    // Parse the dates from the URL in DD-MM-YY format
    const [startDay, startMonth, startYear] = startDate.split("-");
    const [endDay, endMonth, endYear] = endDate.split("-");

    // Convert to Date objects
    const start = new Date(`20${startYear}-${startMonth}-${startDay}`);
    const end = new Date(`20${endYear}-${endMonth}-${endDay}`);

    // Find orders between the given dates
    const orders = await Order.find({
      postedDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    console.log(startDate, endDate);

    res.json({ count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  createOrder,

  updateOrder,
  getAllOrders,
  getOrderByUserId,
  deleteOrder,
  orderById,
  searchByDate,
  byDateRange,
};
