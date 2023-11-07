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
  async findAllPosts(req, res) {
    try {
      const posts = await prisma.post.findMany();

      return res.json(posts);
    } catch (error) {
      return res.json({ error });
    }
  },
  async updatePost(req, res) {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const post = await prisma.post.findUnique({ where: { id: +id } });
      if (!post) {
        return res.json({ error: "Post não existe" });
      }

      await prisma.post.update({
        where: { id: +id },
        data: {
          content,
        },
      });

      return res.json({ message: "Post foi autualizado" });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};

