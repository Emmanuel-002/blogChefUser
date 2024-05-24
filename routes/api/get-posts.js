import { getAllPosts } from "../../controllers/post";
import { cacheContent } from "../../controllers/cache";

export default async (req, res) => {
  try {
    const posts = await getAllPosts();
    cacheContent("all-posts", posts);
    res.json({ posts });
  } catch (error) {
    res.status(404).json(error);
  }
};
