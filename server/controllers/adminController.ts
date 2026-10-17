import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import bcyrpt from "bcrypt";

// get admin dashboard data
export const getAdminStatus = async (req: Request, res: Response) => {
  const [
    totalOrders,
    totalUsers,
    totalProducts,
    outOfStock,
    totalPartners,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count({
      where: { NOT: [{ paymentMethod: "card", isPaid: false }] },
    }),
    prisma.user.count(),
    prisma.product.count(),
    prisma.product.count({ where: { stock: 0 } }),
    prisma.deliveryPartner.count(),
    prisma.order.findMany({
      where: { NOT: [{ paymentMethod: "card", isPaid: false }] },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        user: { select: { name: true, email: true } },
        deliveryPartner: { select: { name: true, phone: true } },
      },
    }),
  ]);

  res.json({
    totalOrders,
    totalUsers,
    totalProducts,
    outOfStock,
    totalPartners,
    recentOrders,
  });
};

export const getDeliveryPartners = async (req: Request, res: Response) => {
  const partners = await prisma.deliveryPartner.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json({ partners });
};

// create delivery partner profile;

export const createDeliveryPartner = async (req: Request, res: Response) => {
  const { name, email, password, phone, vehicleType } = req.body;

  if (!name || !email || !password || !phone) {
    res.status(400).json({ message: "Please provide all required fields" });
    return;
  }

  const hashPassword = await bcyrpt.hash(password, 10);

  const partner = await prisma.deliveryPartner.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashPassword,
      phone,
      vehicleType,
    },
  });

  res.status(201).json({ partner });
};

//update delivery partner profile

export const updateDeliveryPartner = async (req: Request, res: Response) => {
  const { name, phone, vehicleType, isActive } = req.body;
  const data: any = {};
  if (name) data.name = name;
  if (phone) data.phone = phone;
  if (vehicleType) data.vehicleType = vehicleType;
  data.isActive = isActive;

  try {
    const partner = await prisma.deliveryPartner.update({
      where: { id: req.params.id as string },
      data,
    });
    res.json({ partner });
  } catch (error) {
    res.status(201).json({ message: "Partner is not found" });
  }
};

// assign delivery partner for order


export const assignDeliveryPartner = async (
  req: Request,
  res: Response
) => {
  try {
    const { partnerId } = req.body;
    const orderId = req.params.id as string;

    if (!partnerId) {
      return res.status(400).json({
        message: "Please select a delivery partner",
      });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const partner = await prisma.deliveryPartner.findUnique({
      where: { id: partnerId },
    });

    if (!partner) {
      return res.status(404).json({
        message: "Delivery partner not found",
      });
    }

    if (!partner.isActive) {
      return res.status(400).json({
        message: "Cannot assign an inactive delivery partner",
      });
    }

    const otp = String(
      Math.floor(100000 + Math.random() * 900000)
    );

    let status = order.status;

    const history: any[] = Array.isArray(order.statusHistory)
      ? [...order.statusHistory]
      : [];

    if (
      order.status === "Placed" ||
      order.status === "Confirmed"
    ) {
      status = "Assigned";

      history.push({
        status: "Assigned",
        note: `Assigned to ${partner.name}`,
        timestamp: new Date(),
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        deliveryPartnerId: partner.id,
        deliveryOtp: otp,
        status,
        statusHistory: history,
      },
    });

    // Important: send a response to the frontend
    return res.status(200).json({
      message: "Delivery partner assigned successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Assign delivery partner error:", error);

    return res.status(500).json({
      message: "Failed to assign delivery partner",
    });
  }
};

