import bcrypt from "bcrypt";
import { prisma } from "./config/prisma.js";

const email = "ayushadhikari080@gmail.com";

async function resetPassword() {
  try {
    const newPassword = "$72@Adhi";
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    console.log(`Password reset successfully for ${user.email}`);
  } catch (error) {
    console.error("Password reset failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();
