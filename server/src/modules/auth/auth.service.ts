import bcrypt from 'bcryptjs'
import User from '../../models/user.model'

type CreateUserInput = {
  name?: string
  email: string
  phone: string
  password: string
}

export const createUser = async (data: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  return User.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
    },
  })
}

export const logoutUser = async () => {
  return true
}

export const findUserByPhone = async (phone: string) => {
  return User.findOne({
    where: { phone },
  })
}

export const createUserWithPosts = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  return User.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      posts: {
        create: data.posts?.map((p: any) => ({
          title: p.title,
          content: p.content,
        })),
      },
    },
  })
}