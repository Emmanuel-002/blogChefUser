import { createPost } from "../../controllers/post";
import { deleteCache } from "../../controllers/cache";

export default async (req, res) => {
  try {
    const post = await createPost(req.body.post);
    deleteCache("all-posts");
    res.json({ post });
  } catch (error) {
    res.status(401).json({ error });
  }
};
