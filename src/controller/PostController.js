import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createPost(req, res) {
    const { content } = req.body;
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({ where: { id: +id } });
      if (!user) {
        return res.json({ error: "Usuário não existe" });
      }

      const post = await prisma.post.create({
        data: {
          content,
          userId: user.id,
        },
        include: {
          author: true,
        },
      });

      return res.json(post);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};

