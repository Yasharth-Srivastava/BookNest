import Navbar from "@/components/Navbar"
import { currentUser } from "@clerk/nextjs/server";

const ADMIN_EMAIL = "bookstorebooknest@gmail.com"

export default async function MainLayout({
    children
}: {
    children: React.ReactNode
}){


  const user = await currentUser()
  const isAdmin = user?.emailAddresses[0].emailAddress === ADMIN_EMAIL
    return(
        <div>
            <Navbar isAdmin={isAdmin}/>
            {children}
        </div>
    )
}