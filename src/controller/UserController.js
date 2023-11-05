import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createUser(req, res) {
    try {
      const { name, email } = req.body;

      let user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        return res.json({ error: "Este usuário já existe" });
      }

      user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },
  async findAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      return res.json(error);
    }
  },
  async findUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: +id } });
      if (!user) {
        return res.json({ error: "Não foi possível encontrar este usuário" });
      }
      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      let user = await prisma.user.findUnique({ where: { id: +id } });
      if (!user) {
        return res.json({ error: "Não foi possível encontrar este usuário" });
      }
      user = await prisma.user.update({
        where: { id: +id },
        data: { name, email },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },
};

