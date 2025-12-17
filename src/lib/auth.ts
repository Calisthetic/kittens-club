import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
//import { saltAndHashPassword } from "@/utils/password"
import { DataService } from "@/lib/data-service";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
        isRegister: {type: "hidden"}
      },
      authorize: async (credentials) => {
        const dataService = new DataService();
        let user:any = null
 
        // logic to salt and hash password
        const pwHash = credentials.password //saltAndHashPassword(credentials.password)
 
        if (credentials.isRegister) {
          const newUser:any = await dataService.singleQuery(`
              INSERT INTO users (user_name, password, email) 
              VALUES (?, ?, ?)
            `, [credentials.username, pwHash, `${credentials.username}@example.com`]);

          if (newUser.result.length === 0) {
            throw new Error("Ошибка при создании пользователя");
          }
        }
        // logic to verify if user exists
        user = await dataService.singleQuery(`
          SELECT user_name AS name, email, user_id AS id FROM users WHERE password = ? AND user_name = ?
        `, [pwHash, credentials.username])
 
        if (user.result.length === 0) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with the their profile data
        return user.result[0]
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out'
  },
})