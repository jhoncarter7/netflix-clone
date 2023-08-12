import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";
// here we basicaly add movieId in favoriteId and also delete single movieId from favoriteId, where this favoriteId is existed in user we can see in schema.prisma
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      // console.log("i am taking req", req);
      const { movieId } = req.body;
      // console.log("I am storing body req", req.body);
      const exsitingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (!exsitingMovie) {
        throw new Error("Movie id not found");
      }
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          }
        }
      });
      return res.status(200).json(user);
    }
    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.body;

      const exsitingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (!exsitingMovie) {
        throw new Error("Invalid ID");
      }
      const updateFavoriteId = without(currentUser.favoriteIds, movieId);

      const updateUserFavorite = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updateFavoriteId,
        },
      });
      return res.status(200).json(updateUserFavorite);
    }
    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
